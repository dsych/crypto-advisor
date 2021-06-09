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
  SimpleGrid,
  Flex,
  Center,
  Image,
  StatNumber,
  StatHelpText,
  StatLabel,
  Stat,
} from "@chakra-ui/react";

export default function Advisor() {
  const dataService = useContext(DataContext);

  const [deposit, setDeposit] = useState(100);
  const [riskLevel, setRiskLevel] = useState(5);
  const [holdings, setHoldings] = useState([]);
  const [riskLevelLabel, setRiskLevelLabel] = useState("");

  useEffect(() => {
    if (deposit > 0) {
      const { holdings, label } = dataService.getHoldings(riskLevel);
      setRiskLevelLabel(label);
      setHoldings(holdings);
    }
  }, [deposit, riskLevel, dataService]);

  const calculateContribution = (total, percent) =>
    !total || !percent
      ? Number.parseFloat(0).toFixed(2)
      : Number.parseFloat(total * (percent / 100)).toFixed(2);

  return (
    <Box
      borderWidth="1px"
      maxW="800px"
      maxH="70vh"
      rounded="lg"
      m="auto"
      mt="100px"
      p="20px"
      shadow="md"
    >
      {/* Monthly Deposit */}
      <VStack spacing={4} align="stretch">
        <FormControl id="deposit">
          <FormLabel>Monthly Deposit</FormLabel>
          <NumberInput
            defaultValue={100}
            min={10}
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
        </Box>

        {/* Monthly Contribution */}
        <Box>
          <FormLabel>Monthly Contribution</FormLabel>
          <SimpleGrid columns={3} spacing="40px">
            {holdings.map((holding) => {
              return (
                <Flex key={holding.name}>
                  <Center w="120px">
                    <Image
                      name={holding.name}
                      src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${holding.picId}.png`}
                    />
                  </Center>
                  <Center w="100%">
                    <Stat>
                      <StatLabel
                        style={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        {holding.name}
                      </StatLabel>
                      <StatNumber>
                        ${calculateContribution(deposit, holding.percent)}
                      </StatNumber>
                      <StatHelpText>{holding.percent}%</StatHelpText>
                    </Stat>
                  </Center>
                </Flex>
              );
            })}
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
}