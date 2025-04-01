/**
 * src/module/SignUpForm/DescriptionField.tsx
 */
'use client';

import React from 'react';
import {
  Textarea,
  Text,
} from '@chakra-ui/react';
import {
FormControl,
FormLabel,
FormErrorMessage,
  } from '@chakra-ui/form-control'
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { SignupFormData } from '@/app/schemas/signupSchema';

interface DescriptionFieldProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrorsImpl<SignupFormData>;
}

export function DescriptionField({ register, errors }: DescriptionFieldProps) {
  return (
    <FormControl isInvalid={!!errors.description} width="100%" mb={8}>
      <FormLabel fontSize="sm" color="gray.600" mb={4} fontWeight="normal" width="100%">
        Self-description
      </FormLabel>
      <Textarea
        placeholder="Tell us about yourself"
        {...register('description')}
        minH="140px"
        borderRadius="20px"
        border="1.5px solid"
        borderColor="gray.300"
        p={4}
        fontSize="md"
        _placeholder={{
          color: 'gray.400',
          fontSize: 'sm',
          textAlign: 'left',
        }}
        _focus={{
          borderColor: 'blue.500',
          boxShadow: '0 0 0 2px rgba(49, 130, 206, 0.3)',
          borderWidth: '1.5px',
        }}
        _invalid={{
          borderColor: 'red.500',
          boxShadow: '0 0 0 2px rgba(229, 62, 62, 0.3)',
        }}
        resize="vertical"
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      />
      <FormErrorMessage mt={2} fontSize="sm" color="red.500">
        {errors.description?.message}
      </FormErrorMessage>
    </FormControl>
  );
}
