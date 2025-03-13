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
  Input,
  VStack,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  Textarea,
 
} from '@chakra-ui/react';


import { Select } from '@chakra-ui/select';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/form-control'




//Import React Hook Form and Zod for form validation
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";



// Import Google icon
import { FcGoogle } from 'react-icons/fc';
// Import password show/hide icons
import { FiEye, FiEyeOff } from 'react-icons/fi';


// 1. Definite the schema for the form using Zod

type SignupFormData = z.infer<typeof signupSchema>;
const signupSchema = z.object({
  userName: z.string().min(2, "Username must be at least 2 characters").nonempty('Username is required'),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  language: z.string().min(1, "Please select a language"),
  mobile: z.string().regex(/^\d{10,}$/, "Invalid mobile number"),
  description: z.string().max(300, "Description too long"),
});





/**
 * Registration Page Component
 * Provides a user interface with multiple registration methods
 * @returns JSX Element - Renders the registration page
 */
export default function SignUpPage() {
  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  
 // Use react-hook-form for form handling and validation
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm <SignupFormData>({
  resolver: zodResolver(signupSchema),
});



  // Password visibility toggle
  const handleClickShowPassword = () => {
    setShowPassword(prevState => !prevState);
  };
  
  // Send verification code handler
  const handleSendCode = () => {
    console.log('Sending verification code');
    // In actual implementation, should call API to send verification code
  
  };

  // add onSubmit function
const onSubmit = async (data:  SignupFormData) => {
  try {
    console.log("Form Data:", data);
    // here can call API handling registration request
  } catch (error) {
    console.error('Registration error:', error);
  }
  
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
          <Stack w="full" gap={4} as="form" onSubmit={handleSubmit(onSubmit)}>
            
            
        
          {/* Username Field */}
          <FormControl isInvalid={!!errors.userName}>
              <FormLabel>Username</FormLabel>
              <Input
                placeholder="Enter your username"
                size="lg"
                borderRadius="full"
                pl={6}
                _placeholder={{ color:"gray.400",opacity:1}}
                {...register('userName')}
              />
              <FormErrorMessage>{errors.userName?.message}</FormErrorMessage>
            </FormControl>


            {/* Email Field */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email Address*</FormLabel>
              <Input
                type="email"
                placeholder="example@domain.com"
                size="lg"
                borderRadius="full"
                pl={6}
                _placeholder={{ color:"gray.400",opacity:1}}
                {...register('email')}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>

            {/* Password */}
            <Box>
              <Text mb={2} color="gray.800">Password*</Text>
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

            {/* Language */}
            <FormControl isInvalid={!!errors.language} isRequired>
                <FormLabel>
                  Preferred Language
                </FormLabel>
            <Select
              placeholder="Select language"
              size="lg"
              borderRadius="full"
              pl={6}
              focusBorderColor="blue.500"
              errorBorderColor="red.500"
              _placeholder={{ 
                color: "gray.400",
                fontSize: "md",
                opacity: 1 
              }}
              //avoid CSS global pollution by using the css prop
              css={{
                "&::-ms-expand": { display: "none" },
                "-webkit-appearance": "none",
                "-moz-appearance": "none",
                appearance: "none"
              }}

              {...register('language')}
            >
              <option value="en" style={{ padding: '8px' }}>English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="zh">Chinese</option>
            </Select>
            {errors.language && (
              <FormErrorMessage mt={2} fontSize="sm">
                {errors.language.message}
              </FormErrorMessage>
            )}
          </FormControl>



            {/* Mobile Number */}
            <FormControl isInvalid={!!errors.mobile}>
              <FormLabel>Mobile Number</FormLabel>
              <Input
                placeholder="Enter your mobile number"
                size="lg"
                borderRadius="full"
                pl={6}
                _placeholder={{ color:"gray.400",opacity:1}}
                {...register('mobile')}
              />
              <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
            </FormControl>



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


          {/* Description Field */}
          <FormControl isInvalid={!!errors.description}>
              <FormLabel>Self Description</FormLabel>
              <Textarea
                placeholder="Tell us about yourself"
                size="lg"
                borderRadius="lg"
                resize="vertical"

                {...register('description')}
              />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>


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

          <Button type="submit" colorScheme="blue" isLoading={isSubmitting} width="full">
              Register
          </Button>
          
        </Stack>
      </Box>
    </Box>
  );
} 