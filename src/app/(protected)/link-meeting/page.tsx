'use client';
import React from 'react';
import JoinRoomPage from '../../module/link-meeting/link-meeting';
import Sidebar from '../../module/dashboard/sidebar';
import { Flex, Box } from '@chakra-ui/react';

function Page() {
  return (
    <Flex minH="100vh" flexDirection="row">
      <Box width="88px" bg="white" boxShadow="md" display={{ base: 'none', md: 'block' }}>
        <Sidebar />
      </Box>
      <Box
        flex="1"
        p={6}
        bgImage={{ base: 'none', md: "url('/dashboard/dashboard-background-img-small.png')" }}
        bgSize="cover"
      >
        <JoinRoomPage />
      </Box>
    </Flex>
  );
}

export default Page;
