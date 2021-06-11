import React from 'react';
import { Box, FormLabel } from '@chakra-ui/react';
import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const rangeData = [
  {
    year: '2021',
    usd: [100, 100],
  },
  {
    year: '2022',
    usd: [150, 230],
  },
  {
    year: '2023',
    usd: [240, 400],
  },
  {
    year: '2024',
    usd: [350, 600],
  },
  {
    year: '2025',
    usd: [480, 900],
  },
];

export default function ExpectationChart() {
  return (
    <Box h="250px">
      <FormLabel>In 5 years we expect you to have</FormLabel>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart width={700} height={250} data={rangeData}>
          <XAxis dataKey="year" />
          <Area type="monotone" dataKey="usd" stroke="#8884d8" fill="#8884d8" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}
