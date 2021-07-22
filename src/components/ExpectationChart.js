import React, { useContext, useEffect, useState } from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import TouchTooltip from "./TouchFriendTooltip";
import TextContext from "../contexts/textContext";
import StatisticalContext from "../contexts/statisticalContext";

export default function ExpectationChart({ monthlyDeposit, riskLevel }) {
  const textService = useContext(TextContext);
  const statisticalService = useContext(StatisticalContext);

  const [rangeData, setRangeData] = useState([
    { year: new Date().getFullYear(), usd: [monthlyDeposit, monthlyDeposit] },
  ]);

  monthlyDeposit = Number.parseFloat(monthlyDeposit);

  useEffect(() => {
    const predictReturns = async () => {
      const currentYear = new Date().getFullYear();
      const d = await statisticalService.predictProfitForTheNext(
        5,
        monthlyDeposit,
        monthlyDeposit,
        riskLevel
      );
      setRangeData(
        d.map((v, i) =>
          Object.assign(
            {},
            {
              year: currentYear + i + 1,
              usd: [v.minAmount, v.maxAmount],
            }
          )
        )
      );
    };

    predictReturns();
  }, [monthlyDeposit, riskLevel, statisticalService]);

  return (
    <Box>
      <Box>
        <Text fontWeight="medium">
          In ${rangeData.length} years you will likely have
        </Text>
        <HStack>
          <Text fontWeight="light">
            ${rangeData[rangeData.length - 1].usd[0].toFixed(2)}-
            {rangeData[rangeData.length - 1].usd[1].toFixed(2)}
          </Text>
          <TouchTooltip text={textService.get("expectation_help")} />
        </HStack>
      </Box>
      <Box h="300px">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={rangeData}>
            <XAxis dataKey="year" interval="preserveStartEnd" />
            <YAxis domain={[0, "auto"]} hide={true} />
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
              position={{ x: "auto", y: 100 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
