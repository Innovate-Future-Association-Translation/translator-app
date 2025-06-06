'use client';

import React from 'react';
import { Suspense } from 'react';
import { Box, Flex, Image, useBreakpointValue } from '@chakra-ui/react';

import { Navbar } from '@/app/module/common/navbar';
import { SignUpForm } from '../../module/sign-up/sign-up-form';
import { outerBoxProps, scrollBoxProps } from '../../module/sign-up/signup-style';

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUpContent />
    </Suspense>
  );
}

function SignUpContent() {
  const showImage = useBreakpointValue({ base: false, lg: true });

  return (
    <Box {...outerBoxProps}>
      <Navbar />

      <Flex w="100%" h="calc(100vh - 60px)">
        <Box w={{ base: '100%', lg: '55%' }} px={4} py={8}>
          <Box {...scrollBoxProps}>
            <SignUpForm />
          </Box>
        </Box>

        {showImage && (
          <Box
            w={{ base: '0', lg: '45%' }}
            h="100%"
            position="relative"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box w="100%" h="100%">
              <Image
                src="/signinPage.png"
                alt="Global Innovators"
                objectFit="cover"
                w="80%"
                h="90%"
              />
            </Box>
          </Box>
        )}
      </Flex>
    </Box>
  );
}
