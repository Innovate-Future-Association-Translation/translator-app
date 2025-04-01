'use client';

import React from 'react';
import {
  Input,
  Text,
} from '@chakra-ui/react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/form-control'
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { inputStyles } from '../../common/formInput';
import { SignupFormData } from '@/app/schemas/signupSchema';

interface EmailFieldProps {
    register: UseFormRegister<SignupFormData>;
    errors: FieldErrorsImpl<SignupFormData>;
  }

export function EmailField({ register, errors }: EmailFieldProps) {
return (
    <FormControl isInvalid={!!errors.email} width="100%" mb={8}>
    <FormLabel fontSize="sm" color="gray.600" mb={4} width="100%">
        Email
        <Text as="span" color="red.500">
        *
        </Text>
    </FormLabel>
    <Input
        type="email"
        placeholder="example@domain.com"
        {...register('email')}
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
    />
    <FormErrorMessage mt={1}>
        <Text as="span" color="red.500" ml={1}>
            {errors.email?.message}
        </Text>
    </FormErrorMessage>
    </FormControl>
);
}