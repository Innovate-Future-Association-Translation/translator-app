import React from 'react';
import { Button, Image } from '@chakra-ui/react';

interface NavIconButtonProps {
  src: string;
  bg: string;
  onClick?: () => void;
}

function NavIconButton({ src, bg, onClick }: NavIconButtonProps) {
  return (
    <Button
      borderRadius="50%"
      border="solid 1px #ebebeb"
      bgColor={bg}
      w={{ base: '44px', md: '3vw' }}
      h={{ base: '44px', md: '3vw' }}
      p={0}
      _hover={{ bgColor: '#f0f0f0' }}
      onClick={onClick}
    >
      <Image w="60%" h="60%" objectFit="contain" src={src} />
    </Button>
  );
}

export default NavIconButton;
