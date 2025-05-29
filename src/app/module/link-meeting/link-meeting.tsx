'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import { useMeetingStore } from '@/store/meetingStore';
import { Box, Button, Input, Text } from '@chakra-ui/react';

function JoinRoomPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const setMeeting = useMeetingStore((state) => state.setMeeting);

  const [meetingURL, setMeetingURL] = useState('');

  const handleJoinRoom = () => {
    const trimmedURL = meetingURL.trim();
    if (!user || !trimmedURL) return;
    let roomId = '';
    try {
      const url = new URL(trimmedURL);
      const pathname = url.pathname;
      const match = pathname.match(/\/instant-meeting-room\/([^\/]+)/);
      if (match) {
        roomId = match[1];
      }
    } catch {
      const match = trimmedURL.match(/\/instant-meeting-room\/([^\/]+)/);
      if (match) {
        roomId = match[1];
      } else {
        const parts = trimmedURL.split('/');
        roomId = parts[parts.length - 1];
      }
    }

    if (!roomId) return;

    setMeeting({
      roomId,
      meetingURL: trimmedURL,
    });

    router.push(`/instant-meeting-room/${roomId}`);
  };

  return (
    <Box display="flex" h="100%" alignItems="center" justifyContent="center">
      <Box
        display="flex"
        w="520px"
        h="316px"
        borderRadius="20px"
        bgColor="#fff"
        justifyContent="center"
        alignItems="center"
      >
        <Box w="80%" display="flex" flexDir="column" gap="40px">
          <Text fontSize="26px" fontWeight="bold">
            Join Meeting
          </Text>
          <Input
            type="text"
            placeholder="Enter Meeting URL"
            value={meetingURL}
            onChange={(e) => setMeetingURL(e.target.value)}
          />
          <Button onClick={handleJoinRoom}>Join Meeting</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default JoinRoomPage;
