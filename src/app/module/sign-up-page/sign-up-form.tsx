import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from 'react-icons/fc';
import { 
  Box, 
  Button, 
  Flex, 
  Stack, 
  Text, 
  Link
} from '@chakra-ui/react';

import { signupSchema, SignupFormData } from '@/app/validation/signup';
import { InputField } from '@/app/module/common/input-field';
import { PasswordInput } from '@/app/module/common/password-input';
import { PhoneInput } from '@/app/module/sign-up-page/phone-input';
import { LanguageSelect } from '@/app/module/sign-up-page/language-select';
import axios from 'axios';
import { API_BASE_URL } from '@/lib/api';

// Sign up form component
export const SignUpForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // react-hook-form configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      language: '',
      phone: '',
      selfDescription: '',
    },
  });

  // Handle Google OAuth signup
  const handleGoogleOauth = () => {
    window.location.href = `${API_BASE_URL}/users/googleAuth`;
  };

  // Handle form submission
  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    
    try {
      await axios.post(`${API_BASE_URL}/users/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
        language: data.language,
        mobile: data.phone,
        selfDescription: data.selfDescription,
      });

      // Redirect to sign-in page after successful registration
      router.push('/sign-in');
    } catch (error: unknown) {
      handleSignupError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupError = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      setError('email', {
        type: 'manual',
        message: 'An unknown error occurred.'
      });
      console.error('Sign-up error:', error);
      return;
    }

    const status = error.response?.status;
    
    const errorHandlers: Record<number, () => void> = {
      409: () => {
        setError('email', {
          type: 'manual',
          message: 'This email is already registered'
        });
      },
      406: () => {
        const errorData = error.response?.data;
        const fieldErrorMap: Record<string, () => void> = {
          name: () => {
            setError('name', {
              type: 'manual',
              message: 'Name must be at least 3 characters long'
            });
          },
          email: () => {
            setError('email', {
              type: 'manual',
              message: 'Invalid email format'
            });
          },
          password: () => {
            setError('password', {
              type: 'manual',
              message: 'Password must be at least 8 characters and contain uppercase and lowercase letters and numbers'
            });
          },
          mobile: () => {
            setError('phone', {
              type: 'manual',
              message: 'Mobile must match Australia standard (+61 or 0 followed by 4 and 8 digits)'
            });
          },
          language: () => {
            setError('language', {
              type: 'manual',
              message: 'Please select a valid language'
            });
          },
          selfDescription: () => {
            setError('selfDescription', {
              type: 'manual',
              message: errorData?.message || 'Invalid self description'
            });
          }
        };

        const field = errorData?.field;
        (fieldErrorMap[field] || (() => {
          setError('email', {
            type: 'manual',
            message: errorData?.message || 'Invalid input format. Please check your fields.'
          });
        }))();
      },
      500: () => {
        setError('email', {
          type: 'manual',
          message: 'Something went wrong on the server. Please try again later.'
        });
      }
    };

    (errorHandlers[status || 0] || (() => {
      setError('email', {
        type: 'manual',
        message: 'Sign-up failed. Please try again.'
      });
    }))();
    
    console.error('Sign-up error:', error);
  };

  return (
    <Stack align="center" gap={6}>
      {/* Title */}
      <Text fontSize="2xl" fontWeight="bold" color="black">
        Sign Up
      </Text>

      {/* Registration form */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
        <Stack w="full" gap={4}>
          {/* Username field */}
          <InputField
            label="Username"
            placeholder="Username"
            register={register('name')}
            error={errors.name?.message}
          />

          {/* Email field */}
          <InputField
            label="Email"
            placeholder="Email Address"
            register={register('email')}
            error={errors.email?.message}
            isRequired
          />

          {/* Password field */}
          <PasswordInput
            label="Password"
            placeholder="Password"
            register={register('password')}
            error={errors.password?.message}
            isRequired
          />

          {/* Confirm Password field */}
          <PasswordInput
            label="Confirm password"
            placeholder="Confirm password"
            register={register('confirmPassword')}
            error={errors.confirmPassword?.message}
            isRequired
          />

          {/* Language select field */}
          <LanguageSelect register={register('language')} error={errors.language?.message} />

          {/* Phone number field */}
          <PhoneInput setValue={setValue} error={errors.phone?.message} />

          {/* Self-description field */}
          <InputField
            label="Self-description"
            placeholder="Self-description"
            register={register('selfDescription')}
            error={errors.selfDescription?.message}
            isTextarea
            rows={4}
          />
          {/* Create account button */}
          <Button
            mt={6}
            size="lg"
            bg="gray.400"
            color="white"
            _hover={{ bg: 'gray.500' }}
            borderRadius="full"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Stack>
      </form>
      {/* Divider */}
      <Flex w="full" align="center" gap={3}>
        <Box flex={1} h="1px" bg="gray.200" />
        <Text color="gray.500">OR</Text>
        <Box flex={1} h="1px" bg="gray.200" />
      </Flex>
      {/* Google signup button */}
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
      >
        <Box as="span" w="20px" h="20px" display="flex" alignItems="center" justifyContent="center">
          <FcGoogle size={20} />
        </Box>
        <Text>Sign up with Google</Text>
      </Button>
      {/* Sign In link */}
      <Flex pt={4}>
        <Text color="gray.500" mr={1}>
          Already have an account?
        </Text>
        <Link color="blue.500" href="/sign-in" fontWeight="semibold">
          Sign In
        </Link>
      </Flex>
    </Stack>
  );
};
