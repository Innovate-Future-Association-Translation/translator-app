'use client';
import React from 'react';
import { Box, Button, Flex, Text, Image, useMediaQuery } from '@chakra-ui/react';
import { useUser } from '@/context/userContext';
import { FeatureCard } from '@/app/module/dashboard/home/FeatureCard';
export default function DesktopHomePage() {
  const { user } = useUser();
  const [isWideScreen] = useMediaQuery(['(min-width: 1355px)']);
  let proWidth = 'calc(100% - 32px)';
  if (!isWideScreen) {
    proWidth = '600px';
  }
  const features = [
    { title: 'Start An Instant Meeting', buttonText: 'Get Start', bgColor: '#046ffb', to: '/#' },
    { title: 'Scan Code to Join', buttonText: 'To Join', bgColor: '#dad9fb', to: '#' },
    { title: 'Realtime Translation', buttonText: 'Get Start', bgColor: '#ead9fb', to: '#' },
    { title: 'Event Creation', buttonText: 'Go Create', bgColor: '#dafca3', to: '#' },
  ];
  return (
    <Flex px={isWideScreen ? '0' : '20px'} pt={isWideScreen ? '50px' : '20px'}>
      <Box bgGradient="linear(66deg, #ffffff 7%, #f8fbff 99%)">
        <Box mb="30px">
          <Text fontSize={isWideScreen ? '36px' : '28px'} color="#25292c" fontWeight="bold" mb={2}>
            Hey! {user ? user.name : 'Guest'}
          </Text>
          <Flex alignItems="center" gap={2}>
            <Text fontSize={isWideScreen ? '36px' : '28px'} color="#25292c" fontWeight="bold">
              Welcome to
            </Text>
            <Text fontSize="36px" color="#046ffb" fontWeight="bold">
              IFA Translator
            </Text>
          </Flex>
        </Box>
        <Box display={isWideScreen ? 'block' : 'none'}>
          <Flex wrap="wrap">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </Flex>
        </Box>
        <Box display={isWideScreen ? 'none' : 'block'}>
          <Box>
            <Flex justify={'space-between'}>
              <FeatureCard {...features[0]} />
              <FeatureCard {...features[1]} />
            </Flex>
          </Box>
          <Box>
            <Flex justify={'space-between'}>
              <FeatureCard {...features[2]} />
              <FeatureCard {...features[3]} />
            </Flex>
          </Box>
        </Box>
        <Box h="200px" borderRadius="20px" boxShadow="md" w={proWidth} bgColor={'white'}>
          <Flex p="40px">
            <Flex w="100%">
              <Image src="/proFeature-icon.png" alt="Pro Feature Icon" boxSize="80px" />
              <Box ml="48px">
                <Text fontSize={isWideScreen ? '26px' : '18px'} fontWeight="bold">
                  Get Unlimited Access to Every Features
                </Text>
                <Button
                  mt="32px"
                  w="118px"
                  h="48px"
                  borderRadius="24px"
                  bg="#046ffb"
                  color="white"
                  fontSize="16px"
                  fontWeight="bold"
                  onClick={() => {
                    // TODO: Set correct Pro feature link
                  }}
                >
                  Go Pro
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
