import {
  getYTDTimeLimits,
  getNumOfDaysInMonth,
  isLeapYear,
} from "./dateTimeUtil";

const baseUrl = "https://api.coingecko.com/api/v3";

export default class DataRepository {
  _historicalPriceData = null;
  _topCoins = null;

  /**
   * Extracts price data for the given coinList for the past 1 year to date.
   * The returned price info for each coin is split in array of size 12 (for each month), and each entry (month) contains the number of elements equal to the number of days for that month e.g. 30, 31 or 29(28).
   */
  extractMonthlyCoinPricesForPastYear = async (coinList) => {
    // TODO: make sure that cached coins are the same as the once being retrieved here
    if (this._historicalPriceData) {
      return this._historicalPriceData;
    }

    console.log(
      "fetching historical price information for the past year to coins"
    );

    const promises = [];
    const [start, end] = getYTDTimeLimits(new Date());
    for (const coin of coinList) {
      promises.push(this.extractMonthlyPricesForPeriod(coin, start, end));
    }

    this._historicalPriceData = await Promise.all(promises);

    return this._historicalPriceData;
  };

  /**
   * Fetches prices for the specific coin in the given time period (unix timestamps).
   */
  extractMonthlyPricesForPeriod = async (coin, start, end) => {
    const response = await fetch(
      `${baseUrl}/coins/${coin.id}/market_chart/range?from=${start}&to=${end}&vs_currency=USD`,
      {
        // mode: "cors",
        redirect: "follow",
        method: "GET",
      }
    );
    const { prices } = await response.json();

    if (prices.length < 365) {
      throw new Error(`Received too little data, got ${prices.length}`);
    }

    const result = [];

    let offset = 0;

    for (let i = 0; i < 12; i++) {
      const timestamp = new Date(prices[offset][0]);
      const currMonth = timestamp.getMonth();
      let daysInMonth = getNumOfDaysInMonth(currMonth);
      // acocunt for extra day in leap year
      if (currMonth === 1) {
        daysInMonth += +isLeapYear(timestamp);
      }

      result.push({
        start: prices[offset][1],
        end: prices[offset + daysInMonth - 1][1],
        prices: prices.slice(offset, offset + daysInMonth).map((p) => p[1]),
      });
      offset += daysInMonth;
    }

    return {
      pricesForEachMonth: result,
      id: coin.id,
      symbol: coin.symbol,
      image: coin.image,
    };
  };

  /**
   * Retrieves top n number of coins based on their market cap in descending order
   */
  retrieveTopCoins = async (limit, excludeSymbolList) => {
    // TODO: make sure that the number of cached coins is the same as the limit and they are not found inside excludeSymbolList
    if (this._topCoins) {
      return this._topCoins;
    }
    console.log("retrieving top coins based on market cap");

    // it is more efficient to work with a map than with a list
    const ex = (excludeSymbolList || []).reduce((acc, el) => {
      acc[el] = true;
      return acc;
    }, {});
    let result = [];

    try {
      const response = await fetch(
        `${baseUrl}/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=20&page=1&sparkline=false`,
        {
          // mode: "cors",
          method: "GET",
          redirect: "follow",
        }
      );

      if (!response.ok) {
        throw new Error(`Received ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      for (const coin of data) {
        if (!ex[coin["symbol"].toLowerCase()]) {
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
}
