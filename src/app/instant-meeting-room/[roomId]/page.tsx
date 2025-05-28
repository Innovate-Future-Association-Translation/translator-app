'use client';
import Sidebar from '@/app/module/dashboard/sidebar';
import { Box, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

//to resolve ssr rendering issue of nextjs when apply ms sdk
const MeetingRoom = dynamic(() => import('@/app/module/instant-meeting-room/meeting-room'), {
  ssr: false,
});

export default function InstantMeetingRoomPage() {
  return (
    <>
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
          <MeetingRoom />
        </Box>
      </Flex>
    </>
  );
}
