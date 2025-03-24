/**
 * src/app/signup/page.tsx
 * User Registration Page
 * 
 * This page provides user registration functionality, including:
 * - Quick registration with Google account
 * - Email and password registration
 * - Email verification functionality
 */

'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
// Import Google icon
import { FcGoogle } from 'react-icons/fc';
// Import password show/hide icons
import { FiEye, FiEyeOff } from 'react-icons/fi';

/**
 * Registration Page Component
 * Provides a user interface with multiple registration methods
 * @returns JSX Element - Renders the registration page
 */
export default function SignUpPage() {
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  
  // Password visibility toggle
  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };
  
  // Send verification code handler
  const handleSendCode = () => {
    console.log('Sending verification code');
    // In actual implementation, should call API to send verification code
  };

  return (
    <Box w="100%" p={0} maxW="100%" bg="white">
      {/* Top navigation bar */}
      <Flex p={4} justify="space-between" align="center">
        <Flex align="center">
          <Center bg="blue.500" borderRadius="full" p={2} mr={2} boxSize="40px">
            <Text fontSize="xl" color="white" fontWeight="bold">f</Text>
          </Center>
          <Text fontSize="xl" fontWeight="bold" color="blue.500">IFA TRANSLATOR</Text>
        </Flex>
        <Box as="button">
          <Text fontSize="2xl">☰</Text>
        </Box>
      </Flex>

      {/* Main content */}
      <Box maxW="md" py={8} mx="auto" bg="white">
        <Stack align="center" gap={8}>
          {/* Title */}
          <Stack textAlign="center" gap={2}>
            <Heading size="4xl" color="black">Sign Up</Heading>
            <Text color="gray.500">Welcome to IFA Translator!</Text>
          </Stack>

          {/* Google login button */}
          <Button
            w="full"
            variant="outline"
            borderRadius="full"
            size="lg"
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
          >
            <Box as="span" w="20px" h="20px" display="flex" alignItems="center" justifyContent="center">
              <FcGoogle size={20} />
            </Box>
            <Text>Sign up with Google</Text>
          </Button>

          {/* Divider */}
          <Flex w="full" align="center" gap={3}>
            <Box flex={1} h="1px" bg="gray.200" />
            <Text color="gray.500">OR</Text>
            <Box flex={1} h="1px" bg="gray.200" />
          </Flex>

          {/* Registration form */}
          <Stack w="full" gap={4}>
            {/* Email */}
            <Box>
              <Text mb={2} color="gray.800">Email</Text>
              <Input 
                placeholder="Email Adress" 
                size="lg" 
                borderRadius="full"
                pl={6}
                color="gray.800"
                _placeholder={{ color: "gray.400" }}
              />
            </Box>

            {/* Password */}
            <Box>
              <Text mb={2} color="gray.800">Password</Text>
              <Flex position="relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  size="lg"
                  borderRadius="full"
                  w="full"
                  pl={6}
                  color="gray.800"
                  _placeholder={{ color: "gray.400" }}
                />
                <Button
                  position="absolute"
                  right="12px"
                  top="50%"
                  transform="translateY(-50%)"
                  h="1.75rem"
                  minW="1.75rem"
                  size="sm"
                  onClick={handleClickShowPassword}
                  variant="ghost"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  fontSize="md"
                  color="gray.500"
                >
                  <Box 
                    as="span" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                    key={showPassword ? "eye-off" : "eye"}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </Box>
                </Button>
              </Flex>
            </Box>

            {/* Verification code */}
            <Box>
              <Text mb={2} color="gray.800">Email verification code</Text>
              <Flex position="relative">
                <Input 
                  placeholder="Email verification code" 
                  size="lg"
                  borderRadius="full"
                  w="full"
                  pl={6}
                  color="gray.800"
                  _placeholder={{ color: "gray.400" }}
                />
                <Button 
                  position="absolute" 
                  right="8px" 
                  top="50%" 
                  transform="translateY(-50%)"
                  h="1.75rem" 
                  size="sm" 
                  onClick={handleSendCode}
                  color="gray.600"
                  bg="transparent"
                  _hover={{ bg: "gray.100" }}
                >
                  Send
                </Button>
              </Flex>
            </Box>

            {/* Create account button */}
            <Button 
              mt={6}
              size="lg" 
              bg="gray.400" 
              color="white" 
              _hover={{ bg: 'gray.500' }}
              borderRadius="full"
            >
              Create Account
            </Button>
          </Stack>

          {/* Login link */}
          <Flex pt={6}>
            <Text color="gray.500" mr={1}>Already have an account?</Text>
            <Link color="blue.500" href="/signin" fontWeight="semibold">
              Sign In
            </Link>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
} 