'use client';
import React from 'react';
import {
  Input,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import {
FormControl,
FormLabel,
FormErrorMessage,
} from '@chakra-ui/form-control'
import { FiChevronRight } from 'react-icons/fi';
import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { SignupFormData } from '@/app/schemas/signupSchema';

interface LanguageFieldProps {
register: UseFormRegister<SignupFormData>;
errors: FieldErrorsImpl<SignupFormData>;
}

export function LanguageField({ register, errors }: LanguageFieldProps) {
return (
<FormControl isInvalid={!!errors.language} width="100%" mb={8}>
    <FormLabel fontSize="sm" color="gray.600" mb={4} width="100%">
    Language
    <Text as="span" color="red.500"> *</Text>
    </FormLabel>
    <Flex position="relative" alignItems="center">
    <Input
        placeholder="Language"
        size="md"
        borderRadius="full"
        pl={4}
        _placeholder={{ color: "gray.400", fontSize: "sm" }}
        border="1px solid"
        borderColor={errors.language ? 'red.500' : 'gray.300'}
        color="gray.800"
        width="100%"
        maxWidth="400px"
        mx="auto"
        {...register('language')}
        cursor="pointer"
        onClick={() => console.log("Navigate to language selection")}
        _focusVisible={{
        borderColor: errors.language ? 'red.500' : 'blue.500',
        boxShadow: 'none',
        }}
    />
    <Box position="absolute" right="3" color="gray.400">
        <FiChevronRight />
    </Box>
    </Flex>
    <FormErrorMessage>
      {errors.language?.message}
    </FormErrorMessage>
</FormControl>
);
}
