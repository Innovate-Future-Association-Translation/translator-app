/**
 * src/app/signup/page.tsx
 */
'use client';

import React from 'react';
import { Box, Flex } from '@chakra-ui/react'; 
import SignUpPage from '@/module/sign-up-form/sign-up-form';

/**
 * Renders the signup page layout including the form and a display image.
 */
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
        {/* Left section: form area */}
        <Box
          flex="1"
          p={{ base: 4, md: 8 }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <SignUpPage />
        </Box>

        {/* Right section: display image, hidden on mobile */}
        <Box
          flex="1"
          backgroundImage="url('/icons/dashboardUI-top.png')"
          backgroundSize="contain"
          backgroundPosition="top center"
          backgroundRepeat="no-repeat"
          display={{ base: 'none', md: 'block' }}
        ></Box>
      </Flex>
    </Box>
  );
}