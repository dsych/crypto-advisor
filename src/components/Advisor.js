import React, { useContext, useState, useEffect } from "react";
import DataContext from "../contexts/dataContext";
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
  Switch,
  Divider,
  Spinner,
} from "@chakra-ui/react";

import Contributions from "./Contributions";
import ExpectationChart from "./ExpectationChart";

export default function Advisor() {
  const dataService = useContext(DataContext);

  const [deposit, setDeposit] = useState(100);
  const [riskLevel, setRiskLevel] = useState(5);
  const [holdings, setHoldings] = useState([]);
  const [riskLevelLabel, setRiskLevelLabel] = useState("");
  const [allocationPreference, setAllocationPreference] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchRisk = async () => {
      if (deposit > 0) {
        setIsLoading(true);
        const { holdings, label } = allocationPreference
          ? await dataService.getDynamicRiskAllocationFor(riskLevel)
          : await dataService.getStaticRiskAllocationFor(riskLevel);

        setIsLoading(false);

        setRiskLevelLabel(label);
        setHoldings(holdings);
      }
    };
    fetchRisk();
  }, [deposit, riskLevel, allocationPreference, dataService]);

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
            defaultValue={100}
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
            defaultValue={5}
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
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0" htmlFor="allocation-preference">
              Use Dynamic coin allocations?
            </FormLabel>
            <Switch
              id="allocation-preference"
              size="lg"
              onChange={(value) =>
                setAllocationPreference(value.target.checked)
              }
            />
            <Spinner display={isLoading ? "block" : "none"} mx="5" />
          </FormControl>
        </Box>

        <Divider my="5" />

        {/* Monthly Contribution */}
        <Contributions holdings={holdings} deposit={deposit} />

        <ExpectationChart monthlyDeposit={deposit} riskLevel={riskLevel} />
      </VStack>
    </Box>
  );
}
