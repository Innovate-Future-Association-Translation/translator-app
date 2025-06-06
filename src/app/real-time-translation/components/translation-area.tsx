'use client';

import React, { useRef, useEffect } from 'react';
import { VStack, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import TranslationBubble from './translation-bubble';
import MicrophoneButton from './microphone-button';
import type { TranslationBubbleData } from '../hooks/use-real-time-translation';

interface TranslationAreaProps {
  translations: TranslationBubbleData[];
  isListening: boolean;
  userLanguage?: string;
  recognizingText?: string | null;
  isRecognizing?: boolean;
  isRetranslating?: boolean;
  onMicToggle: () => void;
}

const TranslationArea: React.FC<TranslationAreaProps> = ({
  translations,
  isListening,
  userLanguage,
  recognizingText,
  isRecognizing,
  isRetranslating,
  onMicToggle,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const showEmptyState = translations.length === 0 && !isRecognizing;
  const padding = useBreakpointValue({ base: 4, md: 6 });
  const paddingBottom = useBreakpointValue({ base: '100px', md: '120px' });

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [translations, recognizingText, isRecognizing]);

  return (
    <VStack
      ref={scrollContainerRef}
      gap={4}
      p={padding}
      flex="1"
      overflowY="auto"
      alignItems="stretch"
      pb={paddingBottom}
      position="relative"
    >
      {isRetranslating && (
        <Box
          position="sticky"
          top="0"
          zIndex="10"
          bg="blue.50"
          border="1px solid"
          borderColor="blue.200"
          borderRadius="8px"
          p={3}
          mb={2}
        >
          <Text
            fontSize={{ base: '14px', md: '15px' }}
            color="blue.600"
            textAlign="center"
            fontWeight="500"
          >
            Retranslating history messages...
          </Text>
        </Box>
      )}

      {showEmptyState ? (
        <MicrophoneButton isListening={isListening} onToggle={onMicToggle} />
      ) : (
        <>
          {translations.map((bubble) => (
            <TranslationBubble key={bubble.id} bubble={bubble} userLanguage={userLanguage} />
          ))}

          {isRecognizing && recognizingText && (
            <Box
              bg="gray.50"
              border="2px dashed"
              borderColor="blue.300"
              borderRadius={{ base: '12px', md: '16px' }}
              p={{ base: 3, md: 4 }}
              alignSelf="flex-end"
              maxW={{ base: '85%', md: '80%' }}
              position="relative"
              animation="pulse 1.5s ease-in-out infinite"
            >
              <Text
                fontSize={{ base: '14px', md: '15px' }}
                color="gray.700"
                lineHeight="1.4"
                fontWeight="500"
              >
                {recognizingText}
              </Text>
              <Box
                position="absolute"
                bottom="-8px"
                right="16px"
                w="4px"
                h="4px"
                bg="blue.400"
                borderRadius="50%"
                animation="bounce 1s ease-in-out infinite"
              />
              <Text fontSize="12px" color="blue.500" mt={1} fontWeight="500">
                Recognizing...
              </Text>
            </Box>
          )}
        </>
      )}
    </VStack>
  );
};

export default TranslationArea;
