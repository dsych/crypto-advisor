import { getRiskAllocationBasedOnRank } from "../util/riskMask";

const baseUrl = "https://api.coincap.io/v2";
const monthLength = [
  31, // jan
  28, // feb
  31, // mar
  30, // apr
  31, // may
  30, // jun
  31, // jul
  31, // aug
  30, // sep
  31, // oct
  30, // nov
  31, // dec
];

const isLeapYear = (date) =>
  (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) ||
  (date.getFullYear() % 100 === 0 && date.getFullYear() % 400 === 0);
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
      mode: "cors",
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`Received ${response.status}: ${response.statusText}`);
    }

    const { data } = await response.json();

    for (const coin of data) {
      if (!ex[coin["symbol"]]) {
        result.push(coin);
      }
      // terminate if we got enough coins
      if (result.length === limit) {
        break;
      }
    }
  } catch (err) {
    console.error("Failed to retrieve top coins", err);
  }

  return result;
};

const millisecondsInDay = 86400000;

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
      console.error("Failed to fetch historical data for ", coin.id);
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

const getYTDTimeLimits = (sourceDate) => {
  sourceDate = sourceDate || new Date();

  const periodStart = new Date(sourceDate.getTime());

  periodStart.setFullYear(sourceDate.getFullYear() - 1);

  periodStart.setDate(1);
  periodStart.setHours(0, 0, 0);

  const periodEnd = new Date(sourceDate.getTime());
  // close period has to be one day before, which the end of previous month
  periodEnd.setTime(periodEnd.getTime() - millisecondsInDay);

  return [periodStart.getTime(), periodEnd.getTime()];
};

const extractMonthlyPricesForPeriod = async (coin, start, end) => {
  const response = await fetch(
    `${baseUrl}/assets/${coin.id}/history?interval=d1&start=${start}&end=${end}`
  );
  const { data } = await response.json();

  if (data.length < 365) {
    throw new Error(`Received too little data, got ${data.length}`);
  }

  const prices = [];

  let offset = 0;

  for (let i = 0; i < 12; i++) {
    const timestamp = new Date(data[offset].time);
    const currMonth = timestamp.getMonth();
    let daysInMonth = monthLength[currMonth];
    // acocunt for extra day in leap year
    if (currMonth === 1) {
      daysInMonth += +isLeapYear(timestamp);
    }

    prices.push({
      start: data[offset].time,
      end: data[offset + daysInMonth - 1].time,
      prices: data.slice(offset, offset + daysInMonth),
    });
    offset += daysInMonth;
  }

  return { pricesForEachMonth: prices, id: coin.id, symbol: coin.symbol };
};

const initHistoricalData = async (dataService) => {
  if (dataService._topCoins === null) {
    console.log("fetching top coins based on market cap");
    dataService._topCoins = await retrieveTopCoins(
      dataService._numberOfCoinsToFetch,
      dataService._coinFilterList
    );
  }

  if (dataService._historicalPriceData === null) {
    console.log("retrieving historical data for top coins");
    const promises = [];
    const [start, end] = getYTDTimeLimits(new Date());
    for (const coin of dataService._topCoins) {
      promises.push(extractMonthlyPricesForPeriod(coin, start, end));
    }

    dataService._historicalPriceData = await Promise.all(promises);
  }

  if (dataService._dynamicCoins === null) {
    console.log("ranking coins based on risk");
    dataService._dynamicCoins = await rankCoins(
      dataService._historicalPriceData,
      dataService._lengthOfSma
    );
  }
};

export default class DataService {
  _dynamicCoins = null;
  _numberOfCoinsToFetch = 6;
  _coinFilterList = ["USDC", "USDT"];
  _lengthOfSma = 150;

  _historicalPriceData = null;
  _topCoins = null;

  async getCoinAllocationsFor(riskLevel) {
    await initHistoricalData(this);

    return getRiskAllocationBasedOnRank(this._dynamicCoins, riskLevel - 1);
  }
}
