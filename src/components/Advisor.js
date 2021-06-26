import React, { useContext, useState, useEffect } from "react";
import DataContext from "../contexts/dataContext";
import CacheContext from "../contexts/cacheContext";
import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Divider,
  Spinner,
} from "@chakra-ui/react";

import Contributions from "./Contributions";
import ExpectationChart from "./ExpectationChart";

const depositKey = "deposit";
const riskLevelKey = "riskLevel";

export default function Advisor() {
  const dataService = useContext(DataContext);
  const cacheService = useContext(CacheContext);

  const [deposit, setDeposit] = useState(+cacheService.get(depositKey, 100));
  const [riskLevel, setRiskLevel] = useState(
    +cacheService.get(riskLevelKey, 5)
  );

  const [holdings, setHoldings] = useState([]);
  const [riskLevelLabel, setRiskLevelLabel] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRisk = async () => {
      if (deposit > 0) {
        const { holdings, label } = await dataService.getCoinAllocationsFor(
          riskLevel
        );

        setIsLoading(false);
        setRiskLevelLabel(label);
        setHoldings(holdings);

        // also cache the info
        await Promise.all([
          cacheService.updateWithDelay(depositKey, deposit),
          cacheService.updateWithDelay(riskLevelKey, riskLevel),
        ]);
      }
    };
    fetchRisk();
  }, [deposit, riskLevel, dataService, cacheService]);

  return (
    <Box
      borderWidth="1px"
      w={{ base: "80%", md: "70%", xl: "50%" }}
      rounded="lg"
      m="auto"
      mt="100px"
      mb="100px"
      p="30px"
      shadow="md"
    >
      {/* Monthly Deposit */}
      <VStack spacing={4} align="stretch">
        <FormControl id="deposit">
          <FormLabel>Monthly Deposit</FormLabel>
          <NumberInput
            value={deposit}
            min={0}
            step={10}
            onChange={(value) => setDeposit(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        {/* Risk Level */}
        <Box>
          <FormLabel>Risk Level ({riskLevelLabel})</FormLabel>
          <Slider
            name="riskLevel"
            value={riskLevel}
            min={1}
            max={10}
            step={1}
            onChange={(value) => setRiskLevel(value)}
          >
            <SliderTrack>
              <Box position="relative" right={10} />
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </Box>

        <Divider my="5" />

        {/* Monthly Contribution */}
        {isLoading ? (
          <Spinner size="xl" display={isLoading ? "block" : "none"} mx="5" />
        ) : (
          <Contributions holdings={holdings} deposit={deposit} />
        )}

        <ExpectationChart monthlyDeposit={deposit} riskLevel={riskLevel} />
      </VStack>
    </Box>
  );
}
