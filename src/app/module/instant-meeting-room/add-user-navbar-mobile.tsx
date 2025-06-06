import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useMeetingStore } from '@/store/meetingStore';

interface navBarOnClickActions {
  isHidden: boolean;
}

function AddUserNavBarInMobile({ isHidden }: navBarOnClickActions) {
  const meetingParticipants = useMeetingStore.getState().meetingParticipants;
  return (
    <Flex
      bgColor="#ffffff"
      w="100vw"
      h="70px"
      borderRadius="20px 20px 0 0"
      alignItems="center"
      shadow={{ base: '0 4px 20px 0 rgba(0, 0, 0, 0.15)', md: '0 -6px 8px 0 rgba(0, 0, 0, 0.04)' }}
      justifyContent="space-between"
      px={{ base: '12px', md: '24px' }}
      mb={{ base: '0px', md: '0' }}
      maxW={{ base: '92vw', md: '95vw' }}
      minW={{ base: '360px', md: '480px' }}
      mx={{ base: 'auto', md: 'initial' }}
      display={{ base: !isHidden ? 'flex' : 'none', md: 'none' }}
    >
      <Box
        as="button"
        color="white"
        backgroundColor="black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="20px"
        borderRadius="20px"
        w="60%"
        h="60px"
      >
        <Text fontSize="20px" color="white" textAlign="center">
          Add others
        </Text>
      </Box>
      <Box
        border="solid 1px #ebebeb"
        w="30%"
        h="60px"
        borderRadius="22px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="0.4vw"
        p="0 0.8vw"
        as="button"
      >
        <Image
          w={{ base: '24px', md: '1.6vw' }}
          h={{ base: '24px', md: '1.6vw' }}
          src="/navbar-icon/user.svg"
          alt="user-logo-in-bottom-nav-bar"
        />
        <Text fontSize={{ base: '14px', md: '1vw' }}>{meetingParticipants}</Text>
      </Box>
    </Flex>
  );
}

export default AddUserNavBarInMobile;
