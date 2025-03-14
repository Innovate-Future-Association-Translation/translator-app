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
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Link,
  Textarea,
  useBreakpointValue,
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
import { b } from 'framer-motion/client';
import { error } from 'console';

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
  const isMobile = useBreakpointValue({ base: true, md: false });
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

//Unified style configuration
const inputStyles = {
  size: "lg",
  borderRadius: "full",
  pl: 6,
  _placeholder: { color: "gray.400" },
  focusBorderColor: "blue.500",
  errorBorderColor: "red.500",
  border: "1px solid", // display language border
  borderColor: "gray.200", // border color
  color: "gray.200", // text color
};

const buttonStyles = {
  //size: "lg",
  borderRadius: "full",
  fontWeight: "semibold",
  // bg: "blue.500",
  // color: "white",
  _hover: { transform:"translateY(-1px)", shadow: "md" },
  //_active: { bg: "blue.700" },
  //isLoading: isSubmitting,
  transition: "all 0.2s",
};


  return (
    <Box maxW="md" py={8} mx="auto" bg="white" px={{ base: 4, md: 0 }}>
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
      <Box maxW="md" py={8} mx="auto" bg="white" px={{ base: 4, md: 0 }}>
      <Stack align="center" gap={{ base: 6, md: 8 }}>
          
          {/* Title */}
          <Stack textAlign="center" gap={2}>
            <Heading 
              size={{ base: "2xl", md: "4xl" }} 
              color="black"
              lineHeight="shorter"
            >
              Sign Up
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.500"> 
              Welcome to IFA Translator!
            </Text>
          </Stack>

          {/* Google login button */}
        <Button
          w="full"
          variant="outline"
          borderRadius="full"
          size={{ base: "md", md: "lg" }} // responsive size
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
          py={{ base: 5, md: 6 }} // 调整垂直内边距
          fontSize={{ base: "sm", md: "md" }} // 响应式字体
          borderWidth="1.5px"
        >
          <FcGoogle size={18} /> {/* 调整图标大小 */}
          <Text>Sign up with Google</Text>
        </Button>

          {/* Divider */}
          <Flex w="full" align="center" gap={3}>
            <Box flex={1} h="1px" bg="gray.200" />
            <Text color="gray.500">OR</Text>
            <Box flex={1} h="1px" bg="gray.200" />
          </Flex>


          
          {/* Registration form */}
          <Stack as="form" spacing={5} onSubmit={handleSubmit(onSubmit)}>
            
            
        
          {/* Username */}
          <FormControl isInvalid={!!errors.userName}>
                <FormLabel fontSize="sm" color="gray.700" mb={1}>Username</FormLabel>
                <Input
                  placeholder="Enter your username"
                  {...inputStyles}
                  {...register('userName')}
                />
                <FormErrorMessage mt={1}>{errors.userName?.message}</FormErrorMessage>
              </FormControl>


            {/* Email */}
            <FormControl isInvalid={!!errors.email}>
                <FormLabel fontSize="sm" color="gray.700" mb={1}>Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="example@domain.com"
                  {...inputStyles}
                  {...register('email')}
                />
                <FormErrorMessage mt={1}>{errors.email?.message}</FormErrorMessage>
              </FormControl>

            {/* Password */}
            <FormControl isInvalid={!!errors.password}>
                <FormLabel fontSize="sm" color="gray.700" mb={1}>Password</FormLabel>
                <Flex position="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...inputStyles}
                    {...register('password')}
                    pr="4.5rem"
                  />
                  <Button
                    position="absolute"
                    right="2"
                    top="50%"
                    transform="translateY(-50%)"
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </Flex>
                <FormErrorMessage mt={1}>{errors.password?.message}</FormErrorMessage>
              </FormControl>

              {/* Mobile Number */}
            <FormControl isInvalid={!!errors.mobile}>
            <FormLabel fontSize="sm" color="gray.700" mb={1}>Mobile Number</FormLabel>
                <Input
                  type="mobile number"
                  placeholder="Enter your mobile number"
                  {...inputStyles}
                  {...register('mobile')}
                />
              <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
            </FormControl>

        









        
          {/* Description Field */}
          <FormControl isInvalid={!!errors.description}>
              <FormLabel fontSize="sm" color="gray.700" mb={1}>Self Description</FormLabel>
                <Textarea
                  placeholder="Tell us about yourself"
                  size="lg"
                  pl={6}
                  borderRadius="lg"
                  resize="vertical"
                  minH="100px"
                  {...register('description')}
                />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>



          {/* Language Select */}
          <FormControl isInvalid={!!errors.language}>
  <FormLabel fontSize="sm" color="gray.700" mb={1}>Preferred Language</FormLabel>
  <Select
    placeholder="Select language"
    {...inputStyles}
    {...register('language')}
    
    iconColor="blue.500"
    color="gray.600"
    borderColor="gray.200"
    _hover={{ borderColor: "gray.300" }}
    
    css={{//avoid global pollution
    "&::-ms-expand": { display: "none" },
      "-webkit-appearance": "none",
      "-moz-appearance": "none",
      appearance: "none",
      "& > option": {
        color: "gray.800", 
        padding: "12px"
      },
      "&:not([value=''])": {
        color: "gray.800" 
      }
    }}
  >
    <option value="" disabled hidden style={{ color: "gray.400" }}>Select language</option>
    <option value="en">English</option>
    <option value="es">Spanish</option>
    <option value="fr">French</option>
    <option value="zh">Chinese</option>
  </Select>
  <FormErrorMessage mt={1}>{errors.language?.message}</FormErrorMessage>
</FormControl>


            {/* Create account button */}
            <Button 
              type="submit"
              colorScheme="blue"
              //mt={6}

              size="lg" 
              {...buttonStyles}
              mt={8} 
              mb={4} 
              py={6}

              bg="blue.400" 
              color="white" 
              _hover={{ bg: 'blue.500' }}
              borderRadius="full"
            >
              Create Account
            </Button>
          

           {/* Sign In Link */}
           <Text textAlign="center" mt={4} color="gray.600">
                Already have an account?{' '}
                <Link href="/signin" color="blue.600" fontWeight="600">Sign In</Link>
              </Text>
            </Stack>
        </Stack>
      </Box>
    </Box>
  );
} 