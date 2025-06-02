import React from 'react';
import { Box, Text, Flex, Button, VStack } from '@chakra-ui/react';
import { TRANSLATION_LANGUAGES } from '@/hooks/useTranslationLanguage';

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
      />
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        borderTopRadius="24px"
        maxH="70vh"
        overflow="hidden"
        zIndex="1001"
        transform={isOpen ? 'translateY(0)' : 'translateY(100%)'}
        transition="transform 0.3s ease-in-out"
      >
        <Flex align="center" justify="space-between" p={6} pb={4}>
          <Text fontSize="20px" fontWeight="600" color="gray.800">
            Language selection
          </Text>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            fontSize="18px"
            fontWeight="bold"
            color="gray.500"
            _hover={{ color: 'gray.700' }}
          >
            ✕
          </Button>
        </Flex>
        <Box px={6} pb={8} maxH="50vh" overflowY="auto">
          <VStack align="stretch">
            {TRANSLATION_LANGUAGES.map((language) => (
              <Box
                key={language.value}
                as="button"
                w="full"
                py={4}
                px={2}
                textAlign="left"
                borderBottom="1px solid"
                borderColor="gray.100"
                _hover={{ bg: 'gray.50' }}
                _active={{ bg: 'gray.100' }}
                onClick={() => handleLanguageSelect(language.value)}
              >
                <Text
                  fontSize="16px"
                  color={selectedLanguage === language.value ? 'blue.500' : 'gray.800'}
                  fontWeight={selectedLanguage === language.value ? '600' : '400'}
                >
                  {language.label}
                </Text>
              </Box>
            ))}
          </VStack>
          <Box mt={8} mb={4}>
            <Button
              w="full"
              h="56px"
              bg="gray.800"
              color="white"
              borderRadius="28px"
              fontSize="16px"
              fontWeight="600"
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.900' }}
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TranslationLanguageSelector;
