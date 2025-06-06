'use client';

import React from 'react';
import { Flex, Box, Icon, Text, useBreakpointValue } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { FiMic } from 'react-icons/fi';

interface MicrophoneButtonProps {
  isListening: boolean;
  onToggle: () => void;
}

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({ isListening, onToggle }) => {
  const buttonSize = useBreakpointValue({ base: '200px', md: '300px' });
  const iconSize = useBreakpointValue({ base: '60px', md: '80px' });
  const titleFontSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const descriptionFontSize = useBreakpointValue({ base: 'md', md: 'lg' });

  if (isListening) {
    return (
      <Flex direction="column" align="center" justify="center" flex="1" textAlign="center">
        <Box
          w={buttonSize}
          h={buttonSize}
          bg="red.500"
          borderRadius="50%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          onClick={onToggle}
          shadow="lg"
          animation={`${pulse} 2s infinite`}
        >
          <Icon as={FiMic} boxSize={iconSize} color="white" />
          <Text fontSize={titleFontSize} color="white" fontWeight="bold" mt={2}>
            Recording
          </Text>
        </Box>
        <Text fontSize={descriptionFontSize} color="gray.600" mt={6}>
          Listening for speech...
        </Text>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" justify="center" flex="1" textAlign="center">
      <Box
        w={buttonSize}
        h={buttonSize}
        bg="blue.500"
        borderRadius="50%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        onClick={onToggle}
        shadow="lg"
        transition="all 0.2s"
        _hover={{
          transform: 'scale(1.05)',
          bg: 'blue.600',
        }}
        _active={{
          transform: 'scale(0.95)',
        }}
      >
        <Icon as={FiMic} boxSize={iconSize} color="white" />
        <Text fontSize={titleFontSize} color="white" fontWeight="bold" mt={2}>
          STAR
        </Text>
      </Box>
      <Text fontSize={descriptionFontSize} color="gray.600" mt={6}>
        Click to start real-time translation
      </Text>
    </Flex>
  );
};

export default MicrophoneButton;
