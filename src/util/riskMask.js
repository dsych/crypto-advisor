const getValueWithinLimits = (v, min, max) => {
  v = +v;

  if (Number.isNaN(v)) {
    return null;
  }

  return Math.max(min, Math.min(v, max));
};

export const getRiskAllocationBasedOnRank = (coinList, riskLevel) => {
  coinList = coinList || [];
  console.log('cointlist', coinList);

  riskLevel =
    getValueWithinLimits(riskLevel, 0, Object.keys(masks).length - 1) || 0;

  const portfolio = Object.assign({}, masks[riskLevel]);

  coinList
    .sort((l, r) => +l.rank - +r.rank)
    .slice(0, portfolio.holdings.length)
    .forEach((el, index) => (portfolio.holdings[index].name = el.symbol));

  console.log('portfolio', portfolio);

  return portfolio;
};

const masks = {
  0: {
    label: 'Conservative',
    holdings: [
      {
        percent: 80,
        name: 'btc',
      },
      {
        percent: 10,
        name: 'eth',
      },
      {
        percent: 10,
        name: 'bnb',
      },
      {
        percent: 0,
        name: 'xrp',
      },
      {
        percent: 0,
        name: 'ada',
      },
      {
        percent: 0,
        name: 'uni',
      },
    ],
  },
  1: {
    label: 'Conservative',
    holdings: [
      {
        percent: 75,
        name: 'btc',
      },
      {
        percent: 15,
        name: 'eth',
      },
      {
        percent: 10,
        name: 'bnb',
      },
      {
        percent: 0,
        name: 'xrp',
      },
      {
        percent: 0,
        name: 'ada',
      },
      {
        percent: 0,
        name: 'uni',
      },
    ],
  },
  2: {
    label: 'Conservative',
    holdings: [
      {
        percent: 70,
        name: 'btc',
      },
      {
        percent: 20,
        name: 'eth',
      },
      {
        percent: 10,
        name: 'bnb',
      },
      {
        percent: 0,
        name: 'xrp',
      },
      {
        percent: 0,
        name: 'ada',
      },
      {
        percent: 0,
        name: 'uni',
      },
    ],
  },
  3: {
    label: 'Balanced',
    holdings: [
      {
        percent: 65,
        name: 'btc',
      },
      {
        percent: 20,
        name: 'eth',
      },
      {
        percent: 10,
        name: 'bnb',
      },
      {
        percent: 5,
        name: 'xrp',
      },
      {
        percent: 0,
        name: 'ada',
      },
      {
        percent: 0,
        name: 'uni',
      },
    ],
  },
  4: {
    label: 'Balanced',
    holdings: [
      {
        percent: 60,
        name: 'btc',
      },
      {
        percent: 20,
        name: 'eth',
      },
      {
        percent: 10,
        name: 'bnb',
      },
      {
        percent: 10,
        name: 'xrp',
      },
      {
        percent: 0,
        name: 'ada',
      },
      {
        percent: 0,
        name: 'uni',
      },
    ],
  },
  5: {
    label: 'Balanced',
    holdings: [
      {
        percent: 60,
        name: 'btc',
      },
      {
        percent: 25,
        name: 'eth',
      },
      {
        percent: 10,
        name: 'bnb',
      },
      {
        percent: 5,
        name: 'xrp',
      },
      {
        percent: 0,
        name: 'ada',
      },
      {
        percent: 0,
        name: 'uni',
      },
    ],
  },
  6: {
    label: 'Balanced',
    holdings: [
      {
        percent: 55,
        name: 'btc',
      },
      {
        percent: 25,
        name: 'eth',
      },
      {
        percent: 12,
        name: 'bnb',
      },
      {
        percent: 5,
        name: 'xrp',
      },
      {
        percent: 3,
        name: 'ada',
      },
      {
        percent: 0,
        name: 'uni',
      },
    ],
  },
  7: {
    label: 'Growth',
    holdings: [
      {
        percent: 50,
        name: 'btc',
      },
      {
        percent: 30,
        name: 'eth',
      },
      {
        percent: 13,
        name: 'bnb',
      },
      {
        percent: 4,
        name: 'xrp',
      },
      {
        percent: 3,
        name: 'ada',
      },
      {
        percent: 0,
        name: 'uni',
      },
    ],
  },
  8: {
    label: 'Growth',
    holdings: [
      {
        percent: 50,
        name: 'btc',
      },
      {
        percent: 30,
        name: 'eth',
      },
      {
        percent: 13,
        name: 'bnb',
      },
      {
        percent: 4,
        name: 'xrp',
      },
      {
        percent: 2,
        name: 'ada',
      },
      {
        percent: 1,
        name: 'uni',
      },
    ],
  },
  9: {
    label: 'Growth',
    holdings: [
      {
        percent: 50,
        name: 'btc',
      },
      {
        percent: 30,
        name: 'eth',
      },
      {
        percent: 10,
        name: 'bnb',
      },
      {
        percent: 4,
        name: 'xrp',
      },
      {
        percent: 3,
        name: 'ada',
      },
      {
        percent: 3,
        name: 'uni',
      },
    ],
  },
};
