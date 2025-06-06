'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/module/dashboard/sidebar';
import MobileHeader from '@/app/real-time-translation/components/mobile-header';
import TranslationArea from '@/app/real-time-translation/components/translation-area';
import BottomNavBar from '@/app/real-time-translation/components/bottom-nav-bar';
import LanguageSelector from '@/app/module/instant-meeting-room/language-selector';
import { useUserStore } from '@/store/userStore';
import { useMeetingStore } from '@/store/meetingStore';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import socket from '@/lib/socket';
import { createInstantMeeting } from '@/lib/api';
import supportLanguagesList from '@/lib/support-language-list';

const SPEECH_KEY = process.env.NEXT_PUBLIC_SPEECH_KEY;
const SPEECH_REGION = process.env.NEXT_PUBLIC_SPEECH_REGION;

export interface TranslationBubbleData {
  id: string;
  original: string;
  translated: string;
  timestamp: number;
}

const RealTimeTranslationPage = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const meeting = useMeetingStore((state) => state.meeting);
  const setMeeting = useMeetingStore((state) => state.setMeeting);

  const [isListening, setIsListening] = useState(false);
  const [recognizedTexts, setRecognizedTexts] = useState<string[]>([]);
  const [personalizedTranslations, setPersonalizedTranslations] = useState<string[]>([]);
  const [timestamps, setTimestamps] = useState<number[]>([]);
  const [recognizingText, setRecognizingText] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isRetranslating, setIsRetranslating] = useState(false);
  const speechRecognizerRef = useRef<sdk.SpeechRecognizer | null>(null);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [reselectLanguage, setReselectLanguage] = useState<string | null>(null);

  const effectiveLanguage = reselectLanguage ?? user?.language;

  useEffect(() => {
    if (user && !meeting?.roomId) {
      const createMeeting = async () => {
        try {
          const meetingData = await createInstantMeeting(user.id);
          setMeeting({
            roomId: meetingData.roomId,
            meetingURL: `${window.location.origin}/instant-meeting-room/${meetingData.roomId}`,
          });
          socket.emit('join-room', {
            roomId: meetingData.roomId,
            userInitialStatusData: { userId: user.id, userName: user.name },
          });
        } catch (error) {
          console.error('Failed to create instant meeting:', error);
        }
      };
      createMeeting();
    }
  }, [user, meeting?.roomId, setMeeting]);

  const handleRecognized = useCallback(
    (text: string) => {
      setIsRecognizing(false);
      setRecognizingText(null);

      if (!text || !user || !meeting?.roomId) return;

      socket.emit('speech-text', {
        roomId: meeting.roomId,
        text,
        user: { name: user.name, speakingUserId: user.id, preferLanguage: user.language },
      });

      setRecognizedTexts((prev) => [...prev, text]);
      setPersonalizedTranslations((prev) => [...prev, '...']);
      setTimestamps((prev) => [...prev, Date.now()]);

      socket.emit('request-translate-for-me', {
        text,
        myPreferLanguage: effectiveLanguage,
      });
    },
    [user, meeting?.roomId, effectiveLanguage]
  );

  const handleRecognizing = useCallback((text: string) => {
    setIsRecognizing(true);
    setRecognizingText(text);
  }, []);

  const handleRecognizedRef = useRef(handleRecognized);
  handleRecognizedRef.current = handleRecognized;

  const handleRecognizingRef = useRef(handleRecognizing);
  handleRecognizingRef.current = handleRecognizing;

  const initializeSpeechRecognizer = useCallback(() => {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      SPEECH_KEY as string,
      SPEECH_REGION as string
    );
    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    const autoDetectSourceLanguageConfig =
      sdk.AutoDetectSourceLanguageConfig.fromLanguages(supportLanguagesList);
    const recognizer = sdk.SpeechRecognizer.FromConfig(
      speechConfig,
      autoDetectSourceLanguageConfig,
      audioConfig
    );

    recognizer.recognized = (s, e) => {
      if (e.result.reason === sdk.ResultReason.RecognizedSpeech) {
        handleRecognizedRef.current(e.result.text);
      }
    };

    recognizer.recognizing = (s, e) => {
      handleRecognizingRef.current(e.result.text);
    };

    speechRecognizerRef.current = recognizer;
  }, []);

  useEffect(() => {
    initializeSpeechRecognizer();

    return () => {
      speechRecognizerRef.current?.close();
    };
  }, [initializeSpeechRecognizer]);

  useEffect(() => {
    const handleTranslationResult = (data: { translatedText: string }) => {
      if (isRetranslating) return;
      setPersonalizedTranslations((prev) => {
        const newTranslations = [...prev];
        const lastBubbleIndex = newTranslations.lastIndexOf('...');

        if (lastBubbleIndex !== -1) {
          newTranslations[lastBubbleIndex] = data.translatedText;
          return newTranslations;
        }
        return prev;
      });
    };

    socket.on('personal-translation-result', handleTranslationResult);

    return () => {
      socket.off('personal-translation-result', handleTranslationResult);
    };
  }, [isRetranslating]);

  const toggleMicrophone = () => {
    const newListeningState = !isListening;
    setIsListening(newListeningState);

    if (newListeningState) {
      speechRecognizerRef.current?.startContinuousRecognitionAsync();
    } else {
      speechRecognizerRef.current?.stopContinuousRecognitionAsync();
      setIsRecognizing(false);
      setRecognizingText(null);
    }
  };

  const stopListening = () => {
    if (isListening) {
      speechRecognizerRef.current?.stopContinuousRecognitionAsync();
      setIsListening(false);
      setIsRecognizing(false);
      setRecognizingText(null);
    }
  };

  const handleLanguageSelect = (languageCode: string) => {
    setIsRetranslating(true);
    setReselectLanguage(languageCode);
  };

  const handleQuit = () => {
    stopListening();
    setMeeting(undefined);
    router.push('/dashboard');
  };

  const handleLanguageSelector = () => {
    setShowLanguageSelector(true);
  };

  const handleCloseLanguageSelector = () => {
    setShowLanguageSelector(false);
  };

  const handleNewPersonalTranslation = (newTranslations: string[]) => {
    const oldTranscriptCount = newTranslations.length;
    const newlyRecognizedTexts = recognizedTexts.slice(oldTranscriptCount);
    const newPlaceholders = Array(newlyRecognizedTexts.length).fill('...');

    setPersonalizedTranslations([...newTranslations, ...newPlaceholders]);
    setIsRetranslating(false);

    newlyRecognizedTexts.forEach((text) => {
      socket.emit('request-translate-for-me', {
        text,
        myPreferLanguage: effectiveLanguage,
      });
    });
  };

  const translationsForRender: TranslationBubbleData[] = recognizedTexts.map((original, index) => ({
    id: `bubble-${index}`,
    original,
    translated: personalizedTranslations[index] || '',
    timestamp: timestamps[index],
  }));

  return (
    <Flex h="100vh" flexDirection="row" w="100%" maxW="100vw" overflow="hidden">
      <Box w="88px" bg="white" boxShadow="md" display={{ base: 'none', md: 'block' }}>
        <Sidebar />
      </Box>

      <Flex
        flex="1"
        direction="column"
        w="100%"
        maxW="100%"
        overflow="hidden"
        position="relative"
        bg={{ base: 'white', md: '#f8f9fa' }}
      >
        <MobileHeader />

        <TranslationArea
          translations={translationsForRender}
          recognizingText={recognizingText}
          isRecognizing={isRecognizing}
        />

        <BottomNavBar
          isListening={isListening}
          onMicClick={toggleMicrophone}
          onAITranslationClick={handleLanguageSelector}
          onQuitClick={handleQuit}
        />

        <LanguageSelector
          isOpen={showLanguageSelector}
          clickToCloseLanguageSelector={handleCloseLanguageSelector}
          resetLanguageTranslationInThisMeeting={handleLanguageSelect}
          setNewPersonalTranslation={handleNewPersonalTranslation}
        />
      </Flex>
    </Flex>
  );
};

export default RealTimeTranslationPage;
