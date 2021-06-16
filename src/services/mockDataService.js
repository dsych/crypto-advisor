const baseUrl = "http://api.coincap.io/v2";
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
      method: "GET",
      redirect: "follow",
    });

    const { data } = await response.json();

    for (const coin of data) {
      if (!ex[coin["symbol"]]) {
        result.push(coin);
      }
      // terminate if we got enough coins
      if (result.length == limit) {
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
 */
const rankCoins = async (coinList) => {
  coinList = coinList || [];
  startUnixTime = offsetMonthsFromNow(2).getTime();
  endUnixTime = new Date().getTime();

  // averages: [], deviations: [], averageDeviation: 0, rank: 0
  const result = {};

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
      result[coin.symbol] = {};
      result[coin.symbol].deviations = [];
      result[coin.symbol].averages = [];

      // calculate moving averages for each day of the last 21 days using sliding window
      for (let i = data.length - 21; i < data.length; i++) {
        // move the average to include the current time point
        sumOfPeriod += +data[i].priceUsd;
        sumOfPeriod -= +data[i - 1].priceUsd;

        const movingAverage = sumOfPeriod / 21;

        result[coin.symbol].averages.push(movingAverage);
        result[coin.symbol].deviations.push(
          (Math.abs(Math.abs(movingAverage) - Math.abs(+data[i].priceUsd)) *
            100) /
            Math.abs(movingAverage)
        );
      }

      result[coin.symbol].averageDeviation =
        result[coin.symbol].deviations.reduce((acc, curr) => (acc += curr), 0) /
        result[coin.symbol].deviations.length;
    } catch (err) {
      console.error("Failed to fetch historical data for ", coin.id);
      console.error(err);
    }
  }

  // we want to sort coins in ascending order based on their averageDeviation, so that we can record their rank
  const rankedCoins = Object.keys(result)
    .map((key) =>
      Object.create({ symbol: key, averageDev: result[key].averageDeviation })
    )
    .sort((left, right) => left.averageDev - right.averageDev);

  // record the rank based on the position of sorted symbol
  rankedCoins.forEach((el, index) => (result[el.symbol].rank = index + 1));

  return result;
};

export default class MockDataService {
  _breakDowns = {
    1: {
      label: 'Conservative',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 80,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 10,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 0,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 0,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 0,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 10,
        },
      ],
    },
    2: {
      label: 'Conservative',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 75,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 15,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 0,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 0,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 0,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 10,
        },
      ],
    },
    3: {
      label: 'Conservative',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 70,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 20,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 0,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 0,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 0,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 10,
        },
      ],
    },
    4: {
      label: 'Balanced',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 65,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 20,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 5,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 0,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 0,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 10,
        },
      ],
    },
    5: {
      label: 'Balanced',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 60,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 20,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 10,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 0,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 0,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 10,
        },
      ],
    },
    6: {
      label: 'Balanced',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 60,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 25,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 10,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 0,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 0,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 5,
        },
      ],
    },
    7: {
      label: 'Balanced',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 55,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 25,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 12,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 3,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 0,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 5,
        },
      ],
    },
    8: {
      label: 'Aggressive',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 50,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 30,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 13,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 4,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 0,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 3,
        },
      ],
    },
    9: {
      label: 'Aggressive',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 50,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 30,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 13,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 4,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 1,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 2,
        },
      ],
    },
    10: {
      label: 'Aggressive',
      holdings: [
        {
          name: 'btc',
          picId: 1,
          percent: 50,
        },
        {
          name: 'eth',
          picId: 1027,
          percent: 30,
        },
        {
          name: 'bnb',
          picId: 1839,
          percent: 13,
        },
        {
          name: 'ada',
          picId: 2010,
          percent: 4,
        },
        {
          name: 'doge',
          picId: 74,
          percent: 2,
        },
        {
          name: 'usdt',
          picId: 825,
          percent: 1,
        },
      ],
    },
  };

  getHoldings(riskLevel) {
    //TODO
    return this._breakDowns[riskLevel];
  }

  getTopStableCoins() {
    // retrieve top 10 coins and rank them based on their volatility
    // also exclude stable coins, as they are not indicative
    return retrieveTopCoins(10, ["USDC", "USDT"]).then((coins) =>
      rankCoins(coins)
    );
  }
}
