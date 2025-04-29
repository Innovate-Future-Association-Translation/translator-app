import React, { useState } from 'react';
import { Box, Heading, Text, Button, Image } from '@chakra-ui/react';
import MainTranslationArea from './main-translation-area';
import BottomNavBar from './bottom-nav-bar';
import JoinLinkPanel from './join-link-panel';
function MeetingRoom() {
  const [showBarCodeAndLink, setShowBarCodeAndLink] = useState(true);
  const handleCloseJoinLinkPanel = () => {
    setShowBarCodeAndLink(false);
  };
  const handleOpenJoinLinkPanel = () => {
    setShowBarCodeAndLink(true);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="2vw"
        position="relative"
      >
        <Box w="100%" px="4vw" display={{ base: 'none', md: 'flex' }} justifyContent="flex-start">
          <Heading size="md" fontFamily="Helvetica">
            <Text as="span" color="#676b6f">
              Home /{' '}
            </Text>

            <Text as="span" fontWeight="bold" color="#25292c">
              Start An Instant Meeting
            </Text>
          </Heading>
        </Box>
        <Box
          w="100%"
          display={{ base: 'flex', md: 'none' }}
          justifyContent="space-between"
          alignItems="center"
          mt="15px"
        >
          <Heading fontSize="17px" fontFamily="Helvetica">
            <Text as="span" fontSize="17px" fontWeight="bold" color="#25292c">
              Instant Meeting
            </Text>
          </Heading>
          <Button bgColor="#ff4646" borderRadius="18px" w="52px" h="32px">
            <Image src="/mobile-meeting/turn-off.svg" alt="turn-off-logo" />
          </Button>
        </Box>
        <MainTranslationArea />
        <BottomNavBar clickShare={handleOpenJoinLinkPanel} />
        {showBarCodeAndLink && <JoinLinkPanel closeThePanel={handleCloseJoinLinkPanel} />}
      </Box>
    </>
  );
}

export default MeetingRoom;
