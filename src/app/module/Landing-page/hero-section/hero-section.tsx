import React from 'react';
import AvatarWithSpeechBubble from './speech-bubble/speech-bubble';

import { Box, Flex, Text } from '@chakra-ui/react';

function HeroSection() {
  return (
    <Box maxW="100vw" height="auto" bg="white" position="relative">
      <Flex background="white" px={{ base: 0, lg: 8 }}>
        <Flex
          flexDirection="column"
          w={{ base: '100%', lg: '70%' }}
          align={{ base: 'center', lg: 'flex-start' }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <Text
            as="h1"
            fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }}
            color="black"
            fontWeight="black"
          >
            AI-POWERED GLOBAL COMMUNICATION
          </Text>
          <Text fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }} fontWeight="black" color="#066FFB">
            BREAKING
          </Text>
          <Text
            fontSize={{ base: '2xl', md: '3xl', lg: '6xl' }}
            mt={1}
            fontWeight="black"
            color="black"
          >
            LANGUAGE BARRIERS
          </Text>
          <Text fontSize={{ base: 'smaller', lg: 'xl' }} mt={6} mr={10} color="gray.600">
            IFA Translator provides real-time translation, document
            <br /> translation, and conference translation, enabling <br />
            seamless global communication!
          </Text>
        </Flex>

        <Flex mt={12} justify="center" wrap="wrap" gap={6} position="fix" w="30%" hideBelow="xl">
          <AvatarWithSpeechBubble
            imageSrc="/image/english_professional.jpg"
            text="Hello"
            left="5vw"
            bg_color="#7455F2"
            img_height="20vh"
            top="-5vh"
            img_width="20vh"
            bubble_right="-40px"
            bubble_top="-40px"
          />
          <AvatarWithSpeechBubble
            imageSrc="/image/france_professional.jpg"
            text="Bonjour"
            left="-23vw"
            bg_color="#F7D153"
            img_height="24vh"
            top="10vh"
            img_width="20vh"
            bubble_right="-40px"
            bubble_top="-40px"
          />
          <AvatarWithSpeechBubble
            imageSrc="/image/arab_professional.jpg"
            text="مرحبًا"
            left="3vw"
            bg_color="#066FFB"
            img_height="36vh"
            bottom="4vh"
            img_width="36vh"
            bubble_right="-40px"
            bubble_top="-40px"
          />
          <AvatarWithSpeechBubble
            imageSrc="/image/chinese_professional.jpg"
            text="你好"
            left="-26vw"
            bg_color="#3ED1B5"
            img_height="24vh"
            top="-25vh"
            img_width="20vh"
            bubble_right="-40px"
            bubble_top="-40px"
          />
          <AvatarWithSpeechBubble
            imageSrc="/image/japan_pro.jpg"
            text="こんにちは"
            left="-23vw"
            bg_color="#F58659"
            img_height="20vh"
            bottom="20vh"
            img_width="20vh"
            bubble_right="-40px"
            bubble_top="-40px"
          />
        </Flex>
      </Flex>
    </Box>
  );
}

export default HeroSection;
