'use client';

import { Box, Button } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';

export interface SaveMessageData {
  show: boolean;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface SaveMessageProps {
  message: SaveMessageData;
  className?: string;
}

interface SaveButtonProps {
  width: string;
  onSave: () => void;
  loading?: boolean;
  hasChanges?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

interface UseSaveMessageReturn {
  message: SaveMessageData;
  showMessage: (type: SaveMessageData['type'], text: string) => void;
  showSuccess: (text: string) => void;
  showError: (text: string) => void;
  showInfo: (text: string) => void;
  hideMessage: () => void;
}

export const useSaveMessage = (autoHideDelay: number = 3000): UseSaveMessageReturn => {
  const [message, setMessage] = useState<SaveMessageData>({
    show: false,
    type: 'success',
    text: '',
  });

  useEffect(() => {
    if (message.show && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        setMessage((prev) => ({ ...prev, show: false }));
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [message.show, autoHideDelay]);

  const showMessage = useCallback((type: SaveMessageData['type'], text: string) => {
    setMessage({
      show: true,
      type,
      text,
    });
  }, []);

  const showSuccess = useCallback(
    (text: string) => {
      showMessage('success', text);
    },
    [showMessage]
  );

  const showError = useCallback(
    (text: string) => {
      showMessage('error', text);
    },
    [showMessage]
  );

  const showInfo = useCallback(
    (text: string) => {
      showMessage('info', text);
    },
    [showMessage]
  );

  const hideMessage = useCallback(() => {
    setMessage((prev) => ({ ...prev, show: false }));
  }, []);

  return {
    message,
    showMessage,
    showSuccess,
    showError,
    showInfo,
    hideMessage,
  };
};

export function SaveMessage({ message, className }: SaveMessageProps) {
  if (!message.show) return null;

  const getMessageColor = (type: SaveMessageData['type']) => {
    switch (type) {
      case 'success':
        return 'green.500';
      case 'error':
        return 'red.500';
      case 'info':
        return 'blue.500';
      default:
        return 'blue.500';
    }
  };

  return (
    <Box
      position="absolute"
      top="10px"
      left="50%"
      transform="translateX(-50%)"
      color={getMessageColor(message.type)}
      fontSize="sm"
      fontWeight="semibold"
      zIndex={1001}
      transition="opacity 0.3s"
      bg="white"
      px={4}
      py={1}
      borderRadius="md"
      boxShadow="sm"
      className={className}
    >
      {message.text}
    </Box>
  );
}

export function SaveButton({
  width,
  onSave,
  loading = false,
  hasChanges = false,
  disabled = false,
}: SaveButtonProps) {
  const isDisabled = disabled || loading;
  const buttonText = loading ? 'Saving...' : hasChanges ? 'Save' : 'Save';
  const buttonBg = hasChanges ? '#25292c' : 'gray.500';
  const hoverBg = hasChanges ? 'gray.800' : 'gray.600';

  return (
    <Box w={width} h="48px" mt="34px" mb="16px" transition="width 0.3s ease">
      <Button
        w="full"
        h="full"
        bg={isDisabled ? 'gray.400' : buttonBg}
        color="white"
        borderRadius="24px"
        _hover={{
          bg: isDisabled ? 'gray.400' : hoverBg,
        }}
        onClick={onSave}
        disabled={isDisabled}
        cursor={isDisabled ? 'not-allowed' : 'pointer'}
        opacity={isDisabled ? 0.6 : 1}
        transition="all 0.2s"
      >
        {buttonText}
      </Button>
    </Box>
  );
}

export default SaveMessage;
