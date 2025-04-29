import React from 'react';
import { Box, Input, Text, Textarea } from '@chakra-ui/react';
import { UseFormRegisterReturn } from 'react-hook-form';

// Input field props
interface InputFieldProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  isRequired?: boolean;
  isTextarea?: boolean;
  rows?: number;
}

// Input field component
export const InputField = ({
  label,
  placeholder,
  register,
  error,
  isRequired = false,
  isTextarea = false,
  rows = 4,
}: InputFieldProps) => {
  return (
    <Box>
      <Text mb={2} color="gray.800">
        {label}{' '}
        {isRequired && (
          <Text as="span" color="red.500">
            *
          </Text>
        )}
      </Text>
      {isTextarea ? (
        <Textarea
          {...register}
          placeholder={placeholder}
          rows={rows}
          borderRadius="xl"
          pl={6}
          py={4}
          color="gray.800"
          _placeholder={{ color: 'gray.400' }}
          borderColor={error ? 'red.500' : 'gray.200'}
          _focus={{
            borderColor: error ? 'red.500' : 'blue.500',
            boxShadow: 'none',
            outline: 'none',
          }}
        />
      ) : (
        <Input
          {...register}
          placeholder={placeholder}
          size="lg"
          borderRadius="full"
          pl={6}
          color="gray.800"
          _placeholder={{ color: 'gray.400' }}
          borderColor={error ? 'red.500' : 'gray.200'}
          _focus={{
            borderColor: error ? 'red.500' : 'blue.500',
            boxShadow: 'none',
            outline: 'none',
          }}
        />
      )}
      {error && (
        <Text color="red.500" mt={1} fontSize="sm">
          {error}
        </Text>
      )}
    </Box>
  );
};
