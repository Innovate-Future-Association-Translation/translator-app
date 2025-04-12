'use client';
import { Image } from '@chakra-ui/react';
import React from 'react';
import {
Input,
Text,
Button,
Flex,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import {
FormControl,
FormLabel,
FormErrorMessage,
} from '@chakra-ui/form-control'

import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { SignupFormData } from '@/app/schemas/signupSchema';

interface PasswordFieldProps {
register: UseFormRegister<SignupFormData>;
errors: FieldErrorsImpl<SignupFormData>;
showPassword: boolean;
onToggleShowPassword: () => void;
}

export function PasswordField({
register,
errors,
showPassword,
onToggleShowPassword,
}: PasswordFieldProps) {
return (
  <FormControl isInvalid={!!errors.password} width="100%" mb={8}>
    <FormLabel fontSize="sm" color="gray.600" mb={4} width="100%">
      Password
      <Text as="span" color="red.500">
        *
      </Text>
    </FormLabel>
    <Flex position="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        size="md"
        borderRadius="full"
        pl={4}
        _placeholder={{ color: "gray.400", fontSize: "sm" }}
        border="1px solid"
        borderColor={errors.email ? 'red.500' : 'gray.300'}
        color="gray.800"
        width="100%"
        maxWidth="400px"
        mx="auto"
        _focusVisible={{
          borderColor: errors.email ? 'red.500' : 'blue.500',
          boxShadow: 'none',
        }}
        {...register("password")}
        pr="4.5rem"
      />
      <Button
        position="absolute"
        right="2"
        top="50%"
        transform="translateY(-50%)"
        size="sm"
        variant="ghost"
        onClick={onToggleShowPassword}
        color={errors.password ? "red.500" : "gray.500"}
      >
        {showPassword ? <FiEye /> : <FiEyeOff />}
      </Button>
    </Flex>
    <FormErrorMessage mt={1}>
      <Text as="span" color="red.500" ml={1}>
        {errors.password?.message}
      </Text>
    </FormErrorMessage>
  </FormControl>
);
}
