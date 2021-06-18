const getValueWithinLimits = (v, min, max) => {
  v = +v;

  if (Number.isNaN(v)) {
    return null;
  }

  return Math.max(min, Math.min(v, max));
};

export const getRiskAllocationBasedOnRank = (coinList, riskLevel) => {
  coinList = coinList || [];
  riskLevel =
    getValueWithinLimits(riskLevel, 0, Object.keys(masks).length - 1) || 0;

  const portfolio = Object.assign({}, masks[riskLevel]);

  coinList
    .sort((l, r) => +l.rank - +r.rank)
    .slice(0, portfolio.holdings.length)
    .forEach((el, index) => (portfolio.holdings[index].name = el.symbol));

  return portfolio;
};

const masks = {
  0: {
    label: "Conservative",
    holdings: [
      {
        percent: 80,
      },
      {
        percent: 10,
      },
      {
        percent: 10,
      },
      {
        percent: 0,
      },
      {
        percent: 0,
      },
      {
        percent: 0,
      },
    ],
  },
  1: {
    label: "Conservative",
    holdings: [
      {
        percent: 75,
      },
      {
        percent: 15,
      },
      {
        percent: 10,
      },
      {
        percent: 0,
      },
      {
        percent: 0,
      },
      {
        percent: 0,
      },
    ],
  },
  2: {
    label: "Conservative",
    holdings: [
      {
        percent: 70,
      },
      {
        percent: 20,
      },
      {
        percent: 10,
      },
      {
        percent: 0,
      },
      {
        percent: 0,
      },
      {
        percent: 0,
      },
    ],
  },
  3: {
    label: "Balanced",
    holdings: [
      {
        percent: 65,
      },
      {
        percent: 20,
      },
      {
        percent: 10,
      },
      {
        percent: 5,
      },
      {
        percent: 0,
      },
      {
        percent: 0,
      },
    ],
  },
  4: {
    label: "Balanced",
    holdings: [
      {
        percent: 60,
      },
      {
        percent: 20,
      },
      {
        percent: 10,
      },
      {
        percent: 10,
      },
      {
        percent: 0,
      },
      {
        percent: 0,
      },
    ],
  },
  5: {
    label: "Balanced",
    holdings: [
      {
        percent: 60,
      },
      {
        percent: 25,
      },
      {
        percent: 10,
      },
      {
        percent: 5,
      },
      {
        percent: 0,
      },
      {
        percent: 0,
      },
    ],
  },
  6: {
    label: "Balanced",
    holdings: [
      {
        percent: 55,
      },
      {
        percent: 25,
      },
      {
        percent: 12,
      },
      {
        percent: 5,
      },
      {
        percent: 3,
      },
      {
        percent: 0,
      },
    ],
  },
  7: {
    label: "Growth",
    holdings: [
      {
        percent: 50,
      },
      {
        percent: 30,
      },
      {
        percent: 13,
      },
      {
        percent: 4,
      },
      {
        percent: 3,
      },
      {
        percent: 0,
      },
    ],
  },
  8: {
    label: "Growth",
    holdings: [
      {
        percent: 50,
      },
      {
        percent: 30,
      },
      {
        percent: 13,
      },
      {
        percent: 4,
      },
      {
        percent: 2,
      },
      {
        percent: 1,
      },
    ],
  },
  9: {
    label: "Growth",
    holdings: [
      {
        percent: 50,
      },
      {
        percent: 30,
      },
      {
        percent: 10,
      },
      {
        percent: 4,
      },
      {
        percent: 3,
      },
      {
        percent: 3,
      },
    ],
  },
};
