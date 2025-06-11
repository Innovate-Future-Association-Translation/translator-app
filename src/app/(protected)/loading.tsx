'use client';
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useIsomorphicMediaQuery } from '@/hooks/useIsomorphicMediaQuery';
import LoadingUser from '@/app/module/dashboard/loading-user';

export default function Loading() {
  const isDesktop = useIsomorphicMediaQuery('(min-width: 48em)');

  if (isDesktop === null) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <LoadingUser />
      </Box>
    );
  }

  return (
    <>
      {isDesktop ? (
        <Flex
          minH="100vh"
          flexDirection="row"
          bgImage="url('/dashboard/dashboard-background-img-small.png')"
          bgSize="cover"
          w="100%"
          maxW="100vw"
          overflow="hidden"
        >
          <Flex flex="1" justifyContent="center" alignItems="center">
            <LoadingUser />
          </Flex>
        </Flex>
      ) : (
        <Flex justifyContent="center" alignItems="center" height="100vh">
          <LoadingUser />
        </Flex>
      )}
    </>
  );
}
