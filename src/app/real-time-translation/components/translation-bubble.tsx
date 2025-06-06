'use client';

import React from 'react';
import { Box, Text, Flex, Spinner } from '@chakra-ui/react';
import type { TranslationBubbleData } from '../hooks/use-real-time-translation';

interface TranslationBubbleProps {
  bubble: TranslationBubbleData;
  userLanguage?: string;
}

const TranslationBubble: React.FC<TranslationBubbleProps> = ({ bubble, userLanguage }) => {
  const hasTranslation = bubble.translated && bubble.translated.trim() !== '';
  const isTranslating = !hasTranslation;

  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius={{ base: '12px', md: '16px' }}
      p={{ base: 3, md: 4 }}
      alignSelf="flex-start"
      maxWidth={{ base: '90%', md: '85%' }}
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: 'md' }}
    >
      <Box mb={3}>
        <Text fontSize={{ base: '12px', md: '13px' }} color="gray.500" fontWeight="500" mb={1}>
          Original
        </Text>
        <Text
          fontSize={{ base: '14px', md: '15px' }}
          color="gray.800"
          lineHeight="1.4"
          fontWeight="500"
        >
          {bubble.original}
        </Text>
      </Box>

      <Box borderTop="1px solid" borderColor="gray.100" pt={3}>
        <Flex align="center" justify="space-between" mb={1}>
          <Text fontSize={{ base: '12px', md: '13px' }} color="blue.500" fontWeight="500">
            Translation ({userLanguage || 'zh'})
          </Text>

          {isTranslating && (
            <Flex align="center" gap={1}>
              <Spinner size="xs" color="blue.400" />
              <Text fontSize="11px" color="blue.400">
                Translating...
              </Text>
            </Flex>
          )}
        </Flex>

        {hasTranslation ? (
          <Text
            fontSize={{ base: '14px', md: '15px' }}
            color="blue.600"
            lineHeight="1.4"
            fontWeight="500"
          >
            {bubble.translated}
          </Text>
        ) : (
          <Text
            fontSize={{ base: '14px', md: '15px' }}
            color="gray.400"
            lineHeight="1.4"
            fontStyle="italic"
          >
            Waiting for translation...
          </Text>
        )}
      </Box>

      <Text fontSize="11px" color="gray.400" mt={2} textAlign="right">
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
