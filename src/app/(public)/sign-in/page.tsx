'use client';

import React from 'react';
import { Suspense } from 'react';
import { Box, Flex, Image, useBreakpointValue } from '@chakra-ui/react';

import { Navbar } from '@/app/module/common/navbar';
import { SignInForm } from '../../module/sign-in/sign-in-form';

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}

function SignInContent() {
  const showImage = useBreakpointValue({ base: false, lg: true });

  return (
    <Box w="100%" h="100vh" overflow="hidden" bg="white">
      <Navbar />
      <Flex w="100%" h="calc(100vh - 60px)">
        <Flex
          w={{ base: '100%', lg: '55%' }}
          px={4}
          py={8}
          overflowY="auto"
          maxH="calc(100vh - 60px)"
          align="center"
          justify="center"
        >
          <Box maxW="md" w="full">
            <SignInForm />
          </Box>
        </Flex>
        {showImage && (
          <Flex
            w={{ base: '0', lg: '45%' }}
            h="100%"
            position="relative"
            alignItems="center"
            justifyContent="center"
          >
            <Image src="/signinPage.png" alt="Sign In Visual" objectFit="cover" w="80%" h="90%" />
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
