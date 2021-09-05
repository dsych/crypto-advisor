import { getRiskAllocationBasedOnRank } from "../util/riskMask";
import DataRepository from "../util/dataRepository";

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
      let sumOfPeriod = data
        .slice(data.length - smaDays * 2, data.length - smaDays)
        .reduce((acc, curr) => (acc += +curr), 0);

      // account for possible duplicates
      historicalData[coin.id] = {};
      historicalData[coin.id].deviations = [];
      historicalData[coin.id].averages = [];
      historicalData[coin.id].original = coin;

      // calculate moving averages for each day of the last smaDays days using sliding window
      for (let i = data.length - smaDays; i < data.length; i++) {
        // move the average to include the current time point
        sumOfPeriod += +data[i];
        sumOfPeriod -= +data[i - smaDays];

        const movingAverage = sumOfPeriod / smaDays;

        historicalData[coin.id].averages.push(movingAverage);
        historicalData[coin.id].deviations.push(
          (Math.abs(Math.abs(movingAverage) - Math.abs(+data[i])) * 100) /
            Math.abs(movingAverage)
        );
      }

      historicalData[coin.id].averageDeviation =
        historicalData[coin.id].deviations.reduce(
          (acc, curr) => (acc += curr),
          0
        ) / historicalData[coin.id].deviations.length;
    } catch (err) {
      console.error("Failed to fetch historical data for ", coin.id);
      console.error(err);
    }
  }

  // we want to sort coins in ascending order based on their averageDeviation, so that we can record their rank
  const rankedCoins = Object.keys(historicalData)
    .map((key) =>
      Object.assign(
        {
          statistics: {
            averageDeviation: historicalData[key].averageDeviation,
            averages: historicalData[key].averages,
            deviations: historicalData[key].deviations,
          },
        },
        historicalData[key].original
      )
    )
    .sort(
      (left, right) =>
        left.statistics.averageDeviation - right.statistics.averageDeviation
    );

  rankedCoins.forEach((coin, index) => (coin.statistics.rank = index + 1));

  return rankedCoins;
};

const predict = (currentAmount, monthlyDeposit, volatilityOfCoins) => {
  const getSplit = (targetAmount, vols) => {
    return vols.map((vol) => {
      const fraction = targetAmount * (vol.percent / 100);
      return fraction * (vol.yearlyChange / 100);
    });
  };

  return (
    currentAmount +
    monthlyDeposit * 12 +
    getSplit(monthlyDeposit * 12, volatilityOfCoins).reduce(
      (acc, curr) => (acc += curr),
      0
    )
  );
};

const getMarginAmount = (amount, riskLevel, year) => {
  // penalize margin based on the years in the future
  // the further in the future we go, the less certain it becomes
  const margin = 10 * Math.log(year); //10% base margin
  return (amount / 100) * (margin + riskLevel * 2);
};

const calculateYearlyChangeInPrice = (coin) => {
  const last =
    coin.pricesForEachMonth[coin.pricesForEachMonth.length - 1].average;
  const first = coin.pricesForEachMonth[0].average;
  return {
    yearlyChange: ((last - first) * 100) / last,
    percent: coin.percent,
  };
};

export default class StatisticalService {
  _dynamicCoins = null;
  _numberOfCoinsToFetch = 6;
  _coinFilterList = ["usdc", "usdt"];
  _lengthOfSma = 150;

  _dataRepository = new DataRepository();

  async getCoinAllocationsFor(riskLevel) {
    if (this._dynamicCoins === null) {
      this._dynamicCoins = await rankCoins(
        await this._dataRepository.extractMonthlyCoinPricesForPastYear(
          await this._dataRepository.retrieveTopCoins(
            this._numberOfCoinsToFetch,
            this._coinFilterList
          )
        ),
        this._lengthOfSma
      );
    }
    return getRiskAllocationBasedOnRank(this._dynamicCoins, riskLevel - 1);
  }

  async predictProfitForTheNext(
    numOfYears,
    initialDeposit,
    monthlyDeposit,
    riskLevel,
    holdings
  ) {
    const volatilityOfCoins = holdings.map(calculateYearlyChangeInPrice);

    let predictions = [];
    for (let year = 1; year <= numOfYears; year++) {
      initialDeposit = predict(
        initialDeposit,
        monthlyDeposit,
        volatilityOfCoins
      );
      const marginAmount = getMarginAmount(initialDeposit, riskLevel, year);
      predictions.push({
        maxAmount: initialDeposit + marginAmount,
        minAmount: initialDeposit - marginAmount,
      });
    }

    return predictions;
  }
}
