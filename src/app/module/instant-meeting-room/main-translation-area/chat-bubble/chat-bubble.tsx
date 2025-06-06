import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

interface ChatBubbleProps {
  beforeTranslationMessage?: string;
  afterTranslation?: string;
  userName?: string;
  showTranslation?: boolean;
  creatingNewBubble?: boolean;
  isSpeaking?: boolean;
}

function ChatBubble(speechData: ChatBubbleProps) {
  const { beforeTranslationMessage, afterTranslation, userName } = speechData;

  return (
    <Box maxW="95%" ml={{ base: '0px', md: '40px' }} mb={{ base: '12px', md: '15px' }}>
      <Box display="flex" flexDir="row" gap="8px" color="#25292c">
        <Image
          src="/user-list/default-avatar.svg"
          w={{ base: '32px', md: '32px' }}
          h={{ base: '32px', md: '32px' }}
          alt="user avatar"
        />
        <Text fontSize="12px" color="#25292c">
          {userName}
        </Text>
      </Box>
      <Box
        bgColor="#f9f9f9"
        borderRadius="10px"
        fontSize={{ base: '14px', md: '14px' }}
        ml={{ base: '0', md: '40px' }}
        position="relative"
        top={{ base: '0px', md: '-8px' }}
        fontFamily="PingFangSC"
        color="#25292c"
        p="2"
      >
        {beforeTranslationMessage}
        <Box h="2" />
        <Text color="gray">{afterTranslation}</Text>
      </Box>
    </Box>
  );
}

export default ChatBubble;
