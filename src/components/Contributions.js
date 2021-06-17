import React from "react";
import {
  Box,
  FormLabel,
  SimpleGrid,
  Center,
  Image,
  StatNumber,
  StatHelpText,
  StatLabel,
  Stat,
  HStack,
} from "@chakra-ui/react";

export default function Contributions({ holdings, deposit }) {
  const calculateContribution = (total, percent) =>
    !total || !percent
      ? Number.parseFloat(0).toFixed(2)
      : Number.parseFloat(total * (percent / 100)).toFixed(2);

  return (
    <Box>
      <FormLabel>Monthly Contribution</FormLabel>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing="40px">
        {holdings.map((holding) => {
          return (
            <HStack key={holding.name}>
              <Image
                boxSize={{ base: "50px", md: "64px" }}
                name={holding.name}
                src={`https://assets.coincap.io/assets/icons/${holding.name.toLowerCase()}@2x.png`}
              />
              <Center>
                <Stat>
                  <StatLabel
                    style={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    {holding.name}
                  </StatLabel>
                  <StatNumber fontSize={{ base: "1em", md: "1.2em" }}>
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
