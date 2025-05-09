import React, { useEffect, useState } from 'react';
import { Box, Input, Text, Button } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { FiChevronDown } from 'react-icons/fi';
import { UseFormSetValue } from 'react-hook-form';
import { SignupFormData } from '@/app/validation/signup';

// Country code list
const COUNTRY_CODES = ['+61', '0'];

// Phone input props
interface PhoneInputProps {
  setValue: UseFormSetValue<SignupFormData>;
  error?: string;
}

// Phone input component
export const PhoneInput = ({ setValue, error }: PhoneInputProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+61');
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);


  const validateAustralianPhoneNumber = (fullNumber: string): boolean => {
    const australianPhoneRegex = /^(?:\+61|0)4\d{8}$/;
    return australianPhoneRegex.test(fullNumber);
  };

  useEffect(() => {
    const fullPhone = `${countryCode}${phoneNumber}`;
    
    if (phoneNumber) {
      if (countryCode === '+61' && !phoneNumber.startsWith('4')) {
        setLocalError('Australian mobile numbers must start with 4 after the country code');
      } else if (countryCode === '0' && !phoneNumber.startsWith('4')) {
        setLocalError('Australian mobile numbers must start with 04');
      } else if (countryCode === '+61' && phoneNumber.startsWith('4') && phoneNumber.length !== 9) {
        setLocalError('Phone number must be 9 digits after +61 (total 12 characters)');
      } else if (countryCode === '0' && phoneNumber.startsWith('4') && phoneNumber.length !== 9) {
        setLocalError('Phone number must be 10 digits including the leading 0');
      } else {
        setLocalError(null);
      }
    } else {
      setLocalError(null);
    }
    
    setValue('phone', fullPhone, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }, [countryCode, phoneNumber, setValue]);

  // Toggle country code dropdown visibility
  const handleToggleCountryCodes = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setShowCountryCodes(!showCountryCodes);
  };

  // Select a country code
  const handleSelectCountryCode = (code: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    setCountryCode(code);
    setShowCountryCodes(false);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === '') {
      setPhoneNumber(value);
    }
  };

  return (
    <FormControl mb={4} width="100%">
      <FormLabel fontSize="sm" color="gray.800" mb={2}>
        Phone number{' '}
        <Text as="span" color="red.500">
          *
        </Text>
      </FormLabel>
      <Box
        display="flex"
        alignItems="center"
        h="48px"
        border="1px solid"
        borderColor={(error || localError) ? 'red.500' : 'gray.200'}
        borderRadius="full"
        px={4}
        bg="white"
        transition="border-color 0.2s"
        _focusWithin={{
          borderColor: (error || localError) ? 'red.500' : 'blue.500',
          boxShadow: 'none',
        }}
      >
        {/* Country code selector */}
        <Box position="relative">
          <Button
            variant="ghost"
            display="flex"
            alignItems="center"
            cursor="pointer"
            color="gray.800"
            fontSize="md"
            onClick={handleToggleCountryCodes}
            _focus={{ outline: 'none' }}
            height="auto"
            minWidth="0"
            padding="0"
          >
            {countryCode}
            <Box ml={1} color="gray.400">
              <FiChevronDown size={17} />
            </Box>
          </Button>

          {/* Country code dropdown */}
          {showCountryCodes && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              mt={2}
              zIndex={10}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
              width="100px"
            >
              {COUNTRY_CODES.map((code) => (
                <Button
                  key={code}
                  variant="ghost"
                  w="full"
                  textAlign="left"
                  px={3}
                  py={2}
                  _hover={{ bg: 'gray.100' }}
                  onClick={(e) => handleSelectCountryCode(code, e)}
                >
                  {code}
                </Button>
              ))}
            </Box>
          )}
        </Box>

        {/* Divider */}
        <Box h="60%" borderRight="1px solid" borderColor="gray.300" mx={3} />

        {/* Phone number input field */}
        <Input
          onChange={handlePhoneNumberChange}
          value={phoneNumber}
          placeholder={"Phone number"}
          fontSize="md"
          color="gray.800"
          _placeholder={{ color: 'gray.400' }}
          border="none"
          _focus={{ boxShadow: 'none', border: 'none' }}
        />
      </Box>
      {(error || localError) && (
        <Text color="red.500" mt={1} fontSize="sm">
          {error || localError}
        </Text>
      )}
    </FormControl>
  );
};
