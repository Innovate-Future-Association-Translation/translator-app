'use client';

import React, { useState, useEffect } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';
import { useMeetingContext } from '@/context/meetingContext';
import { getMeetingParticipantInfo } from '@/lib/api';

function ParticipantList() {
  const { meeting } = useMeetingContext();
  const [nameList, setNameList] = useState<string[]>([]);

  useEffect(() => {
    if (meeting && meeting.roomId) {
      const fetchParticipants = async () => {
        try {
          const response = await getMeetingParticipantInfo(meeting.roomId);
          console.log('Fetched participants:', response);
          setNameList(response.map((p: { name: string }) => p.name));
        } catch (error) {
          console.error('Error fetching participants:', error);
        }
      };
      fetchParticipants();
    }
  }, [meeting]);

  return (
    <Box
      display={{ md: 'flex' }}
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      h="100%"
    >
      {nameList.length > 0 ? (
        nameList.map((name, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            w={{ base: '100%', md: '80%' }}
            h={{ base: '60%', md: '15%' }}
            p={4}
            border={{ base: 'none', md: '1px solid #d8d8d8' }}
            borderRadius={{ base: '20px', md: '12px' }}
            bgColor={{ base: '#f9f9f9', md: '#F7FAFD' }}
            mb={3}
            mt={3}
          >
            <Image
              w={{ base: '60px', md: '40px' }}
              h={{ base: '60px', md: '40px' }}
              src="/user-list/default-avatar.svg"
              alt="User Avatar"
            />
            <Text>{name}</Text>
          </Box>
        ))
      ) : (
        <Text>No participants found.</Text>
      )}
    </Box>
  );
}

export default ParticipantList;
