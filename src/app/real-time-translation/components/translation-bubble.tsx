'use client';

import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import type { TranslationBubbleData } from '../../(protected)/real-time-translation/page';

interface TranslationBubbleProps {
  bubble: TranslationBubbleData;
}

const TranslationBubble: React.FC<TranslationBubbleProps> = ({ bubble }) => {
  return (
    <Box alignSelf="flex-start" maxWidth={{ base: '90%', md: '85%' }} w="fit-content">
      <Box
        bgColor="#f5f5f5"
        borderRadius="10px"
        p="2"
        color="#25292c"
        fontSize={{ base: '14px', md: '14px' }}
        fontFamily="PingFangSC"
      >
        <Text lineHeight="1.4">{bubble.original}</Text>

        <Box h="2" />

        <Text color="gray" lineHeight="1.4">
          {bubble.translated}
        </Text>
      </Box>
      <Text fontSize="11px" color="gray.400" mt={1} textAlign="right">
        {new Date(bubble.timestamp).toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </Text>
    </Box>
  );
};

export default TranslationBubble;
