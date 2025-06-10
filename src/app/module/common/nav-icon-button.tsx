import React from 'react';
import { Button, Image } from '@chakra-ui/react';

interface NavIconButtonProps {
  src: string;
  bg: string;
  onClick?: () => void;
  filter?: string;
}

function NavIconButton({ src, bg, onClick, filter }: NavIconButtonProps) {
  return (
    <Button
      borderRadius="50%"
      border="solid 1px #ebebeb"
      bgColor={bg}
      w={{ base: '38px', sm: '42px', md: '44px' }}
      h={{ base: '38px', sm: '42px', md: '44px' }}
      p={0}
      _hover={{ bgColor: '#f0f0f0' }}
      onClick={onClick}
      flexShrink={0}
      minW="38px"
      minH="38px"
      maxW="38px"
      maxH="38px"
    >
      <Image w="60%" h="60%" objectFit="contain" src={src} filter={filter} />
    </Button>
  );
}

export default NavIconButton;
