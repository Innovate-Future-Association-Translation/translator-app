import { Box, Flex } from '@chakra-ui/react';
import SignUpPage from '@/module/sign-up-form/sign-up-form';
import React from "react";

export default function SignUpPageForm() {
  return (
    <Box minH="100vh" bg="white">
      <Flex
        direction={{ base: "column", md: "row" }}
        maxW="1200px"
        mx="auto"
        w="full"
        h="full"
      >
        <Box
          flex="1"
          p={{ base: 4, md: 8 }}
          display="flex"
          // 在移动端限制最大高度为80vh，超过时出现垂直滚动条；桌面端不限制
          maxH={{ base: "80vh", md: "none" }}
          overflowY={{ base: "auto", md: "visible" }}
          flexDirection="column"
          justifyContent="center"
        >
          <SignUpPage />
        </Box>

        <Box
          flex="1"
          backgroundImage="url('/icons/Sign-up-UI-TOP.png')"
          backgroundSize="contain"
          backgroundPosition="top center"
          backgroundRepeat="no-repeat"
          display={{ base: 'none', md: 'block' }}
        ></Box>
      </Flex>
    </Box>
  );
}