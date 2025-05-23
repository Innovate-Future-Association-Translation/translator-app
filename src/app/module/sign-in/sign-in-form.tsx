import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from 'react-icons/fc';
import { Box, Button, Flex, Stack, Text, Link } from '@chakra-ui/react';
import axios from 'axios';

import { signinSchema, SigninFormData } from '@/app/validation/signin';
import { InputField } from '@/app/module/common/input-field';
import { API_BASE_URL } from '@/lib/api';
import { PasswordInput } from '@/app/module/common/password-input';
import { useRouter } from 'next/navigation';
import { ForgotPasswordModal } from './components/forgot-password-modal';
import { useBreakpointValue } from '@chakra-ui/react';

// Sign in form component
export const SignInForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

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

  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleGoogleOauth = () => {
    window.location.href = `${API_BASE_URL}/users/googleAuth`;
    console.log('Initiating Google Sign-In...');
  };

  const onSubmit = async (data: SigninFormData) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        email: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        const { token, redirectUrl } = response.data;
        localStorage.setItem('authToken', token);
        window.location.href = redirectUrl;
      } else {
        setServerError('Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      handleLoginError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginError = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      setServerError(
        'An unknown error occurred. Please check your network or contact our technical support'
      );
      return;
    }

    const status = error.response?.status;
    const errorMessage = error.response?.data?.message || '';

    if (status === 401) {
      if (errorMessage.includes('email is not verified')) {
        setServerError('Email is not verified. Please check your inbox to complete verification.');
      } else {
        setServerError('Invalid email or password. Please try again.');
      }
    } else if (status === 406) {
      setServerError('Invalid input format. Please check your email and password format.');
    } else {
      setServerError('Sign-in failed. Please check your network or contact our technical support.');
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

      {serverError && (
        <Box
          w="full"
          p={3}
          bg="red.50"
          color="red.600"
          borderRadius="md"
          borderWidth="1px"
          borderColor="red.200"
          mb={4}
        >
          {serverError}
        </Box>
      )}

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
            <Flex justify="flex-end" mt={-2} mb={2}>
              <Text
                color="blue.500"
                fontSize="sm"
                fontWeight="medium"
                cursor="pointer"
                onClick={() => {
                  if (isMobile) {
                    router.push('/forgot-password');
                  } else {
                    setIsModalOpen(true);
                  }
                }}
              >
                Forgot Password?
              </Text>
            </Flex>
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
        <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
