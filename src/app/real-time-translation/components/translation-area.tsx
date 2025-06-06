'use client';

import React, { useRef, useEffect } from 'react';
import { VStack, Box, Text, useBreakpointValue } from '@chakra-ui/react';
import TranslationBubble from './translation-bubble';
import type { TranslationBubbleData } from '../../(protected)/real-time-translation/page';

interface TranslationAreaProps {
  translations: TranslationBubbleData[];
  recognizingText?: string | null;
  isRecognizing?: boolean;
}

const TranslationArea: React.FC<TranslationAreaProps> = ({
  translations,
  recognizingText,
  isRecognizing,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const padding = useBreakpointValue({ base: 4, md: 6 });
  const paddingBottom = useBreakpointValue({ base: '130px', md: '120px' });

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
      <>
        {translations.map((bubble) => (
          <TranslationBubble key={bubble.id} bubble={bubble} />
        ))}

        {isRecognizing && recognizingText && (
          <Box alignSelf="flex-start" maxWidth={{ base: '90%', md: '85%' }} w="fit-content">
            <Box
              bgColor="#f9f9f9"
              borderRadius="10px"
              p="2"
              color="#25292c"
              fontSize={{ base: '14px', md: '14px' }}
              fontFamily="PingFangSC"
            >
              <Text lineHeight="1.4">...{recognizingText}</Text>
            </Box>
          </Box>
        )}
      </>
    </VStack>
  );
};

export default TranslationArea;
