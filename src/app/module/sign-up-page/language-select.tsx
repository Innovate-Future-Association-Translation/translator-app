import React, { useState } from 'react';
import { Box, Text, Input } from '@chakra-ui/react';
import { FiChevronDown } from 'react-icons/fi';
import { UseFormRegisterReturn } from 'react-hook-form';

// Language list
const LANGUAGES = [
  { value: 'English', label: 'English' },
  { value: 'Chinese', label: 'Chinese' },
  { value: 'French', label: 'French' },
  { value: 'Korean', label: 'Korean' },
  { value: 'Japanese', label: 'Japanese' },
  { value: 'Arabic', label: 'Arabic' },
  { value: 'Russian', label: 'Russian' },
  { value: 'Thai', label: 'Thai' },
];

// Language select props
interface LanguageSelectProps {
  register: UseFormRegisterReturn;
  error?: string;
}

// Language select component
export const LanguageSelect = ({ register, error }: LanguageSelectProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showLanguages, setShowLanguages] = useState(false);

  // Update form value when language is selected
  const handleSelectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguages(false);

    // Trigger form update using register's onChange
    const event = {
      target: {
        name: register.name,
        value: language,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    register.onChange(event);
  };

  return (
    <Box>
      <Text mb={2} color="gray.800" id="language-label">
        Language{' '}
        <Text as="span" color="red.500">
          *
        </Text>
      </Text>

      {/* Form control */}
      <Box position="relative" width="100%">
        {/* Hidden input for react-hook-form registration */}
        <Input
          {...register}
          opacity="0"
          position="absolute"
          height="0"
          width="0"
          value={selectedLanguage} // Keep value synchronized
        />

        {/* Custom dropdown appearance */}
        <Box
          display="flex"
          alignItems="center"
          height="48px"
          width="100%"
          border="1px solid"
          borderColor={error ? 'red.500' : '#E2E8F0'}
          borderRadius="full"
          px={4}
          bg="white"
          cursor="pointer"
          onClick={() => setShowLanguages(!showLanguages)}
          _focusWithin={{
            borderColor: error ? 'red.500' : 'blue.500',
            boxShadow: 'none',
            outline: 'none',
          }}
        >
          <Text color={selectedLanguage ? '#2D3748' : 'gray.400'} flex="1">
            {selectedLanguage || 'Select language'}
          </Text>
          <Box color="gray.400" mr={2.5}>
            <FiChevronDown size={17} />
          </Box>
        </Box>

        {/* Language dropdown menu */}
        {showLanguages && (
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
            width="100%"
            maxHeight="200px"
            overflowY="auto"
          >
            {LANGUAGES.map((lang) => (
              <Box
                key={lang.value}
                as="button"
                w="full"
                textAlign="left"
                px={3}
                py={2}
                _hover={{ bg: 'gray.100' }}
                onClick={() => handleSelectLanguage(lang.value)}
              >
                {lang.label}
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {error && (
        <Text color="red.500" mt={1} fontSize="sm">
          {error}
        </Text>
      )}
    </Box>
  );
};
