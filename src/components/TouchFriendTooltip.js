import React, { useState } from 'react';
import { Tooltip, Box } from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';

export default function TouchFriendTooltip({ text }) {
  const [isLabelOpen, setIsLabelOpen] = useState(false);
  return (
    <Box pb="2px">
      <Tooltip
        hasArrow
        placement="auto"
        rounded="lg"
        p="3%"
        label={text}
        isOpen={isLabelOpen}
      >
        <QuestionIcon
          onMouseEnter={() => setIsLabelOpen(true)}
          onMouseLeave={() => setIsLabelOpen(false)}
          onClick={() => setIsLabelOpen(true)}
          color="gray.400"
        />
      </Tooltip>
    </Box>
  );
}
