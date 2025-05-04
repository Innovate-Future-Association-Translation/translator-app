import { Flex, Heading, Container, Text } from '@chakra-ui/react';
import React from 'react';

interface TextBoxInput {
  bg: string;
  headerText: string;
  text: string;
  textColor?: string;
  box_w: string | object;
  box_h: string | object;
  fontSize?: string | object;
  fontWeight?: string;
  costomPadding?: string;
  headerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | 'xs' | '3xl' | '5xl' | '6xl' | '7xl';
  heaerColor?: string;
}

export default function Textbox({
  bg,
  headerText,
  text,
  textColor,
  box_h,
  box_w,
  fontSize,
  fontWeight,
  costomPadding,
  headerSize,
  heaerColor,
}: TextBoxInput) {
  return (
    <Container
      bg={bg}
      p={{ lg: costomPadding || 10, md: costomPadding || 2 }}
      borderRadius="4xl"
      justifyItems="center"
      w={box_w}
      h={box_h}
    >
      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Heading
          as="h1"
          size={{ lg: headerSize || '2xl', md: 'xl' }}
          mb={2}
          color={heaerColor || 'black'}
          fontWeight={fontWeight || 'bold'}
        >
          {headerText}
        </Heading>
        <Text
          color={textColor || 'black'}
          fontSize={{ lg: fontSize || 'initial', md: 'small', base: 'smaller' }}
          fontWeight={fontWeight || 'medium'}
        >
          {text}
        </Text>
      </Flex>
    </Container>
  );
}
