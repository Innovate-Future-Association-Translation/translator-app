import React from 'react';
import { Box, VStack, Image } from '@chakra-ui/react';

interface AvatarWithSpeechBubbleProps {
  imageSrc: string;
  top?: string;
  text: string;
  left?: string;
  right?: string;
  bg_color: string;
  img_width: string;
  img_height: string;
  bubble_top: string;
  bubble_right: string;
  bottom?: string;
}

const AvatarWithSpeechBubble = ({
  imageSrc,
  img_width,
  img_height,
  text,
  top,
  left,
  bottom,
  bg_color,
  bubble_right,
  bubble_top,
}: AvatarWithSpeechBubbleProps) => {
  return (
    <VStack position="relative" left={left} bottom={bottom} top={top}>
      <Image
        width={img_width}
        height={img_height}
        borderRadius="3xl"
        src={imageSrc}
        alt="hero-section-user-image"
      />
      <Box
        position="absolute"
        top={bubble_top}
        right={bubble_right}
        bg={bg_color}
        color="white"
        px={3}
        py={1}
        fontSize="normal"
        fontWeight="bold"
        display="3xl"
        borderRadius="sm"
        boxShadow="md"
        _before={{
          content: "''",
          position: 'absolute',
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderTop: `10px solid ${bg_color}`,
        }}
      >
        {text}
      </Box>
    </VStack>
  );
};

export default AvatarWithSpeechBubble;
