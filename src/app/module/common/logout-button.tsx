'use client';

import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useErrorStore } from '@/store/errorStore';
import { useMeetingStore } from '@/store/meetingStore';
import { useUserStore } from '@/store/userStore';
import { useRedirectStore } from '@/store/redirectStore';

interface LogoutButtonProps {
  label?: string;
  imageSrc: string;
  size?: 'sm' | 'default';
  showLabel?: boolean;
}

const LogoutButton = ({
  label,
  imageSrc,
  size = 'default',
  showLabel = true,
}: LogoutButtonProps) => {
  const router = useRouter();
  const { setErrorMessage } = useErrorStore();
  const { setMeeting } = useMeetingStore();
  const { setUser } = useUserStore();
  const { clearRedirectPath } = useRedirectStore();

  const handleLogout = () => {
    setErrorMessage(null);
    setMeeting(undefined);
    setUser(null);
    clearRedirectPath();
    localStorage.removeItem('authToken');
    router.push('/');
  };

  const isSmall = size === 'sm';

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h={isSmall ? '40px' : '80px'}
      w={isSmall ? '40px' : '80px'}
      cursor="pointer"
      color="#25292c"
      _hover={
        !isSmall
          ? {
              bg: 'rgba(255, 255, 255, 0.4)',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
            }
          : {}
      }
      onClick={handleLogout}
      borderRadius={isSmall ? '0' : '12%'}
      transition="all 0.2s"
      title={label}
    >
      <Image
        src={imageSrc}
        alt={label || 'Logout'}
        boxSize="24px"
        mb={showLabel && !isSmall ? '8px' : '0px'}
      />
      {showLabel && !isSmall && label && (
        <Text fontSize="16px" fontWeight="normal">
          {label}
        </Text>
      )}
    </Flex>
  );
};

export default LogoutButton;
