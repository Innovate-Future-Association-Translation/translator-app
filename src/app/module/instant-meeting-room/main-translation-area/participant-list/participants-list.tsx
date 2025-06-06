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
      display="flex"
      flexWrap={{ base: 'wrap', md: 'nowrap' }}
      flexDir={{ base: 'row', md: 'column' }}
      alignItems={{ base: 'flex-start', md: 'center' }}
      justifyContent={{ base: 'flex-start', md: 'center' }}
      gap={3}
      overflowY="auto"
    >
      {userStatusList && userStatusList.length > 0 ? (
        userStatusList.map((user, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            bgColor="#f9f9f9"
            w={{ base: `88px`, md: '88px' }}
            h={{ base: '88px', md: '88px' }}
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
                w={{ base: '15px', md: '20px' }}
                h={{ base: '15px', md: '20px' }}
                left="5px"
                top="5px"
                src="/user-list/raise-hand-logo.svg"
                alt="User-Raise-Hand-Logo"
                position="absolute"
              />
            )}
            <Image
              w={{ base: '40px', md: '40px' }}
              h={{ base: '40px', md: '40px' }}
              src="/user-list/default-avatar.svg"
              alt="User Avatar"
            />
            <Box display="flex" flexDir="row" justifyContent="center" alignItems="center">
              <Text fontSize="12px" lineClamp={1}>
                {user.userName}
              </Text>
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
