'use client';

import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { FiArrowLeft, FiMenu } from 'react-icons/fi';

interface ProfileHeaderProps {
  title?: string;
  onBackClick?: () => void;
  onMenuClick?: () => void;
  showBackButton?: boolean;
  showMenuButton?: boolean;
}

export default function ProfileHeader({
  title = 'Personal information',
  onBackClick,
  onMenuClick,
  showBackButton = true,
  showMenuButton = true,
}: ProfileHeaderProps) {
  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    }
  };

  const handleMenuClick = () => {
    if (onMenuClick) {
      onMenuClick();
    }
  };

  return (
    <Box bg="white" borderBottom="1px solid" borderColor="gray.100">
      <Flex align="center" justify="space-between" p={4}>
        {showBackButton ? (
          <IconButton aria-label="Go back" variant="ghost" size="sm" onClick={handleBackClick}>
            <FiArrowLeft />
          </IconButton>
        ) : (
          <Box w="40px" />
        )}
        <Text fontWeight="medium" fontSize="md" textAlign="center" flex="1">
          {title}
        </Text>
        {showMenuButton ? (
          <IconButton aria-label="Menu" variant="ghost" size="sm" onClick={handleMenuClick}>
            <FiMenu />
          </IconButton>
        ) : (
          <Box w="40px" />
        )}
      </Flex>
    </Box>
  );
}
