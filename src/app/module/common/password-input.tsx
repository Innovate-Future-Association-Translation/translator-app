import React, { useState } from 'react';
import { Box, Input, Button, Text } from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { UseFormRegisterReturn } from 'react-hook-form';

// Password input props
interface PasswordInputProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  isRequired?: boolean;
}

// Password input component
export const PasswordInput = ({
  label,
  placeholder,
  register,
  error,
  isRequired = false,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      <Box position="relative">
        <Input
          {...register}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          size="lg"
          borderRadius="full"
          w="full"
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
        <Button
          position="absolute"
          right="12px"
          top="50%"
          transform="translateY(-50%)"
          h="1.75rem"
          minW="1.75rem"
          size="sm"
          onClick={handleClickShowPassword}
          variant="ghost"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          fontSize="md"
          color="gray.500"
        >
          <Box as="span" display="flex" alignItems="center" justifyContent="center">
            {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          </Box>
        </Button>
      </Box>
      {error && (
        <Text color="red.500" mt={1} fontSize="sm">
          {error}
        </Text>
      )}
    </Box>
  );
};
