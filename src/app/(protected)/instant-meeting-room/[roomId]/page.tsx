'use client';
import Sidebar from '@/app/module/dashboard/sidebar';
import { Box, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, use } from 'react';
import { useMeetingStore, MeetingState } from '@/store/meetingStore';

//to resolve ssr rendering issue of nextjs when apply ms sdk
const MeetingRoom = dynamic(() => import('@/app/module/instant-meeting-room/meeting-room'), {
  ssr: false,
});

const Room = ({ params: paramsPromise }: { params: Promise<{ roomId: string }> }) => {
  const resolvedParams = use(paramsPromise);
  const roomId = resolvedParams.roomId as string;
  const setMeeting = useMeetingStore((state: MeetingState) => state.setMeeting);

  useEffect(() => {
    if (roomId) {
      setMeeting({
        roomId: roomId,
        meetingURL: window.location.href,
      });
    }
  }, [roomId, setMeeting]);

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
};

export default Room;
