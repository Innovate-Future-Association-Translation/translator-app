'use client';

import React from 'react';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import NavIconButton from '@/app/module/common/nav-icon-button';

interface BottomNavBarProps {
  isListening: boolean;
  onMicClick?: () => void;
  onAITranslationClick?: () => void;
  onQuitClick?: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({
  isListening,
  onMicClick,
  onAITranslationClick,
  onQuitClick,
}) => {
  const containerWidth = useBreakpointValue({
    base: '90vw',
    md: 'max(300px, min(40vw, 500px))',
  });

  const containerHeight = useBreakpointValue({
    base: '60px',
    md: 'max(60px, min(10vh, 80px))',
  });

  const borderRadius = useBreakpointValue({
    base: '30px',
    md: '40px',
  });

  const shadow = useBreakpointValue({
    base: '0 4px 20px 0 rgba(0, 0, 0, 0.15)',
    md: '0 -6px 8px 0 rgba(0, 0, 0, 0.04)',
  });

  const padding = useBreakpointValue({
    base: '12px',
    md: '24px',
  });

  const marginBottom = useBreakpointValue({
    base: '30px',
    md: '0',
  });

  const maxWidth = useBreakpointValue({
    base: '92vw',
    md: '95vw',
  });

  const margin = useBreakpointValue({
    base: 'auto',
    md: 'initial',
  });

  const gap = useBreakpointValue({
    base: '12px',
    md: 'max(16px, min(2vw, 24px))',
  });

  return (
    <Flex
      position="absolute"
      bottom="0"
      left="0"
      right="0"
      justifyContent="center"
      alignItems="center"
      zIndex="1000"
      p={{ base: 4, md: 6 }}
    >
      <Flex
        bgColor="#ffffff"
        w={containerWidth}
        h={containerHeight}
        borderRadius={borderRadius}
        alignItems="center"
        boxShadow={shadow}
        justifyContent="center"
        px={padding}
        mb={marginBottom}
        maxW={maxWidth}
        mx={margin}
      >
        <Flex gap={gap} alignItems="center" justifyContent="center">
          <NavIconButton
            src={isListening ? '/navbar-icon/mic.svg' : '/user-list/user-not-speaking.svg'}
            bg={isListening ? '#026FFB' : '#ffffff'}
            alt={isListening ? 'Stop Microphone' : 'Start Microphone'}
            onClick={onMicClick}
          />

          <NavIconButton
            src="/navbar-icon/ai-translation.svg"
            bg="#ffffff"
            alt="AI Translation Language Selector"
            onClick={onAITranslationClick}
          />

          <NavIconButton
            src="/quit-meeting.svg"
            bg="#ef4444"
            hoverBgColor="#b91c1c"
            alt="Quit Session"
            onClick={onQuitClick}
            isIconWhite
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BottomNavBar;
