import React from 'react';
import { Box, Text, Stack, Flex, Image } from '@chakra-ui/react';

interface FeatureProps {
  title: string;
  text: string;
  icon: string;
  bgColor: string;
}

const Feature = ({ title, text, bgColor, icon }: FeatureProps) => {
  return (
    <Stack
      bg={bgColor}
      borderRadius="20px"
      w={{ base: '85vw', md: '28vw' }}
      h={{ base: '45vw', md: '17vw' }}
      padding={{ base: '24px', md: '40px' }}
      justify="space-between"
    >
      <Text
        fontWeight={600}
        color="black"
        fontSize={{ base: '18px', md: '22px' }}
        mb={{ base: '14px', md: '20px' }}
        fontFamily="Helvetica"
      >
        {title}
      </Text>
      <Text
        color="gray.600"
        fontSize={{ base: '16px', md: '14px' }}
        mb={{ base: '15px', md: '30px' }}
        fontFamily="Helvetica"
      >
        {text}
      </Text>
      <Box
        borderRadius="50%"
        bgColor="black"
        w={{ base: '3vh', md: '3vh' }}
        h={{ base: '3vh', md: '3vh' }}
        minW="32px"
        minH="32px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexShrink={0}
      >
        <Image
          src={icon}
          w={{ base: '1.5vh', md: '1.5vh' }}
          h={{ base: '1.5vh', md: '1.5vh' }}
          minW="16px"
          minH="16px"
        />
      </Box>
    </Stack>
  );
};

export default function SimpleThreeRow() {
  return (
    <Flex
      flexDirection={{ base: 'column', md: 'row' }}
      gap={{ base: '2vh', md: '5vw' }}
      alignItems="center"
    >
      <Feature
        title="Support 50+ Languages"
        text="Effortless multilingual communication across various scenarios and audiences."
        bgColor="#f7f8fa"
        icon="/arrow.svg"
      />
      <Feature
        title="AI Smart Translation"
        text="High-accuracy, instant language conversion."
        bgColor="#f7f8fa"
        icon="/arrow.svg"
      />
      <Feature
        title="Multiple Translation Modes"
        text="Supports voice, text, image, and screen translation."
        bgColor="#f7f8fa"
        icon="/arrow.svg"
      />
    </Flex>
  );
}
