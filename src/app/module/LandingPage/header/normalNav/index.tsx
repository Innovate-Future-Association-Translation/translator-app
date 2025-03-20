'use client';

import React from 'react';
import { Flex, Heading, Link } from '@chakra-ui/react';

function NormalNav() {
  return (
    <Flex as="nav" justify="space-between" align="center">
      <Heading
        fontSize={{ base: '2xl', lg: '3xl' }}
        fontWeight="bold"
        color="#066FFB"
        padding={{ base: 2, lg: 10 }}
      >
        IFA TRANSLATOR
      </Heading>

      <Flex fontSize="2xl" gap={8} hideBelow="xl">
        <Link fontSize="xl" color="black" fontWeight="bold">
          Home
        </Link>
        <Link fontSize="xl" color="black" fontWeight="bold">
          Product Function
        </Link>
        <Link fontSize="xl" color="black" fontWeight="bold">
          Pricing Schema
        </Link>
        <Link fontSize="xl" color="black" fontWeight="bold">
          Contact Us
        </Link>
      </Flex>
      <Flex gap={8} mr={10} hideBelow="xl">
        <Link fontSize="xl" color="black" fontWeight="bold" href="/sign-in">
          Sign In
        </Link>
        <Link
          fontSize="xl"
          background="black"
          color="white"
          fontWeight="bold"
          borderRadius="full"
          px={8}
          py={4}
          href="/signup"
        >
          Get Started
        </Link>
      </Flex>
    </Flex>
  );
}

export default NormalNav;
