'use client';

import React from 'react';
import { Flex, Heading, Link, Image, Box } from '@chakra-ui/react';

function NormalNav() {
  return (
    <Flex as="nav" justify="space-between" align="center" mt="20px">
      <Box
        display="flex"
        flexDir="row"
        gap={{ base: '3px', md: '2px' }}
        alignItems="center"
        justifyContent="center"
        ml={{ base: '2%', md: '5%' }}
        mt={{ base: '2%', md: '0px' }}
      >
        <Image
          w={{ base: '24px', md: '40px' }}
          h={{ base: '24px', md: '40px' }}
          src="/business-logo-middle.png"
          alt="business-logo"
        />
        <Heading
          fontSize={{ base: '2xl', lg: '19px' }}
          fontWeight="bold"
          color="#066FFB"
          padding={{ base: 'px', lg: '5px' }}
          fontFamily="Helvetica"
        >
          IFA TRANSLATOR
        </Heading>
      </Box>
      <Flex gap="32px" hideBelow="xl">
        <Link fontSize="19px" color="black" fontWeight="bold">
          Home
        </Link>
        <Link fontSize="19px" color="black" fontWeight="bold">
          Product Function
        </Link>
        <Link fontSize="19px" color="black" fontWeight="bold">
          Pricing Schema
        </Link>
        <Link fontSize="19px" color="black" fontWeight="bold">
          Contact Us
        </Link>
      </Flex>
      <Flex gap="20px" mr="80px" hideBelow="xl">
        <Link
          fontSize="14px"
          color="black"
          fontFamily="Helvetica"
          fontWeight="bold"
          href="/sign-in"
        >
          Sign In
        </Link>
        <Link
          fontSize="14px "
          background="#25292c"
          color="#fff"
          fontWeight="bold"
          borderRadius="25px"
          padding="9px 16px 10px"
          fontFamily="Helvetica"
          href="/signup"
        >
          Get Started
        </Link>
      </Flex>
    </Flex>
  );
}

export default NormalNav;
