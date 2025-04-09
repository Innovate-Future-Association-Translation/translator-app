import React from "react";
import { Flex, Text } from "@chakra-ui/react";
function SmallScreenDescription() {
  return (
    <Flex
      flexDirection="column"
      w={{ base: "100%", lg: "70%" }}
      align={{ base: "center", lg: "flex-start" }}
      textAlign={{ base: "center", lg: "left" }}
      display={{ base: "flex", lg: "none" }}
    >
      <Text
        as="h1"
        fontSize={{ base: "2xl", md: "3xl", lg: "6xl" }}
        color="black"
        fontWeight="black"
      >
        Multilingual Classroom Discussion
      </Text >
      <Flex flexDirection="column" alignItems="flex-start" mb={1}>
      <Text mb={2} color="black">✅ Real-time Speech Translation</Text>
      <Text mb={2} color="black">✅ Smart Speaker Recognition</Text>
      <Text color="black">✅ Seamless Language Switching</Text>
    </Flex>
    </Flex>
  );
}

export default SmallScreenDescription;
