'use client';

import React from 'react';
import { Flex, Text, useBreakpointValue } from '@chakra-ui/react';

const MobileHeader: React.FC = () => {
  const display = useBreakpointValue({ base: 'flex', md: 'none' });

  return (
    <Flex display={display} justifyContent="flex-start" alignItems="center" p="4" bg="white">
      <Text fontWeight="bold" fontSize="lg">
        Real-time Translation
      </Text>
    </Flex>
  );
};

export default MobileHeader;
