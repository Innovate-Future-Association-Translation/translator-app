import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import NavIconButton from '../common/nav-icon-button';
import { useMeetingStore } from '@/store/meetingStore';

interface navBarOnClickActions {
  clickMic?: () => void;
  clickUser?: () => void;
  clickAItranslation?: () => void;
  clickRaiseHand?: () => void;
  clickShare?: () => void;
  isListening: boolean;
  isRaiseHand: boolean;
  clickQuitMeeting?: () => void;
  toggleUserPanel?: () => void;
  toggleFullScreenUserPanel?: () => void;
  clickToQuitMeeting?: () => void;
  openParticipantsPanel: boolean;
  isHidden: boolean;
}

function BottomNavBar({
  clickMic,
  clickAItranslation,
  clickRaiseHand,
  clickShare,
  toggleUserPanel,
  toggleFullScreenUserPanel,
  clickToQuitMeeting,
  isListening,
  isRaiseHand,
  openParticipantsPanel,
  isHidden,
}: navBarOnClickActions) {
  const meetingParticipants = useMeetingStore.getState().meetingParticipants;
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
      display={{ base: isHidden ? 'none' : 'flex', md: 'flex' }}
      position="fixed"
      bottom="3vh"
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
          onClick={clickMic}
        />

        <NavIconButton
          src={
            openParticipantsPanel
              ? '/navbar-icon/userWithRound.svg'
              : '/navbar-icon/no-user-panel.svg'
          }
          bg="#ffffff"
          onClick={toggleUserPanel}
        />
        <NavIconButton
          src="/navbar-icon/ai-translation.svg"
          bg="#ffffff"
          onClick={clickAItranslation}
        />
        <NavIconButton
          src="/navbar-icon/raiseHand.svg"
          bg={isRaiseHand ? '#ffa800' : '#ffffff'}
          onClick={clickRaiseHand}
        />
        <NavIconButton src="/navbar-icon/share.svg" bg="#ffffff" onClick={clickShare} />
        <NavIconButton
          src="/quit-meeting.svg"
          bg="#dc2626"
          filter="brightness(0) invert(1)"
          onClick={clickToQuitMeeting}
        />
      </Flex>
      <Box
        border="solid 1px #ebebeb"
        w={{ base: '70px', md: '72px' }}
        h={{ base: '38px', md: '44px' }}
        borderRadius="22px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="0.4vw"
        p="0 0.8vw"
        as="button"
        onClick={toggleFullScreenUserPanel}
      >
        <Image
          w={{ base: '24px', md: '24px' }}
          h={{ base: '24px', md: '24px' }}
          src="/navbar-icon/user.svg"
          alt="user-logo-in-bottom-nav-bar"
        />
        <Text fontSize={{ base: '14px', md: '17px' }}>{meetingParticipants}</Text>
      </Box>
    </Flex>
  );
}

export default BottomNavBar;
