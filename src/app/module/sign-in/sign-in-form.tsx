import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from 'react-icons/fc';
import { Box, Button, Flex, Stack, Text, Link } from '@chakra-ui/react';
import axios from 'axios';
import { signinSchema, SigninFormData } from '@/app/validation/signin';
import { InputField } from '@/app/module/common/input-field';
import { PasswordInput } from '@/app/module/common/password-input';
import { API_BASE_URL, getUserProfile } from '@/lib/api';
import { useRedirectStore } from '@/store/redirectStore';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const clearRedirectPath = useRedirectStore((state) => state.clearRedirectPath);
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

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
    window.location.href = `${API_BASE_URL}/users/googleAuth`;
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
        localStorage.setItem('IFA_AuthToken', token);

        try {
          const userResponse = await getUserProfile(token);
          if (userResponse.ok) {
            const userData = await userResponse.json();
            setUser(userData);
          } else {
            console.error('Failed to fetch user profile after login');
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }

        let savedRedirectPath = useRedirectStore.getState().redirectPath;

        if (!savedRedirectPath) {
          try {
            const storedData = localStorage.getItem('IFA_RedirectPath');
            if (storedData) {
              const parsed = JSON.parse(storedData);
              savedRedirectPath = parsed?.state?.redirectPath || null;
            }
          } catch (e) {
            console.error('[SignInForm] Error parsing localStorage:', e);
          }
        }

        if (savedRedirectPath) {
          router.replace(savedRedirectPath);
          setTimeout(() => {
            clearRedirectPath();
          }, 500);
        } else {
          router.replace(redirectUrl || '/dashboard');
        }
      } else {
        setServerError('Sign-in failed. Please check your credentials.');
      }
    } catch (error) {
      setServerError('Sign-in failed. Please try again.');
      console.error('Login error:', error);
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
      <Flex w="full" align="center" gap={3}>
        <Box flex={1} h="1px" bg="gray.200" />
        <Text color="gray.500" fontSize="sm">
          OR
        </Text>
        <Box flex={1} h="1px" bg="gray.200" />
      </Flex>
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
