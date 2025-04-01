'use client';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import {
  Button,
  Flex,
  Input,
  Text
} from '@chakra-ui/react';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { inputStyles } from '../../common/formInput';
import { SignupFormData } from '@/app/schemas/signupSchema';

interface ConfirmPasswordFieldProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrorsImpl<SignupFormData>;
  showConfirmPassword: boolean;
  onToggleShowConfirmPassword: () => void;
}

export function ConfirmPasswordField({
  register,
  errors,
  showConfirmPassword,
  onToggleShowConfirmPassword,
}: ConfirmPasswordFieldProps) {
  return (
    <FormControl isInvalid={!!errors.confirmPassword} width="100%" mb={8}>
      <FormLabel fontSize="sm" color="gray.600" mb={4} width="100%">
        Confirm Password
        <Text as="span" color="red.500">
          *
        </Text>
      </FormLabel>
      <Flex position="relative">
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          {...inputStyles}
          size="md"
          {...register("confirmPassword")}
          pr="4.5rem"
        />
        <Button
          position="absolute"
          right="2"
          top="50%"
          transform="translateY(-50%)"
          size="sm"
          variant="ghost"
          onClick={onToggleShowConfirmPassword}
          color={errors.confirmPassword ? "red.500" : "gray.500"}
        >
          {showConfirmPassword ? (
            <FiEye />
          ) : (
            <FiEyeOff />
          )}
        </Button>
      </Flex>
      <FormErrorMessage mt={1}>
        <Text as="span" color="red.500" ml={1}>
          {errors.confirmPassword?.message}
        </Text>
      </FormErrorMessage>
    </FormControl>
  );
}
