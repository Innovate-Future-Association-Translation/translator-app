'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/userContext';
import { useMeetingContext } from '@/context/meetingContext';
import { Box, Button, Input, Text } from '@chakra-ui/react';

function JoinRoomPage() {
  const router = useRouter();
  const { user } = useUser();
  const { setMeeting } = useMeetingContext();

  const [meetingURL, setMeetingURL] = useState('');

  const handleJoinRoom = () => {
    const trimmedURL = meetingURL.trim();
    if (!user || !trimmedURL) return;
    const parts = trimmedURL.split('/');
    const roomId = parts[parts.length - 1];

    if (!roomId) return;

    setMeeting({
      roomId,
      meetingURL: trimmedURL,
    });

    router.push(trimmedURL);
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
