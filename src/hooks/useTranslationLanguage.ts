import { useState, useEffect } from 'react';

const TRANSLATION_LANGUAGE_KEY = 'translation-language-preference';

export interface TranslationLanguage {
  value: string;
  label: string;
}

export const TRANSLATION_LANGUAGES: TranslationLanguage[] = [
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

export function useTranslationLanguage(defaultLanguage: string = 'en') {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(defaultLanguage);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language preference from localStorage on mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem(TRANSLATION_LANGUAGE_KEY);
      if (savedLanguage && TRANSLATION_LANGUAGES.some((lang) => lang.value === savedLanguage)) {
        setSelectedLanguage(savedLanguage);
      }
    } catch (error) {
      console.warn('Failed to load translation language preference:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save language preference to localStorage whenever it changes
  const updateLanguage = (languageCode: string) => {
    try {
      if (TRANSLATION_LANGUAGES.some((lang) => lang.value === languageCode)) {
        setSelectedLanguage(languageCode);
        localStorage.setItem(TRANSLATION_LANGUAGE_KEY, languageCode);
      } else {
        console.warn('Invalid language code:', languageCode);
      }
    } catch (error) {
      console.error('Failed to save translation language preference:', error);
    }
  };

  // Get language label by code
  const getLanguageLabel = (code: string): string => {
    return TRANSLATION_LANGUAGES.find((lang) => lang.value === code)?.label || code;
  };

  // Get current language object
  const currentLanguage = TRANSLATION_LANGUAGES.find((lang) => lang.value === selectedLanguage);

  return {
    selectedLanguage,
    updateLanguage,
    getLanguageLabel,
    currentLanguage,
    isLoading,
    availableLanguages: TRANSLATION_LANGUAGES,
  };
}
