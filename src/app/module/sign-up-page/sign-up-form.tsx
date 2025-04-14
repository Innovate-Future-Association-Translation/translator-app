import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FcGoogle } from 'react-icons/fc';
import { Box, Button, Flex, Stack, Text, Link } from '@chakra-ui/react';

import { signupSchema, SignupFormData } from '@/app/validation/signup';
import { InputField } from '@/app/module/common/input-field';
import { PasswordInput } from '@/app/module/common/password-input';
import { PhoneInput } from '@/app/module/sign-up-page/phone-input';
import { LanguageSelect } from '@/app/module/sign-up-page/language-select';

// Sign up form component
export const SignUpForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // react-hook-form configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
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
    window.location.href = 'http://localhost:8000/api/v1/users/googleAuth';
  };

  // Handle form submission
  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call for registration
      console.log('Sign-up form data:', data);

      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message
      alert('Sign-up successful!');

      // Redirect to sign-in page after successful registration
      router.push('/sign-in');
    } catch (error) {
      alert('Sign-up failed. Please try again later.');
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
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
            register={register('username')}
            error={errors.username?.message}
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
          <PhoneInput register={register('phone')} error={errors.phone?.message} />

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
