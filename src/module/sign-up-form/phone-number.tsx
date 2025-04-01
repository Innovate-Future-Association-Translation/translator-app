/**
 * src/module/SignUpForm/PhoneNumberField.tsx
 */
'use client';

import React from 'react';
import {
Input,
Box,
Flex,
Text,
} from '@chakra-ui/react';
import {
FormControl,
FormLabel,
FormErrorMessage,
  } from '@chakra-ui/form-control'
import { FiChevronDown } from 'react-icons/fi';
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { SignupFormData } from '@/app/schemas/signupSchema';
import { inputStyles } from '../../common/formInput';

interface PhoneNumberFieldProps {
register: UseFormRegister<SignupFormData>;
errors: FieldErrorsImpl<SignupFormData>;
countryCode: string;
setCountryCode: (code: string) => void;
}

export function PhoneNumberField({
register,
errors,
countryCode,
setCountryCode,
}: PhoneNumberFieldProps) {
return (
<FormControl isInvalid={!!errors.phoneNumber} mb={8} width="100%">
    <FormLabel fontSize="sm" color="gray.600" mb={4} width="100%">
    Phone number
    </FormLabel>
    <Box
    display="flex"
    alignItems="center"
    h="40px"
    border="1px solid"
    borderColor={errors.phoneNumber ? 'red.500' : 'gray.300'}
    borderRadius="full"
    px={4}
    bg="white"
    transition="border-color 0.2s"
    _focusWithin={{
        borderColor: errors.phoneNumber ? 'red.500' : 'blue.500',
        boxShadow: 'none',
    }}
    >
    {/* Country code */}
    <Box
        as="button"
        display="flex"
        alignItems="center"
        cursor="pointer"
        color="gray.600"
        fontSize="sm"
        _focus={{ outline: 'none' }}
    >
        {countryCode}
        <Box ml={1} color="gray.400">
        <FiChevronDown size={17} />
        </Box>
    </Box>
    {/* Divider */}
    <Box h="100%" borderRight="1px solid" borderColor="gray.300" mx={3} />
    {/* Phone number input */}
    <Input
        placeholder="Phone number"
        fontSize="sm"
        color="gray.600"
        _placeholder={{ color: 'gray.400', fontSize: 'sm', pl: 2 }}
        border="none"
        _focus={{ boxShadow: 'none', border: 'none' }}
        {...register('phoneNumber', { required: 'Phone number is required' })}
    />
    </Box>
    <FormErrorMessage>
      {errors.phoneNumber?.message} 
    </FormErrorMessage>
</FormControl>
);
}
