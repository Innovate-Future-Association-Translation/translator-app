'use client';

import React from 'react';
import { Box, Text, Flex, Button, VStack } from '@chakra-ui/react';
// import { TRANSLATION_LANGUAGES } from '@/hooks/useTranslationLanguage';

// Temporary TRANSLATION_LANGUAGES constant definition (IT-45 languages selector UI display)
const TRANSLATION_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  // TODO：Add more languages
];

interface LanguageItem {
  value: string;
  label: string;
}

interface TranslationLanguageSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLanguage: string;
  onLanguageSelect: (languageCode: string) => void;
}

function TranslationLanguageSelector({
  isOpen,
  onClose,
  selectedLanguage,
  onLanguageSelect,
}: TranslationLanguageSelectorProps) {
  const handleLanguageSelect = (languageCode: string) => {
    onLanguageSelect(languageCode);
    onClose();
  };

  const handleConfirm = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex="1000"
        onClick={onClose}
        display={{ base: 'block', md: 'block' }}
      />

      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        borderTopRadius={{ base: '20px', md: '24px' }}
        maxH={{ base: '70vh', md: '60vh' }}
        overflow="hidden"
        zIndex="1001"
        transform={isOpen ? 'translateY(0)' : 'translateY(100%)'}
        transition="transform 0.3s ease-in-out"
        mx={{ base: '0', md: 'auto' }}
        maxW={{ base: '100%', md: '600px' }}
      >
        <Flex
          align="center"
          justify="space-between"
          p={{ base: '20px', md: '24px' }}
          pb={{ base: '16px', md: '20px' }}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Text fontSize={{ base: '18px', md: '20px' }} fontWeight="600" color="gray.800">
            Select Translation Language
          </Text>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            fontSize={{ base: '16px', md: '18px' }}
            fontWeight="bold"
            color="gray.500"
            _hover={{ color: 'gray.700' }}
            minW="auto"
            h="auto"
            p="8px"
          >
            ✕
          </Button>
        </Flex>

        <Box
          px={{ base: '20px', md: '24px' }}
          pb={{ base: '20px', md: '24px' }}
          maxH={{ base: '45vh', md: '40vh' }}
          overflowY="auto"
        >
          <VStack align="stretch" gap={0}>
            {TRANSLATION_LANGUAGES.map((language: LanguageItem, index: number) => (
              <Box
                key={language.value}
                as="button"
                w="full"
                py={{ base: '14px', md: '16px' }}
                px={{ base: '12px', md: '16px' }}
                textAlign="left"
                borderBottom={index < TRANSLATION_LANGUAGES.length - 1 ? '1px solid' : 'none'}
                borderColor="gray.100"
                _hover={{ bg: 'gray.50' }}
                _active={{ bg: 'gray.100' }}
                onClick={() => handleLanguageSelect(language.value)}
                borderRadius="8px"
                transition="background-color 0.2s"
              >
                <Flex align="center" justify="space-between">
                  <Text
                    fontSize={{ base: '15px', md: '16px' }}
                    color={selectedLanguage === language.value ? 'blue.500' : 'gray.800'}
                    fontWeight={selectedLanguage === language.value ? '600' : '400'}
                  >
                    {language.label}
                  </Text>
                  {selectedLanguage === language.value && (
                    <Box
                      w="20px"
                      h="20px"
                      borderRadius="50%"
                      bg="blue.500"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text color="white" fontSize="12px" fontWeight="bold">
                        ✓
                      </Text>
                    </Box>
                  )}
                </Flex>
              </Box>
            ))}
          </VStack>

          <Box mt={{ base: '20px', md: '24px' }}>
            <Button
              w="full"
              h={{ base: '48px', md: '56px' }}
              bg="blue.500"
              color="white"
              borderRadius={{ base: '24px', md: '28px' }}
              fontSize={{ base: '15px', md: '16px' }}
              fontWeight="600"
              _hover={{ bg: 'blue.600' }}
              _active={{ bg: 'blue.700' }}
              onClick={handleConfirm}
              shadow="sm"
            >
              Confirm Selection
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TranslationLanguageSelector;
