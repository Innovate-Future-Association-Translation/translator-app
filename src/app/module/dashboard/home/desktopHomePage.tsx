'use client';
import React from 'react';
import { Box, Button, Flex, Text, Image, useMediaQuery } from '@chakra-ui/react';
import { useUserStore } from '@/store/userStore';
import { FeatureCard } from '@/app/module/dashboard/home/FeatureCard';
import { createInstantMeeting } from '@/lib/api';
import { useMeetingStore } from '@/store/meetingStore';
import { useRouter } from 'next/navigation';

const features = [
  { title: 'Start An Instant Meeting', buttonText: 'Get Start', bgColor: '#046ffb' },
  { title: 'Scan Code to Join', buttonText: 'To Join', bgColor: '#dad9fb' },
  { title: 'Realtime Translation', buttonText: 'Get Start', bgColor: '#ead9fb' },
  { title: 'Event Creation', buttonText: 'Go Create', bgColor: '#dafca3' },
];

export default function DesktopHomePage() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [isWideScreen] = useMediaQuery(['(min-width: 1355px)']);
  const setMeeting = useMeetingStore((state) => state.setMeeting);
  let proWidth = 'calc(100% - 32px)';
  if (!isWideScreen) {
    proWidth = '600px';
  }

  const handleCreateMeeting = async () => {
    if (!user) return;
    try {
      const data = await createInstantMeeting(user.id);
      if (data.redirectMeetingRoomUrl) {
        setMeeting({
          roomId: data.roomId,
          meetingURL: data.redirectMeetingRoomUrl,
        });
        router.push(data.redirectMeetingRoomUrl);
      }
    } catch (error) {
      console.error('Failed to create meeting:', error);
      alert('Failed to start meeting.');
    }
  };
  return (
    <Flex px={isWideScreen ? '0' : '20px'} pt={isWideScreen ? '50px' : '20px'}>
      <Box bgGradient="linear(66deg, #ffffff 7%, #f8fbff 99%)">
        <Box mb="40px">
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
        <Box display={isWideScreen ? 'block' : 'none'} mb="40px">
          <Flex wrap="wrap">
            {features.map((feature, index) => (
              //trigger api key according to index(index 0 trigger createMeeting, index 1 trigger scan code , index3 trigger .... )
              <FeatureCard
                key={index}
                {...feature}
                onClickApi={
                  index === 0
                    ? handleCreateMeeting
                    : index === 1
                      ? () => router.push('/scan')
                      : index === 2
                        ? () => router.push('/real-time-translation')
                        : undefined
                }
              />
            ))}
          </Flex>
        </Box>
        <Box display={isWideScreen ? 'none' : 'block'}>
          <Box>
            <Flex justify={'space-between'}>
              {/* trigger create meeting api in middle screen */}
              <FeatureCard {...features[0]} onClickApi={handleCreateMeeting} />
              <FeatureCard {...features[1]} onClickApi={() => router.push('/scan')} />
            </Flex>
          </Box>
          <Box>
            <Flex justify={'space-between'}>
              <FeatureCard
                {...features[2]}
                onClickApi={() => router.push('/real-time-translation')}
              />
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
