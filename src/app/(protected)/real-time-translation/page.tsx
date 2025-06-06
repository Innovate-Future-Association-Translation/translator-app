'use client';

import React, { useState } from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/module/dashboard/sidebar';
import MobileHeader from '@/app/real-time-translation/components/mobile-header';
import TranslationArea from '@/app/real-time-translation/components/translation-area';
import BottomNavBar from '@/app/real-time-translation/components/bottom-nav-bar';
import TranslationLanguageSelector from '@/app/real-time-translation/components/translation-language-selector';
import { useRealTimeTranslation } from '@/app/real-time-translation/hooks/use-real-time-translation';

const RealTimeTranslationPage = () => {
  const router = useRouter();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const {
    isListening,
    translations,
    recognizingText,
    isRecognizing,
    isRetranslating,
    toggleMicrophone,
    stopListening,
    handleLanguageChange,
    selectedLanguage,
  } = useRealTimeTranslation();

  const sidebarDisplay = useBreakpointValue({ base: 'none', md: 'block' });

  const handleQuit = () => {
    stopListening();
    router.push('/dashboard');
  };

  const handleLanguageSelector = () => {
    setShowLanguageSelector(true);
  };

  const handleCloseLanguageSelector = () => {
    setShowLanguageSelector(false);
  };

  const handleLanguageSelect = (languageCode: string) => {
    handleLanguageChange(languageCode);
  };

  return (
    <Flex h="100vh" flexDirection="row" w="100%" maxW="100vw" overflow="hidden">
      <Box display={sidebarDisplay}>
        <Sidebar />
      </Box>

      <Flex flex="1" direction="column" w="100%" maxW="100%" overflow="hidden" position="relative">
        <MobileHeader />

        <TranslationArea
          translations={translations}
          isListening={isListening}
          userLanguage={selectedLanguage}
          recognizingText={recognizingText}
          isRecognizing={isRecognizing}
          isRetranslating={isRetranslating}
          onMicToggle={toggleMicrophone}
        />

        <BottomNavBar
          isListening={isListening}
          onMicClick={toggleMicrophone}
          onAITranslationClick={handleLanguageSelector}
          onQuitClick={handleQuit}
        />

        <TranslationLanguageSelector
          isOpen={showLanguageSelector}
          onClose={handleCloseLanguageSelector}
          selectedLanguage={selectedLanguage}
          onLanguageSelect={handleLanguageSelect}
        />
      </Flex>
    </Flex>
  );
};

export default RealTimeTranslationPage;
