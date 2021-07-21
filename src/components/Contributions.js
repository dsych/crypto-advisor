import React, { useContext } from 'react';
import {
  Box,
  SimpleGrid,
  Center,
  Image,
  StatNumber,
  StatHelpText,
  StatLabel,
  Stat,
  HStack,
  Text,
} from '@chakra-ui/react';
import TouchTooltip from './TouchFriendTooltip';
import TextContext from '../contexts/textContext';

export default function Contributions({ holdings, deposit }) {
  const textService = useContext(TextContext);

  const calculateContribution = (total, percent) =>
    !total || !percent
      ? Number.parseFloat(0).toFixed(2)
      : Number.parseFloat(total * (percent / 100)).toFixed(2);

  return (
    <Box>
      <HStack>
        <Text fontWeight="medium">Monthly Contribution</Text>
        <TouchTooltip text={textService.get('contibutions_help')} />
      </HStack>
      <SimpleGrid
        ml={{ base: '3%', sm: '5%', md: '5%', xl: '7%' }}
        columns={{ base: 2, md: 3 }}
        spacing={{ base: '20px', md: '40px' }}
      >
        {holdings.map((holding) => {
          return (
            <HStack key={holding.name}>
              <Image
                boxSize={{ base: '50px', md: '64px' }}
                name={holding.name}
                src={`https://assets.coincap.io/assets/icons/${holding.name.toLowerCase()}@2x.png`}
              />
              <Center>
                <Stat>
                  <StatLabel
                    style={{
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    {holding.name}
                  </StatLabel>
                  <StatNumber fontSize={{ base: '1em', md: '1.2em' }}>
                    ${calculateContribution(deposit, holding.percent)}
                  </StatNumber>
                  <StatHelpText>{holding.percent}%</StatHelpText>
                </Stat>
              </Center>
            </HStack>
          );
        })}
      </SimpleGrid>
    </Box>
  );
}
