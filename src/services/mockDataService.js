export default class MockDataService {
  _breakDowns = {
    1: [
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
    2: [
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
    3: [
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
    4: [
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
    5: [
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
    6: [
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
    7: [
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
    8: [
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
    9: [
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
    10: [
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
  };

  getHoldings(monthlyDeposit, riskLevel) {
    //TODO
    return this._breakDowns[riskLevel];
  }
}
