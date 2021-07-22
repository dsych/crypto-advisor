import TextContext from "../contexts/textContext";
import React, { useContext, useState, useEffect } from "react";
import StatisticalContext from "../contexts/statisticalContext";
import CacheContext from "../contexts/cacheContext";
import {
  Box,
  VStack,
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
  HStack,
  Text,
} from "@chakra-ui/react";
import TouchTooltip from "./TouchFriendTooltip";

import Contributions from "./Contributions";
import ExpectationChart from "./ExpectationChart";

const depositKey = "deposit";
const riskLevelKey = "riskLevel";

export default function Advisor() {
  const textService = useContext(TextContext);
  const statisticalService = useContext(StatisticalContext);
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
        const {
          holdings,
          label,
        } = await statisticalService.getCoinAllocationsFor(riskLevel);

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
  }, [deposit, riskLevel, statisticalService, cacheService]);

  return (
    <Box
      borderWidth="1px"
      w={{ base: "90%", sm: "80%", md: "70%", xl: "45%" }}
      rounded="lg"
      m="auto"
      mt={{ base: "5%" }}
      mb={{ base: "5%" }}
      p="30px"
      shadow="md"
    >
      {/* Monthly Deposit */}
      <VStack spacing={4} align="stretch">
        <HStack>
          <Text fontWeight="medium">Monthly Deposit</Text>
          <TouchTooltip text={textService.get("montly_deposit_help")} />
        </HStack>
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

        {/* Risk Level */}
        <Box>
          <HStack>
            <Text fontWeight="medium">Risk Level ({riskLevelLabel})</Text>
            <TouchTooltip text={textService.get("risklevel_help")} />
          </HStack>
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
          <Spinner
            size="xl"
            emptyColor="gray.200"
            color="blue.500"
            display={isLoading ? "block" : "none"}
            mx="5"
          />
        ) : (
          <Contributions holdings={holdings} deposit={deposit} />
        )}

        <ExpectationChart monthlyDeposit={deposit} riskLevel={riskLevel} />
      </VStack>
    </Box>
  );
}
