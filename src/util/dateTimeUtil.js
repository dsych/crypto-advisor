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

const millisecondsInDay = 86400000;

export const getNumOfDaysInMonth = (month) =>
  monthLength[Math.min(monthLength.length, Math.max(month, 0))];

export const isLeapYear = (date) =>
  (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) ||
  (date.getFullYear() % 100 === 0 && date.getFullYear() % 400 === 0);

export const getYTDTimeLimits = (sourceDate) => {
  sourceDate = sourceDate || new Date();

  const periodStart = new Date(sourceDate.getTime());

  periodStart.setFullYear(sourceDate.getFullYear() - 1);

  periodStart.setDate(1);
  periodStart.setHours(0, 0, 0);

  const periodEnd = new Date(sourceDate.getTime());
  // close period has to be one day before, which the end of previous month
  periodEnd.setTime(periodEnd.getTime() - millisecondsInDay);

  return [
    parseInt(periodStart.getTime() / 1000),
    parseInt(periodEnd.getTime() / 1000),
  ];
};
