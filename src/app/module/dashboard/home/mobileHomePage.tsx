import React from 'react';
import { Box, Text, Button, Flex, Image, useMediaQuery } from '@chakra-ui/react';
import { useUser } from '../../../../context/userContext';
import Footer from '../footer';
export default function MobileHomePage() {
  const { user } = useUser();
  const [isHighScreen] = useMediaQuery(['(min-height: 800px)'], { ssr: false });
  let proHeight = '140px';
  let startHeight = '104px';
  if (isHighScreen) {
    proHeight = '210px';
    startHeight = '150px';
  }
  return (
    <div>
      <Box p="48px 20px" bgColor={'rgba(255, 255, 255, 0.04)'} position={'relative'}>
        <Box fontSize="36px" fontWeight="bold">
          <Flex justify="space-between" align={'center'}>
            <Box>
              <Text>Hey!</Text>
              <Text>{user ? user.name : ''}</Text>
            </Box>
            <Box w="56px" h="56px" borderRadius={'50%'} bgColor={'blue'}></Box>
          </Flex>
        </Box>
        <Box mt={'28px'} mb="20px">
          <Flex
            w="100%"
            bgColor={'#046ffb'}
            h={startHeight}
            borderRadius={'20px'}
            flexDirection={'column'}
          >
            <Text
              fontSize={'16px'}
              color={'white'}
              fontWeight={'bold'}
              p="20px"
              pt={isHighScreen ? '40px' : '20px'}
            >
              Start An Instant Meeting
            </Text>
            <Flex justify={'center'} w={'28px'} borderRadius="50%" bgColor="white" ml="20px">
              <Image src="/arrow1.png" alt="arrow" />
            </Flex>
          </Flex>
          <Flex mt="12px" justify="space-between">
            <Box w="48%" h="212px" bgColor={'#dad9fb'} borderRadius={'20px'} position={'relative'}>
              <Image
                src="/card-bg2.png"
                alt="background"
                position="absolute"
                bottom="0"
                left="0"
                width="100%"
                height="155px"
                objectFit="cover"
                zIndex="1"
              />
              <Box p="20px">
                <Text
                  fontSize={'16px'}
                  color={'#25292c'}
                  fontWeight={'bold'}
                  fontFamily={'Helvetica'}
                  lineHeight={'20px'}
                  w="90px"
                >
                  Start Code to Join
                </Text>
              </Box>
              <Flex
                justify={'center'}
                align={'center'}
                w={'28px'}
                h="28px"
                borderRadius="50%"
                bgColor="#046ffb"
                ml="20px"
                mt="84px"
              >
                <Image src="/arrow2.png" alt="arrow" w="10px" h="10px" />
              </Flex>
            </Box>
            <Flex w="48%" h="212px" flexDirection={'column'} justify="space-between">
              <Box
                h="48%"
                bgImage={"url('/mobile-bg1.png')"}
                bgSize="100% 100%"
                bgRepeat={'no-repeat'}
                p="20px"
                position={'relative'}
              >
                <Text fontSize={'16px'} color={'#25292c'} fontWeight={'bold'}>
                  Realtime
                </Text>
                <Text fontSize={'16px'} color={'#25292c'} fontWeight={'bold'}>
                  Translation
                </Text>
                <Flex
                  justify={'center'}
                  align={'center'}
                  w={'28px'}
                  h="28px"
                  borderRadius="50%"
                  bgColor="#25292c"
                  position={'absolute'}
                  right="0"
                  bottom="0"
                >
                  <Image src="/arrow2.png" alt="arrow" w="10px" h="10px" />
                </Flex>
              </Box>
              <Box
                h="48%"
                bgImage={"url('/mobile-bg2.png')"}
                bgSize="100% 100%"
                bgRepeat={'no-repeat'}
                p="20px"
                position={'relative'}
              >
                <Text fontSize={'16px'} color={'#25292c'} fontWeight={'bold'}>
                  Event
                </Text>
                <Text fontSize={'16px'} color={'#25292c'} fontWeight={'bold'}>
                  Creation
                </Text>
                <Flex
                  justify={'center'}
                  align={'center'}
                  w={'28px'}
                  h="28px"
                  borderRadius="50%"
                  bgColor="#25292c"
                  position={'absolute'}
                  right="0"
                  bottom="0"
                >
                  <Image src="/arrow2.png" alt="arrow" w="10px" h="10px" />
                </Flex>
              </Box>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            bgColor={'#f5f5f5'}
            borderRadius={'20px'}
            h={proHeight}
            mt="12px"
            p="20px"
            align={isHighScreen ? 'center' : ''}
          >
            <Box>
              <Image src="/proFeature-icon.png" alt="Pro Feature Icon" boxSize="40px" />
            </Box>
            <Box ml="12px">
              <Text fontSize={'16px'} color={'#25292c'} fontWeight={'bold'}>
                Get Unlimited Access to Every Features
              </Text>
              <Button
                w="93px"
                h="36px"
                borderRadius={'18px'}
                color={'white'}
                bgColor={'#046ffb'}
                mt="24px"
              >
                Go Pro
              </Button>
            </Box>
          </Flex>
        </Box>
        <Footer></Footer>
      </Box>
    </div>
  );
}
