import { getRiskAllocationBasedOnRank } from '../util/riskMask';

const baseUrl = 'https://api.coincap.io/v2';
/**
 * Retrieves top n number of coins based on their market cap in descending order
 */
const retrieveTopCoins = async (limit, excludeSymbolList) => {
  // it is more efficient to work with a map than with a list
  const ex = (excludeSymbolList || []).reduce((acc, el) => {
    acc[el] = true;
    return acc;
  }, {});
  let result = [];

  try {
    const response = await fetch(`${baseUrl}/assets`, {
      mode: 'cors',
      method: 'GET',
      redirect: 'follow',
    });

    if (!response.ok) {
      throw String.toString(
        `Received ${response.status}: ${response.statusText}`
      );
    }

    const { data } = await response.json();

    for (const coin of data) {
      if (!ex[coin['symbol']]) {
        result.push(coin);
      }
      // terminate if we got enough coins
      if (result.length === limit) {
        break;
      }
    }
  } catch (err) {
    console.error('Failed to retrieve top coins', err);
  }

  return result;
};

const millisecondsInDay = 86400000;
const daysToMilliseconds = (days) => days * millisecondsInDay;

/**
 * Ranks coins in ascending order based on their average deviation from the moving average of the past smaDays days
 *
 * @returns [] of type {averages: [], deviations: [], averageDeviation: 0, rank: 0}
 */
const rankCoins = async (coinList, smaDays) => {
  coinList = coinList || [];
  smaDays = +smaDays;

  if (Number.isNaN(smaDays)) {
    smaDays = 150;
  }

  const startUnixTime =
    new Date().getTime() - daysToMilliseconds((smaDays + 1) * 2);
  const endUnixTime = new Date().getTime();

  const historicalData = {};

  for (const coin of coinList) {
    try {
      const { data } = await (
        await fetch(
          `${baseUrl}/assets/${coin.id}/history?interval=d1&start=${startUnixTime}&end=${endUnixTime}`,
          { method: 'GET', redirect: 'follow' }
        )
      ).json();

      // too little data
      if (data.length < smaDays * 2) {
        continue;
      }

      // calculate the initial average
      let sumOfPeriod = data
        .slice(-smaDays * 2, -smaDays)
        .reduce((acc, curr) => (acc += +curr.priceUsd), 0);

      // account for possible duplicates
      historicalData[coin.symbol] = {};
      historicalData[coin.symbol].deviations = [];
      historicalData[coin.symbol].averages = [];

      // calculate moving averages for each day of the last smaDays days using sliding window
      for (let i = data.length - smaDays; i < data.length; i++) {
        // move the average to include the current time point
        sumOfPeriod += +data[i].priceUsd;
        sumOfPeriod -= +data[i - 1].priceUsd;

        const movingAverage = sumOfPeriod / smaDays;

        historicalData[coin.symbol].averages.push(movingAverage);
        historicalData[coin.symbol].deviations.push(
          (Math.abs(Math.abs(movingAverage) - Math.abs(+data[i].priceUsd)) *
            100) /
            Math.abs(movingAverage)
        );
      }

      historicalData[coin.symbol].averageDeviation =
        historicalData[coin.symbol].deviations.reduce(
          (acc, curr) => (acc += curr),
          0
        ) / historicalData[coin.symbol].deviations.length;
    } catch (err) {
      console.error('Failed to fetch historical data for ', coin.id);
      console.error(err);
    }
  }

  // we want to sort coins in ascending order based on their averageDeviation, so that we can record their rank
  const rankedCoins = Object.keys(historicalData)
    .map((key) =>
      Object.assign(
        {},
        {
          symbol: key,
          averageDeviation: historicalData[key].averageDeviation,
          averages: historicalData[key].averages,
          deviations: historicalData[key].deviations,
        }
      )
    )
    .sort((left, right) => left.averageDeviation - right.averageDeviation);

  rankedCoins.forEach((coin, index) => (coin.rank = index + 1));

  return rankedCoins;
};

export default class DataService {
  _dynamicCoins = null;
  _numberOfCoinsToFetch = 6;
  _coinFilterList = ['USDC', 'USDT'];
  _lengthOfSma = 150;

  async getCoinAllocationsFor(riskLevel) {
    if (this._dynamicCoins === null) {
      // retrieve top coins and rank them based on their volatility
      // also exclude stable coins, as they are not indicative
      this._dynamicCoins = await rankCoins(
        await retrieveTopCoins(
          this._numberOfCoinsToFetch,
          this._coinFilterList
        ),
        this._lengthOfSma
      );
    }

    return getRiskAllocationBasedOnRank(this._dynamicCoins, riskLevel - 1);
  }
}
