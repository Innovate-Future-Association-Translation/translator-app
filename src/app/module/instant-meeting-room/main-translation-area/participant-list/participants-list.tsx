import React from 'react';
import { Box, Text, Image } from '@chakra-ui/react';

interface userStatus {
  userName: string;
  userId: string;
  speaking: boolean;
  isRaiseHand: boolean;
  isRecognizing?: boolean;
  recognizingText?: string | null;
}
function ParticipantList({ userStatusList }: { userStatusList?: userStatus[] }) {
  return (
    <Box
      display={{ md: 'flex' }}
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      h="100%"
    >
      {userStatusList && userStatusList.length > 0 ? (
        userStatusList.map((user, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            w={{ base: '100%', md: '80%' }}
            h={{ base: '60%', md: '15%' }}
            p={4}
            borderRadius={{ base: '20px', md: '12px' }}
            position="relative"
            mb={3}
            mt={3}
            border={
              user.isRaiseHand
                ? 'solid 2px #facc15'
                : user.isRecognizing
                  ? 'solid 2px #046ffb'
                  : 'solid 1px #d8d8d8'
            }
          >
            {user.isRaiseHand && (
              <Image
                w={{ base: '10px', md: '20px' }}
                h={{ base: '10px', md: '20px' }}
                left="5px"
                top="5px"
                src="/user-list/raise-hand-logo.svg"
                alt="User-Raise-Hand-Logo"
                position="absolute"
              />
            )}
            <Image
              w={{ base: '60px', md: '40px' }}
              h={{ base: '60px', md: '40px' }}
              src="/user-list/default-avatar.svg"
              alt="User Avatar"
            />
            <Box display="flex" flexDir="row" justifyContent="center" alignItems="center">
              <Text>{user.userName}</Text>
              {user.speaking ? (
                <Image
                  w={{ base: '14px', md: '16px' }}
                  h={{ base: '14px', md: '16px' }}
                  src="/user-list/user-speaking.svg"
                  alt="User Speaking status"
                />
              ) : (
                <Image
                  src="/user-list/user-not-speaking.svg"
                  w={{ base: '14px', md: '16px' }}
                  h={{ base: '14px', md: '16px' }}
                  alt="User no-Speaking status"
                />
              )}
            </Box>
          </Box>
        ))
      ) : (
        <Text>No participants found.</Text>
      )}
    </Box>
  );
}

export default ParticipantList;
