import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

function SubScreen() {
  return (
    <Box
      w="54%"
      h="85%"
      bgColor="white"
      position="absolute"
      bottom="0"
      borderTopLeftRadius="2xl"
      borderTopRightRadius="2xl"
      p={4}
      boxShadow="lg"
    >
      <VStack gap={{ base: '4px', md: '8px' }} align="start" mb={{ base: 0, md: '0px', lg: '8px' }}>
        <Text fontWeight="normal" fontSize={{ base: '8px', md: '12px' }} color="#676b6f">
          00:20
        </Text>
        <Box w="95%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
        <Box w="95%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
        <Box w="50%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
      </VStack>
      <VStack gap={{ base: '4px', md: '8px' }} align="start" mb={{ base: 0, md: '0px', lg: '8px' }}>
        <Text fontWeight="normal" fontSize={{ base: '8px', md: '12px' }} color="#676b6f">
          00:20
        </Text>
        <Box w="95%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
      </VStack>
      <VStack gap={{ base: '4px', md: '8px' }} align="start" mb={{ base: 0, md: '0px', lg: '8px' }}>
        <Text fontWeight="normal" fontSize={{ base: '8px', md: '12px' }} color="#676b6f">
          00:20
        </Text>
        <Box w="95%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
        <Box w="95%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
        <Box w="60%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
      </VStack>
      <VStack gap={{ base: '4px', md: '8px' }} align="start" mb={{ base: 0, md: '0px', lg: '8px' }}>
        <Text fontWeight="normal" fontSize={{ base: '8px', md: '12px' }} color="#676b6f">
          00:20
        </Text>
        <Box w="50%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
        <Box w="95%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
        <Box w="95%" h={{ base: '6px', md: '12px' }} bgColor="#ebebeb" borderRadius="6px" />
      </VStack>
    </Box>
  );
}

export default SubScreen;
