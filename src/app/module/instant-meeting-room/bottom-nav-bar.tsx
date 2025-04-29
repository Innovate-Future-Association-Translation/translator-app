import React from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import NavIconButton from '../common/nav-icon-button';

interface navBarOnClickActions {
  clickMic?: () => void;
  clickUser?: () => void;
  clickAItranslation?: () => void;
  clickRaiseHand?: () => void;
  clickShare?: () => void;
}

function BottomNavBar({
  clickMic,
  clickUser,
  clickAItranslation,
  clickRaiseHand,
  clickShare,
}: navBarOnClickActions) {
  return (
    <Flex
      bgColor="#ffffff"
      w={{ base: '90vw', md: '38vw' }}
      h={{ base: '5vh', md: '10vh' }}
      borderRadius="40px"
      alignItems="center"
      shadow="0 -6px 8px 0 rgba(0, 0, 0, 0.04);"
      justifyContent="center"
      px={{ base: '2px', md: '24px' }}
      gap={{ base: '2px', md: '4vw' }}
    >
      <Flex gap="2vw">
        <NavIconButton src="/navbar-icon/mic.svg" bg="#046ffb" onClick={clickMic} />
        <NavIconButton src="/navbar-icon/userWithRound.svg" bg="#ffffff" onClick={clickUser} />
        <NavIconButton
          src="/navbar-icon/ai-translation.svg"
          bg="#ffffff"
          onClick={clickAItranslation}
        />
        <NavIconButton src="/navbar-icon/raiseHand.svg" bg="#ffffff" onClick={clickRaiseHand} />
        <NavIconButton src="/navbar-icon/share.svg" bg="#ffffff" onClick={clickShare} />
      </Flex>

      <Box
        border="solid 1px #ebebeb"
        w={{ base: '72px', md: '5vw' }}
        h={{ base: '44px', md: '3vw' }}
        borderRadius="22px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap="0.4vw"
        p="0 0.8vw"
      >
        <Image
          w={{ base: '24px', md: '1.6vw' }}
          h={{ base: '24px', md: '1.6vw' }}
          src="/navbar-icon/user.svg"
          alt="user-logo"
        />
        <Text fontSize={{ base: '14px', md: '1vw' }}>1</Text>
      </Box>
    </Flex>
  );
}

export default BottomNavBar;
