'use client';
import React from 'react';
import { Box, Button, Text, Image, useMediaQuery } from '@chakra-ui/react';
interface FeatureCardProps {
  title: string;
  buttonText: string;
  bgColor: string;
  onClickApi?: () => void | Promise<void>;
}
export const FeatureCard = ({ title, buttonText, bgColor, onClickApi }: FeatureCardProps) => {
  const isFirstCard = bgColor === '#046ffb';
  const isSecondCard = bgColor === '#dad9fb';
  const isThirdOrFourthCard = bgColor === '#ead9fb' || bgColor === '#dafca3';
  const [isWideScreen] = useMediaQuery(['(min-width: 1355px)']);
  return (
    <Box
      w="283px"
      h={isWideScreen ? '260px' : '200px'}
      mr={'32px'}
      mb="32px"
      pl="40px"
      pt="17.3px"
      borderRadius="20px"
      bg={bgColor}
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >
      {isFirstCard && (
        <Image
          src="/card-bg1.png"
          alt="background"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          fit="cover"
          zIndex="1"
        />
      )}
      {isSecondCard && (
        <Image
          src="/card-bg2.png"
          alt="background"
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          fit="cover"
          zIndex="1"
        />
      )}
      <Text
        w="203px"
        mt="22.7px"
        fontFamily="Helvetica"
        fontSize={isWideScreen ? '26px' : '18px'}
        fontWeight="bold"
        lineHeight="1.23"
        color={isFirstCard ? 'white' : '#25292c'}
        position="relative"
        zIndex="2"
      >
        {title}
      </Text>
      <Button
        onClick={onClickApi}
        position="absolute"
        bottom="40px"
        w="140px"
        h="48px"
        px="24px"
        py="15px"
        borderRadius="24px"
        bg={isSecondCard ? '#046ffb' : isThirdOrFourthCard ? '#25292c' : 'white'}
        color={isSecondCard || isThirdOrFourthCard ? 'white' : '#046ffb'}
        _hover={{
          bg: isSecondCard ? '#0461db' : isThirdOrFourthCard ? '#1a1e21' : 'gray.100',
        }}
        display="flex"
        alignItems="center"
        zIndex="2"
      >
        <Text
          mr="8px"
          fontFamily="Helvetica"
          fontSize="16px"
          fontWeight="bold"
          color={isSecondCard || isThirdOrFourthCard ? 'white' : '#046ffb'}
        >
          {buttonText}
        </Text>
        <Image
          src="/arrow1.png"
          alt="arrow"
          width="16px"
          height="16px"
          filter={isSecondCard || isThirdOrFourthCard ? 'brightness(0) invert(1)' : 'none'}
        />
      </Button>
    </Box>
  );
};
