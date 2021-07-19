import React, { useContext } from 'react';
import { Box, Text, HStack } from '@chakra-ui/react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import TouchTooltip from './TouchFriendTooltip';
import TextContext from '../contexts/textContext';

const getMarginAmount = (amount, riskLevel) => {
  const margin = 10; //10% base margin
  return (amount / 100) * (margin + riskLevel * 2);
};

const getYearIncome = (currentAmount, monthlyDeposit) => {
  for (let i = 0; i < 12; i++) {
    //4% a month
    currentAmount *= 1.04;
    //+ monthly deposit
    currentAmount += monthlyDeposit;
  }
  return currentAmount;
};

export default function ExpectationChart({ monthlyDeposit, riskLevel }) {
  const textService = useContext(TextContext);

  monthlyDeposit = Number.parseFloat(monthlyDeposit);

  const year1 = getYearIncome(monthlyDeposit, monthlyDeposit);
  const year2 = getYearIncome(year1, monthlyDeposit);
  const year3 = getYearIncome(year2, monthlyDeposit);
  const year4 = getYearIncome(year3, monthlyDeposit);
  const year5 = getYearIncome(year4, monthlyDeposit);

  const year5minusMargin = year5 - getMarginAmount(year5, riskLevel);
  const year5plusMargin = year5 + getMarginAmount(year5, riskLevel);

  const currentYear = new Date().getFullYear();
  const rangeData = [
    {
      year: currentYear + 1,
      usd: [
        year1 - getMarginAmount(year1, riskLevel),
        year1 + getMarginAmount(year1, riskLevel),
      ],
    },
    {
      year: currentYear + 2,
      usd: [
        year2 - getMarginAmount(year2, riskLevel),
        year2 + getMarginAmount(year2, riskLevel),
      ],
    },
    {
      year: currentYear + 3,
      usd: [
        year3 - getMarginAmount(year3, riskLevel),
        year3 + getMarginAmount(year3, riskLevel),
      ],
    },
    {
      year: currentYear + 4,
      usd: [
        year4 - getMarginAmount(year4, riskLevel),
        year4 + getMarginAmount(year4, riskLevel),
      ],
    },
    {
      year: currentYear + 5,
      usd: [year5minusMargin, year5plusMargin],
    },
  ];

  return (
    <Box>
      <Box>
        <Text fontWeight="medium">In 5 years you will likely have</Text>
        <HStack>
          <Text fontWeight="light">
            ${year5minusMargin.toFixed(2)}-{year5plusMargin.toFixed(2)}
          </Text>
          <TouchTooltip text={textService.get('expectation_help')} />
        </HStack>
      </Box>
      <Box h="300px">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rangeData}>
            <XAxis dataKey="year" interval="preserveStartEnd" />
            <YAxis domain={[0, year5 * 1.4]} hide={true} />
            <Area
              type="monotone"
              dataKey="usd"
              name="$"
              stroke="#3182ce"
              fill="#4299e199"
            />
            <Tooltip
              formatter={(value) =>
                `${value[0].toFixed(2)} - ${value[1].toFixed(2)}`
              }
              position={{ x: 'auto', y: 100 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
