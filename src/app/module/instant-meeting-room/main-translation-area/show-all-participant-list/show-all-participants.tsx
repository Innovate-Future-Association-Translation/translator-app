import React from 'react';
import { Box, Text, Image, Button } from '@chakra-ui/react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

interface userStatus {
  userName: string;
  userId: string;
  speaking: boolean;
  isRaiseHand: boolean;
  isRecognizing?: boolean;
  recognizingText?: string | null;
}

interface AllParticipantListProps {
  userStatusList?: userStatus[];
  clickToHideFullParticipantsPanel?: () => void;
}

function AllParticipantList({
  userStatusList,
  clickToHideFullParticipantsPanel,
}: AllParticipantListProps) {
  return (
    <>
      <Box
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        h="60px"
      >
        <Box ml={{ base: '0', md: '5px' }}>
          <Button bg="white" p={{ base: 0 }} onClick={clickToHideFullParticipantsPanel}>
            <KeyboardBackspaceIcon style={{ color: 'black' }} />
          </Button>
        </Box>
        <Text
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          fontSize="17px"
          fontWeight="bold"
        >
          Participant List
        </Text>
        <Box />
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        flexDir="row"
        alignItems={{ base: 'flex-start', md: 'flex-start' }}
        justifyContent={{ base: 'flex-start', md: 'flex-start' }}
        gap={3}
        pl={{ md: '20px' }}
        pr={{ md: '20px' }}
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
              border="solid 1px #d8d8d8"
            >
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
              </Box>
            </Box>
          ))
        ) : (
          <Text>No participants found.</Text>
        )}
      </Box>
    </>
  );
}

export default AllParticipantList;
