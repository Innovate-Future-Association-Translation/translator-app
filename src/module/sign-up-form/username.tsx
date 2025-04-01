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
import { SignupFormData } from '@/app/schemas/signupSchema';
import { inputStyles } from '../../common/formInput';

interface UsernameFieldProps {
register: UseFormRegister<SignupFormData>;
errors: FieldErrorsImpl<SignupFormData>;
}

export function UsernameField({ register, errors }: UsernameFieldProps) {
return (
    <FormControl isInvalid={!!errors.userName} width="100%" mb={8}>
    <FormLabel fontSize="sm" color="gray.600" mb={4} width="100%">
        Username
    </FormLabel>
    <Input
        placeholder="Username"
        {...inputStyles}
        {...register('userName')}
        borderColor={errors.userName ? 'red.500' : 'gray.300'}
        _focusVisible={{
        borderColor: errors.userName ? 'red.500' : 'blue.500',
        boxShadow: 'none',
        }}
        color="gray.800"
    />
    <FormErrorMessage mt={1}>
        <Text as="span" color="red.500" ml={1}>
            {errors.userName?.message}
        </Text>
    </FormErrorMessage>
    </FormControl>
);
}
