import { getRiskAllocationBasedOnRank } from '../util/riskMask';
import DataRepository from '../util/dataRepository';

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

  const historicalData = {};

  for (const coin of coinList) {
    try {
      const data = [];
      // start from the most recent months and keep appending data points until we reach the necessary amount of data
      for (
        let i = coin.pricesForEachMonth.length - 1;
        i >= 0 && data.length < smaDays * 2;
        i--
      ) {
        data.unshift.apply(data, coin.pricesForEachMonth[i].prices);
      }

      // too little data
      if (data.length < smaDays * 2) {
        console.error(
          `Insufficient amount of price information for ${coin.id}`
        );
        continue;
      }

      // calculate the initial average
      let sumOfPeriod = data.reduce((acc, curr) => (acc += +curr.priceUsd), 0);

      // account for possible duplicates
      historicalData[coin.id] = {};
      historicalData[coin.id].deviations = [];
      historicalData[coin.id].averages = [];

      // calculate moving averages for each day of the last smaDays days using sliding window
      for (let i = data.length - smaDays; i < data.length; i++) {
        // move the average to include the current time point
        sumOfPeriod += +data[i].priceUsd;
        sumOfPeriod -= +data[i - 1].priceUsd;

        const movingAverage = sumOfPeriod / smaDays;

        historicalData[coin.id].averages.push(movingAverage);
        historicalData[coin.id].deviations.push(
          (Math.abs(Math.abs(movingAverage) - Math.abs(+data[i].priceUsd)) *
            100) /
            Math.abs(movingAverage)
        );
      }

      historicalData[coin.id].averageDeviation =
        historicalData[coin.id].deviations.reduce(
          (acc, curr) => (acc += curr),
          0
        ) / historicalData[coin.id].deviations.length;
      historicalData[coin.id].symbol = coin.symbol;
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
          id: key,
          symbol: historicalData[key].symbol,
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

export default class StatisticalService {
  _dynamicCoins = null;
  _numberOfCoinsToFetch = 6;
  _coinFilterList = ['USDC', 'USDT'];
  _lengthOfSma = 150;

  _dataRepository = new DataRepository();

  async getCoinAllocationsFor(riskLevel) {
    // if (this._dynamicCoins === null) {
    //   this._dynamicCoins = await rankCoins(
    //     await this._dataRepository.extractMonthlyCoinPricesForPastYear(
    //       await this._dataRepository.retrieveTopCoins(
    //         this._numberOfCoinsToFetch,
    //         this._coinFilterList
    //       )
    //     ),
    //     this._lengthOfSma
    //   );
    //   console.log("ranking coins based on risk");
    // }
    return getRiskAllocationBasedOnRank([], riskLevel - 1);
  }
}
