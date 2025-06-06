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
      w="44px"
      h="44px"
      p={0}
      _hover={{ bgColor: '#f0f0f0' }}
      onClick={onClick}
      flexShrink={0}
      minW="40px"
      minH="40px"
      maxW="48px"
      maxH="48px"
    >
      <Image w="60%" h="60%" objectFit="contain" src={src} />
    </Button>
  );
}

export default NavIconButton;
