'use client';

import React, { useState } from 'react';
import { Box, Flex, Text, Button, Spinner } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useRouter } from 'next/navigation';
import { useMeetingStore } from '@/store/meetingStore';
import Sidebar from '../../module/dashboard/sidebar';
import { FiHome, FiUser, FiCameraOff, FiCamera, FiCheck } from 'react-icons/fi';

const scanAnimation = keyframes`
  0% { transform: translateY(-100%) }
  50% { transform: translateY(100%) }
  100% { transform: translateY(-100%) }
`;

interface ScanResult {
  rawValue: string;
}

const ScanPage = () => {
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const setMeeting = useMeetingStore((state) => state.setMeeting);
  const router = useRouter();

  const handleScanResult = async (detectedCodes: ScanResult[]) => {
    if (detectedCodes.length === 0) return;

    try {
      setScanSuccess(true);
      setIsLoading(true);
      setErrorMessage(null);

      const result = detectedCodes[0].rawValue;

      const url = new URL(result);
      const pathname = url.pathname;

      const roomIdMatch = pathname.match(/\/instant-meeting-room\/([^\/]+)/);
      if (!roomIdMatch) {
        throw new Error(
          'Invalid meeting link format, expected format: /instant-meeting-room/[roomId]'
        );
      }

      const roomId = roomIdMatch[1];

      setMeeting({
        roomId,
        meetingURL: result,
      });

      setTimeout(() => {
        router.push(`/instant-meeting-room/${roomId}`);
      }, 2000);
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : 'Scan failed, please ensure the QR code is a valid meeting link';
      setErrorMessage(`Scan failed: ${errorMsg}`);
      setScanSuccess(false);
      setIsLoading(false);
    }
  };

  const handleScanError = () => {
    setCameraError('Unable to access camera, please check permission settings');
  };

  const handleRetryScanning = () => {
    setCameraError(null);
    setScanSuccess(false);
    setIsLoading(false);
    setErrorMessage(null);
  };

  return (
    <Box minH="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <Flex display={{ base: 'none', md: 'flex' }} h="100vh">
        <Sidebar />
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgImage="url('/dashboard-bg.png')"
          bgSize="102% 102%"
          backgroundPosition="center"
          bgRepeat="no-repeat"
          position="relative"
        >
          <Box
            bg="rgba(255, 255, 255, 0.95)"
            borderRadius="20px"
            p="40px"
            maxW="500px"
            w="90%"
            boxShadow="0 20px 40px rgba(0, 0, 0, 0.1)"
            textAlign="center"
          >
            <Text fontSize="2xl" fontWeight="bold" mb="30px" color="gray.800">
              Scan Meeting QR Code
            </Text>

            {errorMessage && (
              <Box
                bg="red.100"
                border="1px solid"
                borderColor="red.300"
                color="red.800"
                p="15px"
                borderRadius="md"
                mb="20px"
                textAlign="center"
              >
                {errorMessage}
              </Box>
            )}

            {isLoading ? (
              <Box py="60px">
                {scanSuccess ? (
                  <>
                    <Box
                      w="60px"
                      h="60px"
                      bg="green.500"
                      borderRadius="50%"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mx="auto"
                      mb="20px"
                    >
                      <FiCheck size={30} color="white" />
                    </Box>
                    <Text color="green.500" fontSize="lg" fontWeight="bold">
                      Scan successful! Joining meeting...
                    </Text>
                  </>
                ) : (
                  <>
                    <Spinner size="xl" color="blue.500" mb="20px" />
                    <Text>Joining meeting...</Text>
                  </>
                )}
              </Box>
            ) : cameraError ? (
              <Box py="40px">
                <FiCameraOff size={48} style={{ margin: '0 auto 20px' }} />
                <Text color="red.500" mb="20px">
                  {cameraError}
                </Text>
                <Button colorScheme="blue" onClick={handleRetryScanning} mr="10px">
                  Retry
                </Button>
              </Box>
            ) : (
              <Box>
                <Box
                  borderRadius="15px"
                  overflow="hidden"
                  mb="20px"
                  border="3px solid #667eea"
                  position="relative"
                >
                  <Scanner
                    onScan={handleScanResult}
                    onError={handleScanError}
                    constraints={{
                      facingMode: 'environment',
                    }}
                    scanDelay={300}
                  />
                  <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    h="2px"
                    bg="linear-gradient(90deg, transparent, #667eea, transparent)"
                    animation={`${scanAnimation} 2s ease-in-out infinite`}
                  />
                </Box>
                <Text color="gray.600" mb="20px">
                  Please align the QR code in the center of the scan frame
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} minH="100vh" position="relative">
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          px="20px"
          py="40px"
          minH="calc(100vh - 80px)"
        >
          {errorMessage && (
            <Box
              bg="red.100"
              border="1px solid"
              borderColor="red.300"
              color="red.800"
              p="15px"
              borderRadius="md"
              mb="20px"
              textAlign="center"
            >
              {errorMessage}
            </Box>
          )}

          {isLoading ? (
            <Box textAlign="center" color="white">
              {scanSuccess ? (
                <>
                  <Box
                    w="80px"
                    h="80px"
                    bg="green.500"
                    borderRadius="50%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mx="auto"
                    mb="20px"
                  >
                    <FiCheck size={40} color="white" />
                  </Box>
                  <Text fontSize="18px" fontWeight="bold">
                    Scan successful!
                  </Text>
                  <Text fontSize="16px">Joining meeting...</Text>
                </>
              ) : (
                <>
                  <Spinner size="xl" color="white" mb="20px" />
                  <Text fontSize="18px">Joining meeting...</Text>
                </>
              )}
            </Box>
          ) : cameraError ? (
            <Box textAlign="center" color="white">
              <FiCameraOff size={60} style={{ margin: '0 auto 20px' }} />
              <Text fontSize="18px" mb="30px">
                {cameraError}
              </Text>
              <Button
                colorScheme="whiteAlpha"
                variant="solid"
                onClick={handleRetryScanning}
                mb="10px"
                mr="10px"
              >
                Retry
              </Button>
            </Box>
          ) : (
            <Box w="100%" maxW="300px">
              <Box position="relative" w="100%" aspectRatio="1" mb="30px">
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  borderRadius="20px"
                  overflow="hidden"
                  border="3px solid rgba(255, 255, 255, 0.8)"
                >
                  <Scanner
                    onScan={handleScanResult}
                    onError={handleScanError}
                    constraints={{
                      facingMode: 'environment',
                    }}
                    scanDelay={300}
                  />
                </Box>

                <Box
                  position="absolute"
                  top="-3px"
                  left="-3px"
                  w="30px"
                  h="30px"
                  borderTop="3px solid white"
                  borderLeft="3px solid white"
                  borderTopLeftRadius="20px"
                />
                <Box
                  position="absolute"
                  top="-3px"
                  right="-3px"
                  w="30px"
                  h="30px"
                  borderTop="3px solid white"
                  borderRight="3px solid white"
                  borderTopRightRadius="20px"
                />
                <Box
                  position="absolute"
                  bottom="-3px"
                  left="-3px"
                  w="30px"
                  h="30px"
                  borderBottom="3px solid white"
                  borderLeft="3px solid white"
                  borderBottomLeftRadius="20px"
                />
                <Box
                  position="absolute"
                  bottom="-3px"
                  right="-3px"
                  w="30px"
                  h="30px"
                  borderBottom="3px solid white"
                  borderRight="3px solid white"
                  borderBottomRightRadius="20px"
                />

                <Box
                  position="absolute"
                  top="0"
                  left="10%"
                  right="10%"
                  h="2px"
                  bg="linear-gradient(90deg, transparent, white, transparent)"
                  animation={`${scanAnimation} 2s ease-in-out infinite`}
                />
              </Box>

              <Text color="white" textAlign="center" fontSize="16px" mb="20px" px="20px">
                Please align the QR code in the center of the scan frame
              </Text>
            </Box>
          )}
        </Box>

        <Box
          bg="rgba(255, 255, 255, 0.95)"
          px="20px"
          py="15px"
          backdropFilter="blur(10px)"
          position="fixed"
          bottom="20px"
          left="50%"
          transform="translateX(-50%)"
          borderRadius="50px"
          boxShadow="0 5px 15px rgba(0, 0, 0, 0.1)"
          w="calc(100% - 40px)"
          maxW="400px"
        >
          <Flex justifyContent="space-around" alignItems="center">
            <Button
              variant="ghost"
              colorScheme="gray"
              onClick={() => router.push('/dashboard')}
              p="15px"
            >
              <FiHome size={24} />
            </Button>

            <Button
              bg="black"
              color="white"
              borderRadius="50%"
              w="60px"
              h="60px"
              p="0"
              _hover={{ bg: 'gray.800' }}
              onClick={handleRetryScanning}
            >
              <FiCamera size={28} />
            </Button>

            <Button
              variant="ghost"
              colorScheme="gray"
              onClick={() => router.push('/profile')}
              p="15px"
            >
              <FiUser size={24} />
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ScanPage;
