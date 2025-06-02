'use client';

import React from 'react';
import { Image, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

interface QuitMeetingButtonProps {
  imageSrc: string;
  label?: string;
}

const QuitMeetingButton = ({ imageSrc, label = 'Quit Meeting' }: QuitMeetingButtonProps) => {
  const router = useRouter();

  const handleQuitMeeting = () => {
    router.push('/dashboard/');
  };

  return (
    <Button
      borderRadius="50%"
      border="solid 1px #dc2626"
      bgColor="#dc2626"
      w={{ base: '44px', md: 'max(40px, min(2.8vw, 48px))' }}
      h={{ base: '44px', md: 'max(40px, min(2.8vw, 48px))' }}
      p={0}
      _hover={{ bgColor: '#b91c1c' }}
      onClick={handleQuitMeeting}
      title={label}
      flexShrink={0}
      minW="40px"
      minH="40px"
      maxW="48px"
      maxH="48px"
    >
      <Image
        w="60%"
        h="60%"
        objectFit="contain"
        src={imageSrc}
        alt={label}
        filter="brightness(0) invert(1)"
      />
    </Button>
  );
};

export default QuitMeetingButton;
