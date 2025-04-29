import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from 'react-icons/fc';
import { Box, Button, Flex, Stack, Text, Link } from '@chakra-ui/react';
import axios from 'axios';

import { signinSchema, SigninFormData } from '@/app/validation/signin';
import { InputField } from '@/app/module/common/input-field';
import { PasswordInput } from '@/app/module/common/password-input';

// Sign in form component
export const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // react-hook-form configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleGoogleOauth = () => {
    window.location.href =
      'http://translator-alb-1789479950.ap-southeast-2.elb.amazonaws.com/api/v1/users/googleAuth';
    console.log('Initiating Google Sign-In...');
  };

  const onSubmit = async (data: SigninFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call for authentication
      console.log('Sign-in form data:', data);

      // TODO: Replace with actual API call
      const response = await axios.post(
        'http://translator-alb-1789479950.ap-southeast-2.elb.amazonaws.com/api/v1/users/login',
        {
          email: data.email,
          password: data.password,
        }
      );

      if (response.status === 200) {
        const { token, redirectUrl } = response.data;
        localStorage.setItem('authToken', token);
        window.location.href = redirectUrl;
        alert('Sign-in successful!');
      } else {
        alert('Sign-in failed. Please check your email and password.');
      }
    } catch (error) {
      // Handle login failure
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert('Invalid credentials. Please check your email and password.');
        } else if (error.response?.status === 406) {
          alert('Invalid credential format. Please check your input.');
        } else {
          alert('Sign-in failed. Please try again later.');
        }
      } else {
        alert('An unknown error occurred.');
      }
      console.error('Sign-in error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack align="center" gap={6}>
      <Text fontSize="3xl" fontWeight="bold" color="black">
        Sign In
      </Text>
      <Text color="gray.600" mt={-4} mb={2}>
        Welcome to IFA!
      </Text>

      {/* Sign-in form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack w="full" gap={4}>
          <InputField
            label="Email"
            placeholder="Email Address"
            register={register('email')}
            error={errors.email?.message}
            isRequired
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            register={register('password')}
            error={errors.password?.message}
            isRequired
          />
          <Flex justify="flex-end" mt={-2} mb={2}>
            <Link href="/forgot-password" color="blue.500" fontSize="sm" fontWeight="medium">
              Forgot Password?
            </Link>
          </Flex>
          <Button
            mt={4}
            size="lg"
            bg="gray.300"
            color="white"
            _hover={{ bg: 'gray.400' }}
            borderRadius="full"
            type="submit"
            disabled={isSubmitting}
            w="full"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </Stack>
      </form>
      {/* Divider */}
      <Flex w="full" align="center" gap={3}>
        <Box flex={1} h="1px" bg="gray.200" />
        <Text color="gray.500" fontSize="sm">
          OR
        </Text>
        <Box flex={1} h="1px" bg="gray.200" />
      </Flex>
      {/* Google sign-in button */}
      <Button
        w="full"
        variant="outline"
        borderRadius="full"
        size="lg"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={2}
        onClick={handleGoogleOauth}
        borderColor="gray.300"
        _hover={{ bg: 'gray.50' }}
      >
        <Box as="span" w="20px" h="20px" display="flex" alignItems="center" justifyContent="center">
          <FcGoogle size={20} />
        </Box>
        <Text fontWeight="medium">Sign in with Google</Text>
      </Button>
      <Flex pt={6}>
        <Text color="gray.600" mr={1}>
          Don&apos;t have an account?
        </Text>
        <Link color="blue.500" href="/signup" fontWeight="semibold">
          Sign Up
        </Link>
      </Flex>
    </Stack>
  );
};
