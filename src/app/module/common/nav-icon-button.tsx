import React from 'react';
import { Button, Image } from '@chakra-ui/react';

interface NavIconButtonProps {
  src: string;
  bg: string;
  alt: string;
  onClick?: () => void;
  hoverBgColor?: string;
  isIconWhite?: boolean;
}

function NavIconButton({ src, bg, alt, onClick, hoverBgColor, isIconWhite }: NavIconButtonProps) {
  return (
    <Button
      borderRadius="50%"
      border="solid 1px #ebebeb"
      bgColor={bg}
      w={{ base: '44px', md: 'max(40px, min(2.8vw, 48px))' }}
      h={{ base: '44px', md: 'max(40px, min(2.8vw, 48px))' }}
      p={0}
      _hover={{ bgColor: hoverBgColor || '#f0f0f0' }}
      onClick={onClick}
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
        src={src}
        alt={alt}
        filter={isIconWhite ? 'brightness(0) invert(1)' : 'none'}
      />
    </Button>
  );
}

export default NavIconButton;
