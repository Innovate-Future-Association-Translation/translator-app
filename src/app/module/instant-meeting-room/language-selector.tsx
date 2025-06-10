'use client';
import React from 'react';
import { useState } from 'react';
import { Box, Text, Flex, Button, VStack } from '@chakra-ui/react';
import { reTranslateMeetingRoomRecord } from '@/lib/api';
import { useMeetingStore } from '@/store/meetingStore';
import { meetingErrorMsg } from '@/lib/meetingErrorMessage';

const TRANSLATION_LANGUAGES = [
  { value: 'zh', label: 'Chinese' },
  { value: 'fr', label: 'French' },
  { value: 'ko', label: 'Korean' },
  { value: 'ja', label: 'Japanese' },
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'Arabic' },
  { value: 'ru', label: 'Russian' },
  { value: 'th', label: 'Thai' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'es', label: 'Spanish' },
];

interface TranslationItem {
  detectedLanguage: {
    language: string;
    score: number;
  };
  translations: {
    text: string;
    to: string;
  }[];
}

interface TranslationLanguageSelectorProps {
  isOpen: boolean;
  clickToCloseLanguageSelector: () => void;
  resetLanguageTranslationInThisMeeting: (languageCode: string) => void;
  setNewPersonalTranslation: (translations: string[]) => void;
}

function TranslationLanguageSelector({
  isOpen,
  clickToCloseLanguageSelector,
  resetLanguageTranslationInThisMeeting,
  setNewPersonalTranslation,
}: TranslationLanguageSelectorProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const meeting = useMeetingStore((state) => state.meeting);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleConfirm = async () => {
    if (selectedLanguage && meeting) {
      resetLanguageTranslationInThisMeeting(selectedLanguage);
      clickToCloseLanguageSelector();
      try {
        const retranslateData = await reTranslateMeetingRoomRecord(
          meeting.roomId,
          selectedLanguage
        );
        if (retranslateData && Array.isArray(retranslateData.newTranslationForHistoryTranscript)) {
          const destructedArray = retranslateData.newTranslationForHistoryTranscript.map(
            (item: TranslationItem) => item.translations[0].text
          );
          if (setNewPersonalTranslation) {
            setNewPersonalTranslation(destructedArray);
          }
        }
      } catch (error) {
        console.log(meetingErrorMsg.FAIL_RETRANSLATION, error);
      }
    }
  };
  if (!isOpen) return null;
  return (
    <Box display={isOpen ? 'block' : 'none'}>
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(0, 0, 0, 0.5)"
        zIndex="1000"
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
            fontSize="18px"
            fontWeight="bold"
            color="gray.500"
            _hover={{ color: 'gray.700' }}
            onClick={clickToCloseLanguageSelector}
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
                bg={selectedLanguage === language.value ? 'gray.100' : 'transparent'}
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
    </Box>
  );
}

export default TranslationLanguageSelector;
