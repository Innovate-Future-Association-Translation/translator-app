import React from "react";
import { Flex, Center, Text, Box } from "@chakra-ui/react";

// Top navigation bar component
export const Navbar = () => {
  return (
    <Flex p={4} justify="space-between" align="center">
      <Flex align="center">
        <Center bg="blue.500" borderRadius="full" p={2} mr={2} boxSize="40px">
          <Text fontSize="xl" color="white" fontWeight="bold">
            f
          </Text>
        </Center>
        <Text fontSize="xl" fontWeight="bold" color="blue.500">
          IFA TRANSLATOR
        </Text>
      </Flex>
    </Flex>
  );
}; 