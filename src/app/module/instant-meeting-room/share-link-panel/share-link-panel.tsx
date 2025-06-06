import React from 'react';
import { Box, Button, Image, Flex, Text } from '@chakra-ui/react';
import AddUserButton from '../../common/add-user-button';
import { useMeetingStore } from '@/store/meetingStore';
import QRCodeGenerator from './qrCodeGenerator';
import URLClipboard from './url-clipboard';

interface shareLinkPanelProps {
  closeThePanel: () => void;
}

function ShareLinkPanel({ closeThePanel }: shareLinkPanelProps) {
  const meeting = useMeetingStore((state) => state.meeting);

  const meetingURL = meeting?.meetingURL;
  return (
    <Box
      zIndex="1"
      w="340px"
      h="396px"
      borderRadius="20px"
      boxShadow="0 0 16px 0 rgba(0, 0, 0, 0.08)"
      position="fixed"
      bgColor="#fff"
      bottom={{ base: '20vh', md: '10vh' }}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      px="24px"
      py="16px"
      gap="1vw"
    >
      <Flex w="100%" h="10%" justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" fontSize="md">
          Your meeting is ready
        </Text>
        <Button
          onClick={closeThePanel}
          bgColor="#fff"
          borderRadius="50%"
          p={0}
          minW="auto"
          h="24px"
          _hover={{ bg: 'gray.100' }}
        >
          <Image src="/join-link-panel/close.svg" w="16px" h="16px" alt="close-Icon" />
        </Button>
      </Flex>
      <AddUserButton backgroundColor="#046ffb" information="Add others" />
      <Text fontSize="14px">Or scan the QR code to join the meeting</Text>
      {meeting?.roomId && <QRCodeGenerator roomId={meeting.roomId} />}
      <Text fontSize="14px">Or share this meeting link with others you want in the meeting</Text>
      <Box
        bgColor="#E5F0FE"
        w="100%"
        h="10%"
        borderRadius="18px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {meetingURL && <URLClipboard url={meetingURL} />}
      </Box>
    </Box>
  );
}

export default ShareLinkPanel;
