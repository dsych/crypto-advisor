export const getRiskAllocationBasedOnRank = (coinList, riskLevel) => {
  coinList = coinList || [];
  riskLevel = +riskLevel || 1;

  const portfolio = Object.create(masks[riskLevel]);

  coinList
    .slice(0, portfolio.holdings.length)
    .forEach((el, index) => (portfolio.holdings[index].name = el.symbol));

  return portfolio;
};

const masks = {
  1: {
    label: "Conservative",
    holdings: [
      {
        percent: 80,
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
      {
        percent: 10,
      },
    ],
  },
  2: {
    label: "Conservative",
    holdings: [
      {
        percent: 75,
      },
      {
        percent: 15,
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
      {
        percent: 10,
      },
    ],
  },
  3: {
    label: "Conservative",
    holdings: [
      {
        percent: 70,
      },
      {
        percent: 20,
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
      {
        percent: 10,
      },
    ],
  },
  4: {
    label: "Balanced",
    holdings: [
      {
        percent: 65,
      },
      {
        percent: 20,
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
      {
        percent: 10,
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
        percent: 10,
      },
    ],
  },
  6: {
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
        percent: 0,
      },
      {
        percent: 0,
      },
      {
        percent: 5,
      },
    ],
  },
  7: {
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
        percent: 3,
      },
      {
        percent: 0,
      },
      {
        percent: 5,
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
        percent: 0,
      },
      {
        percent: 3,
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
        percent: 13,
      },
      {
        percent: 4,
      },
      {
        percent: 1,
      },
      {
        percent: 2,
      },
    ],
  },
  10: {
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
};
