import React, { useContext, useState, useEffect } from 'react';
import DataContext from '../contexts/dataContext';
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
} from '@chakra-ui/react';

import Contributions from './Contributions';
import ExpectationChart from './ExpectationChart';

export default function Advisor() {
  const dataService = useContext(DataContext);

  const [deposit, setDeposit] = useState(100);
  const [riskLevel, setRiskLevel] = useState(5);
  const [holdings, setHoldings] = useState([]);
  const [riskLevelLabel, setRiskLevelLabel] = useState('');

  useEffect(() => {
    if (deposit > 0) {
      const { holdings, label } = dataService.getHoldings(riskLevel);
      setRiskLevelLabel(label);
      setHoldings(holdings);
    }
  }, [deposit, riskLevel, dataService]);

  return (
    <Box
      borderWidth="1px"
      w={{ base: '80%', md: '70%', xl: '50%' }}
      rounded="lg"
      m="auto"
      mt="100px"
      p="30px"
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
        <Contributions holdings={holdings} deposit={deposit} />

        <ExpectationChart />
      </VStack>
    </Box>
  );
}
