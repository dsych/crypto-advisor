import { getRiskAllocationBasedOnRank } from "../util/riskMask";

const baseUrl = "https://api.coincap.io/v2";
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
      throw String.toString(
        `Received ${response.status}: ${response.statusText}`
      );
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

const offsetMonthsFromNow = (months) => {
  const now = new Date();

  if (now.getMonth() - months < 0) {
    // if the difference between current month and the offset is negative, we want to add it. otherwise we will perform a double negation
    now.setFullYear(
      now.getFullYear() - 1,
      11 + (now.getMonth() - months),
      now.getDate()
    );
  } else {
    now.setMonth(now.getMonth() - months);
  }

  return now;
};

/**
 * Ranks coins in ascending order based on their average deviation from the moving average of the past 21 days
 *
 * @returns [] of type {averages: [], deviations: [], averageDeviation: 0, rank: 0}
 */
const rankCoins = async (coinList) => {
  coinList = coinList || [];
  const startUnixTime = offsetMonthsFromNow(2).getTime();
  const endUnixTime = new Date().getTime();

  const historicalData = {};

  for (const coin of coinList) {
    try {
      const { data } = await (
        await fetch(
          `${baseUrl}/assets/${coin.id}/history?interval=d1&start=${startUnixTime}&end=${endUnixTime}`,
          { method: "GET", redirect: "follow" }
        )
      ).json();

      // too little data
      if (data.length < 42) {
        continue;
      }

      // calculate the initial average
      let sumOfPeriod = data
        .slice(-41, -21)
        .reduce((acc, curr) => (acc += +curr.priceUsd), 0);

      // account for possible duplicates
      historicalData[coin.symbol] = {};
      historicalData[coin.symbol].deviations = [];
      historicalData[coin.symbol].averages = [];

      // calculate moving averages for each day of the last 21 days using sliding window
      for (let i = data.length - 21; i < data.length; i++) {
        // move the average to include the current time point
        sumOfPeriod += +data[i].priceUsd;
        sumOfPeriod -= +data[i - 1].priceUsd;

        const movingAverage = sumOfPeriod / 21;

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
      console.error("Failed to fetch historical data for ", coin.id);
      console.error(err);
    }
  }

  // we want to sort coins in ascending order based on their averageDeviation, so that we can record their rank
  const rankedCoins = Object.keys(historicalData)
    .map((key, index) =>
      Object.create({
        symbol: key,
        averageDeviation: historicalData[key].averageDeviation,
        averages: historicalData[key].averages,
        deviations: historicalData[key].deviations,
        rank: index + 1,
      })
    )
    .sort((left, right) => left.averageDeviation - right.averageDeviation);

  return rankedCoins;
};

export default class MockDataService {
  _staticCoinAllocation = [
    {
      symbol: "btc",
    },
    {
      symbol: "eth",
    },
    {
      symbol: "bnb",
    },
    {
      symbol: "ada",
    },
    {
      symbol: "doge",
    },
    {
      symbol: "usdt",
    },
  ];

  _dynamicCoins = null;

  getStaticRiskAllocationFor(riskLevel) {
    return getRiskAllocationBasedOnRank(
      this._staticCoinAllocation,
      +riskLevel - 1
    );
  }

  async getDynamicRiskAllocationFor(riskLevel) {
    if (this._dynamicCoins === null) {
      this._dynamicCoins = await rankCoins(
        await retrieveTopCoins(this._staticCoinAllocation.length, [
          "USDC",
          "USDT",
        ])
      );
    }
    // retrieve top 6 coins and rank them based on their volatility
    // also exclude stable coins, as they are not indicative
    return getRiskAllocationBasedOnRank(this._dynamicCoins, riskLevel - 1);
  }
}
