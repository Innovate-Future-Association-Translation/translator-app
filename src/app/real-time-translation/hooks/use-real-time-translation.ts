'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useUserStore } from '@/store/userStore';
//import { useTranslationLanguage, TRANSLATION_LANGUAGES } from '@/hooks/useTranslationLanguage';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import socket from '@/lib/socket';
import supportLanguagesList from '@/lib/support-language-list';

// Temporary TRANSLATION_LANGUAGES constant definition
const TRANSLATION_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  // TODO: add more languages
];

const SPEECH_KEY = process.env.NEXT_PUBLIC_SPEECH_KEY;
const SPEECH_REGION = process.env.NEXT_PUBLIC_SPEECH_REGION;

export interface TranslationBubbleData {
  id: string;
  original: string;
  translated: string;
  timestamp: number;
  isRecognizing?: boolean;
  recognizingText?: string;
  translationStatus: 'pending' | 'translating' | 'completed' | 'failed';
}

interface TranslationRequest {
  id: string;
  text: string;
  language: string;
  timestamp: number;
  retryCount: number;
}

interface TranslationResponse {
  translatedText: string;
}

export const useRealTimeTranslation = () => {
  const [isListening, setIsListening] = useState(false);
  const [translations, setTranslations] = useState<TranslationBubbleData[]>([]);
  const [recognizingText, setRecognizingText] = useState<string | null>(null);
  const [speechRecognizer, setSpeechRecognizer] = useState<sdk.SpeechRecognizer | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isRetranslating, setIsRetranslating] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const [translationQueue, setTranslationQueue] = useState<TranslationRequest[]>([]);
  const translationQueueRef = useRef<TranslationRequest[]>([]);

  const user = useUserStore((state) => state.user);
  // const setUserLanguageInStore = useUserStore((state) => state.setUserLanguage);
  const isListeningRef = useRef(isListening);

  // const { selectedLanguage, updateLanguage } = useTranslationLanguage(
  //   userLanguageFromStore || 'en'
  // );

  // useEffect(() => {
  //   if (userLanguageFromStore) {
  //     const isSupported = TRANSLATION_LANGUAGES.some(lang => lang.value === userLanguageFromStore);
  //     if (isSupported) {
  //       updateLanguage(userLanguageFromStore);
  //     }
  //   }
  // }, [userLanguageFromStore, updateLanguage]);

  useEffect(() => {
    translationQueueRef.current = translationQueue;
  }, [translationQueue]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  const generateUniqueId = useCallback(() => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const handleRecognizing = useCallback(
    (text: string) => {
      if (!user) return;
      setIsRecognizing(true);
      setRecognizingText(text);
    },
    [user]
  );

  const handleRecognizedWithQueue = useCallback(
    (text: string) => {
      if (!user || !text.trim()) return;

      setIsRecognizing(false);
      setRecognizingText(null);

      const newId = generateUniqueId();

      const newBubble: TranslationBubbleData = {
        id: newId,
        original: text,
        translated: '',
        timestamp: Date.now(),
        translationStatus: 'pending',
      };

      setTranslations((prev) => [...prev, newBubble].slice(-20));

      const translationRequest: TranslationRequest = {
        id: newId,
        text,
        language: selectedLanguage,
        timestamp: Date.now(),
        retryCount: 0,
      };

      setTranslationQueue((prev) => [...prev, translationRequest]);

      setTranslations((prev) =>
        prev.map((bubble) =>
          bubble.id === newId ? { ...bubble, translationStatus: 'translating' } : bubble
        )
      );

      const requestData = {
        text,
        myPreferLanguage: selectedLanguage,
        requestId: newId,
      };

      socket.emit('request-translate-for-me', requestData);
    },
    [user, selectedLanguage, generateUniqueId]
  );

  const handleRecognized = handleRecognizedWithQueue;

  const initializeSpeechRecognizer = useCallback(() => {
    if (!SPEECH_KEY || !SPEECH_REGION) {
      return;
    }

    try {
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
          handleRecognized(e.result.text);
        }
      };

      recognizer.recognizing = (s, e) => {
        handleRecognizing(e.result.text);
      };

      recognizer.canceled = (s, e) => {
        if (e.reason === sdk.CancellationReason.Error) {
        }
        setIsListening(false);
        setIsRecognizing(false);
        setRecognizingText(null);
      };

      setSpeechRecognizer(recognizer);
    } catch {}
  }, [handleRecognized, handleRecognizing]);

  useEffect(() => {
    if (user && !speechRecognizer) {
      initializeSpeechRecognizer();
    }
  }, [user, speechRecognizer, initializeSpeechRecognizer]);

  const handleTranslationResultWithQueue = useCallback((data: TranslationResponse) => {
    if (!data || typeof data !== 'object' || typeof data.translatedText !== 'string') {
      setTranslationQueue((currentQueue) => {
        if (currentQueue.length > 0) {
          const [firstRequest, ...remainingQueue] = currentQueue;
          setTranslations((prev) =>
            prev.map((bubble) =>
              bubble.id === firstRequest.id
                ? { ...bubble, translationStatus: 'failed', translated: 'Translation failed' }
                : bubble
            )
          );
          return remainingQueue;
        }
        return currentQueue;
      });
      return;
    }

    const translatedText = data.translatedText;

    setTranslationQueue((currentQueue) => {
      if (currentQueue.length === 0) {
        setTranslations((prev) => {
          const lastTranslatingBubbleIndex = prev
            .slice()
            .reverse()
            .findIndex((b) => b.translationStatus === 'translating' && !b.translated);
          if (lastTranslatingBubbleIndex !== -1) {
            const actualIndex = prev.length - 1 - lastTranslatingBubbleIndex;
            const newTranslations = [...prev];
            newTranslations[actualIndex] = {
              ...newTranslations[actualIndex],
              translated: translatedText,
              translationStatus: 'completed',
            };
            return newTranslations;
          }
          return prev;
        });
        return currentQueue;
      }

      const [firstRequest, ...remainingQueue] = currentQueue;

      setTranslations((prev) =>
        prev.map((bubble) =>
          bubble.id === firstRequest.id
            ? {
                ...bubble,
                translated: translatedText,
                translationStatus: 'completed',
              }
            : bubble
        )
      );

      return remainingQueue;
    });
  }, []);

  useEffect(() => {
    const TIMEOUT_MS = 10000;
    const intervalId = setInterval(() => {
      const now = Date.now();

      let changedInTimeoutCheck = false;
      const newQueue = translationQueueRef.current.filter((req) => {
        if (now - req.timestamp > TIMEOUT_MS) {
          setTranslations((prev) =>
            prev.map((bubble) =>
              bubble.id === req.id && bubble.translationStatus === 'translating'
                ? { ...bubble, translationStatus: 'failed', translated: 'Translation timeout' }
                : bubble
            )
          );
          changedInTimeoutCheck = true;
          return false;
        }
        return true;
      });

      if (changedInTimeoutCheck) {
        setTranslationQueue(newQueue);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    socket.on('connect', () => {});

    socket.on('disconnect', () => {});

    socket.on('personal-translation-result', handleTranslationResultWithQueue);

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('personal-translation-result', handleTranslationResultWithQueue);
    };
  }, [handleTranslationResultWithQueue]);

  const retranslateHistoryMessages = useCallback(
    (newLanguageCode: string) => {
      if (translations.length === 0) {
        return;
      }

      setIsRetranslating(true);

      const updatedTranslations = translations.map((t) => ({
        ...t,
        translated: '',
        translationStatus: 'pending' as const,
      }));
      setTranslations(updatedTranslations);

      const newQueueRequests: TranslationRequest[] = [];

      updatedTranslations.forEach((translation, index) => {
        const request: TranslationRequest = {
          id: translation.id,
          text: translation.original,
          language: newLanguageCode,
          timestamp: Date.now() + index * 100,
          retryCount: 0,
        };
        newQueueRequests.push(request);

        setTimeout(() => {
          setTranslations((prev) =>
            prev.map((b) =>
              b.id === translation.id ? { ...b, translationStatus: 'translating' } : b
            )
          );
          const requestData = {
            text: translation.original,
            myPreferLanguage: newLanguageCode,
            requestId: translation.id,
          };
          socket.emit('request-translate-for-me', requestData);

          if (index === translations.length - 1) {
            setTimeout(() => {
              setIsRetranslating(false);
            }, 1000);
          }
        }, index * 150);
      });

      setTranslationQueue((prevQueue) => [...prevQueue, ...newQueueRequests]);
    },
    [translations]
  );

  const retryFailedTranslations = useCallback(() => {
    const failedTranslations = translations.filter(
      (bubble) => bubble.translationStatus === 'failed'
    );

    if (failedTranslations.length === 0) {
      return;
    }

    const newQueueRequests: TranslationRequest[] = [];
    failedTranslations.forEach((bubble) => {
      const request: TranslationRequest = {
        id: bubble.id,
        text: bubble.original,
        language: selectedLanguage,
        timestamp: Date.now(),
        retryCount:
          (translationQueueRef.current.find((q) => q.id === bubble.id)?.retryCount || 0) + 1,
      };
      newQueueRequests.push(request);

      setTranslations((prev) =>
        prev.map((b) =>
          b.id === bubble.id ? { ...b, translationStatus: 'translating', translated: '' } : b
        )
      );

      const requestData = {
        text: bubble.original,
        myPreferLanguage: selectedLanguage,
        requestId: bubble.id,
      };
      socket.emit('request-translate-for-me', requestData);
    });

    setTranslationQueue((prevQueue) => [...prevQueue, ...newQueueRequests]);
  }, [translations, selectedLanguage]);

  const toggleMicrophone = useCallback(() => {
    if (!speechRecognizer) {
      return;
    }

    setIsListening((prev) => {
      const newState = !prev;

      if (newState) {
        speechRecognizer.startContinuousRecognitionAsync(
          () => {
            // Successfully started
          },
          () => {
            setIsListening(false);
          }
        );
      } else {
        speechRecognizer.stopContinuousRecognitionAsync(
          () => {
            setIsRecognizing(false);
            setRecognizingText(null);
          },
          () => {
            // Error stopping, not handled
          }
        );
      }

      return newState;
    });
  }, [speechRecognizer]);

  const stopListening = useCallback(() => {
    if (speechRecognizer && isListening) {
      speechRecognizer.stopContinuousRecognitionAsync(() => {
        setIsListening(false);
        setIsRecognizing(false);
        setRecognizingText(null);
      });
    }
  }, [speechRecognizer, isListening]);

  const clearTranslations = useCallback(() => {
    setTranslations([]);
    setTranslationQueue([]);
    setRecognizingText(null);
    setIsRecognizing(false);
  }, []);

  const handleLanguageChange = useCallback(
    (languageCode: string) => {
      setSelectedLanguage(languageCode);
      retranslateHistoryMessages(languageCode);
    },
    [retranslateHistoryMessages]
  );

  useEffect(() => {
    return () => {
      if (speechRecognizer) {
        speechRecognizer.close();
      }
    };
  }, [speechRecognizer]);

  return {
    isListening,
    translations,
    userLanguage: selectedLanguage,
    recognizingText,
    isRecognizing,
    isRetranslating,
    toggleMicrophone,
    stopListening,
    clearTranslations,
    handleLanguageChange,
    availableLanguages: TRANSLATION_LANGUAGES,
    selectedLanguage,
    translationQueueSize: translationQueue.length,
    retryFailedTranslations,
  };
};
