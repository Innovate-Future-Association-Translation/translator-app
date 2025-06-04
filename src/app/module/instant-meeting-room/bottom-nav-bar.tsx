import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import NavIconButton from '../common/nav-icon-button';
import QuitMeetingButton from '../common/quit-meeting-button';

interface navBarOnClickActions {
  clickMic?: () => void;
  clickUser?: () => void;
  clickAItranslation?: () => void;
  clickRaiseHand?: () => void;
  clickShare?: () => void;
  isListening: boolean;
  isRaiseHand: boolean;
  clickQuitMeeting?: () => void;
}

function BottomNavBar({
  clickMic,
  clickUser,
  clickAItranslation,
  clickRaiseHand,
  clickShare,
  isListening,
  isRaiseHand,
}: navBarOnClickActions) {
  return (
    <Flex
      bgColor="#ffffff"
      w={{ base: '90vw', md: 'max(480px, min(50vw, 700px))' }}
      h={{ base: '60px', md: 'max(60px, min(10vh, 80px))' }}
      borderRadius={{ base: '30px', md: '40px' }}
      alignItems="center"
      shadow={{ base: '0 4px 20px 0 rgba(0, 0, 0, 0.15)', md: '0 -6px 8px 0 rgba(0, 0, 0, 0.04)' }}
      justifyContent="space-between"
      px={{ base: '12px', md: '24px' }}
      mb={{ base: '30px', md: '0' }}
      maxW={{ base: '92vw', md: '95vw' }}
      minW={{ base: '360px', md: '480px' }}
      mx={{ base: 'auto', md: 'initial' }}
    >
      <Flex
        gap={{ base: '6px', md: 'max(8px, min(1.5vw, 16px))' }}
        alignItems="center"
        minW={{ base: '280px', md: '360px' }}
        justifyContent="center"
        flex="1"
      >
        <NavIconButton
          src={isListening ? '/navbar-icon/mic.svg' : '/user-list/user-not-speaking.svg'}
          bg={isListening ? '#026FFB' : '#ffffff'}
          alt={isListening ? 'Stop microphone' : 'Start microphone'}
          onClick={clickMic}
        />

        <NavIconButton
          src="/navbar-icon/userWithRound.svg"
          bg="#ffffff"
          alt="User settings"
          onClick={clickUser}
        />
        <NavIconButton
          src="/navbar-icon/ai-translation.svg"
          bg="#ffffff"
          alt="AI translation language selector"
          onClick={clickAItranslation}
        />
        <NavIconButton
          src="/navbar-icon/raiseHand.svg"
          bg={isRaiseHand ? '#ffa800' : '#ffffff'}
          alt={isRaiseHand ? 'Lower hand' : 'Raise hand'}
          onClick={clickRaiseHand}
        />
        <NavIconButton src="/navbar-icon/share.svg" bg="#ffffff" alt="Share" onClick={clickShare} />
        <QuitMeetingButton imageSrc="/quit-meeting.svg" />
      </Flex>

      <Box
        border="solid 1px #ebebeb"
        w={{ base: '72px', md: 'max(60px, min(5vw, 80px))' }}
        h={{ base: '44px', md: 'max(44px, min(3vw, 60px))' }}
        borderRadius="22px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p="0 8px"
        flexShrink={0}
        ml={{ base: '8px', md: '16px' }}
      >
        <Image
          w={{ base: '24px', md: 'max(20px, min(1.6vw, 28px))' }}
          h={{ base: '24px', md: 'max(20px, min(1.6vw, 28px))' }}
          src="/navbar-icon/user.svg"
          alt="user-logo-in-bottom-nav-bar"
        />
        <Text fontSize={{ base: '14px', md: 'max(12px, min(1vw, 16px))' }} fontWeight="500">
          1
        </Text>
      </Box>
    </Flex>
  );
}

export default BottomNavBar;
