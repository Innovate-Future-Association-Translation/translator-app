'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import MainTranslationArea from './main-translation-area/main-translation-area';
import BottomNavBar from './bottom-nav-bar';
import ShareLinkPanel from './share-link-panel/share-link-panel';
import TranslationLanguageSelector from './translation-language-selector';
import { useUserStore } from '@/store/userStore';
import { useMeetingStore } from '@/store/meetingStore';
import { useTranslationLanguage } from '@/hooks/useTranslationLanguage';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import socket from '@/lib/socket';
import supportLanguagesList from '@/lib/support-language-list';
import DeskTopHeading from './heading/desktop-heading';
import MobileHeading from './heading/mobile-heading';

const SPEECH_KEY = process.env.NEXT_PUBLIC_SPEECH_KEY;
const SPEECH_REGION = process.env.NEXT_PUBLIC_SPEECH_REGION;

interface userInfoFromServer {
  name: string;
  preferLanguage: string;
  speakingUserId: string;
}

interface userStatus {
  userName: string;
  userId: string;
  speaking: boolean;
  isRaiseHand: boolean;
  isRecognizing?: boolean;
  recognizingText?: string | null;
}

//Add: Message with translation association data structure
interface MessageWithTranslation {
  id: string;
  originalText: string;
  userName: string;
  timestamp: Date;
  translatedText?: string;
  targetLanguage?: string;
}

function MeetingRoom() {
  const [showBarCodeAndLink, setShowBarCodeAndLink] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  //Old state to be replaced
  const [recognizedText, setRecognizedText] = useState<string[]>([]);
  const [recognizedTextUserList, setRecognizedTextUserList] = useState<string[]>([]);
  const [myPersonalizedTranslation, setMyPersonalizedTranslation] = useState<string[]>([]);

  //New: Unified message storage structure
  const [messagesWithTranslations] = useState<MessageWithTranslation[]>([]);
  const [isRetranslating, setIsRetranslating] = useState(false);

  const [recognizingText, setRecognizingText] = useState<string | null>(null);
  const [speechRecognizer, setSpeechRecognizer] = useState<sdk.SpeechRecognizer | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isRaiseHand, setIsRaiseHand] = useState<boolean>(false);
  const [usersStatusList, setUserStatusList] = useState<userStatus[]>([]);

  const user = useUserStore((state) => state.user);
  const meeting = useMeetingStore((state) => state.meeting);
  const localPreferenceLanguage = user?.language;

  // Translation language hook
  const { selectedLanguage, updateLanguage } = useTranslationLanguage(
    localPreferenceLanguage || 'en'
  );

  // Function to retranslate all history messages
  const retranslateHistoryMessages = useCallback(
    (newLanguageCode: string) => {
      if (recognizedText.length === 0) {
        return;
      }

      setIsRetranslating(true);

      // Clear current translations
      setMyPersonalizedTranslation([]);

      // Request retranslation for each historical message
      recognizedText.forEach((text, index) => {
        setTimeout(() => {
          socket.emit('request-translate-for-me', {
            text,
            myPreferLanguage: newLanguageCode,
          });

          // Mark retranslation as complete after the last message
          if (index === recognizedText.length - 1) {
            setTimeout(() => {
              setIsRetranslating(false);
            }, 1000); // Give some time for translations to come back
          }
        }, index * 100); // Stagger requests to avoid overwhelming the server
      });
    },
    [recognizedText]
  );

  const handleRecognizing = useCallback(
    (text: string) => {
      if (!user) return;
      setIsRecognizing(true);
      setRecognizingText(text);

      socket.emit('update-user-status', {
        roomId: meeting?.roomId,
        userId: user.id,
        isRecognizing: true,
        recognizingText: text,
      });
    },
    [user, meeting?.roomId]
  );

  const handleRecognized = useCallback(
    (text: string) => {
      if (!user) return;
      setIsRecognizing(false);
      setRecognizingText(null);
      socket.emit('update-user-status', {
        roomId: meeting?.roomId,
        userId: user.id,
        isRecognizing: false,
        recognizingText: text,
      });

      socket.emit('speech-text', {
        roomId: meeting?.roomId,
        text,
        user: { name: user.name, speakingUserId: user.id, preferLanguage: user.language },
      });
    },
    [user, meeting?.roomId]
  );

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
        handleRecognized(e.result.text);
      }
    };
    recognizer.recognizing = (s, e) => {
      handleRecognizing(e.result.text);
    };
    setSpeechRecognizer(recognizer);
  }, [handleRecognized, handleRecognizing]);

  useEffect(() => {
    if (user && meeting?.roomId && !speechRecognizer) {
      initializeSpeechRecognizer();
    }
  }, [user, meeting?.roomId, speechRecognizer, initializeSpeechRecognizer]);

  useEffect(() => {
    socket.on('connect', () => {});
    return () => {
      socket.off('connect');
    };
  }, []);

  useEffect(() => {
    if (!meeting?.roomId || !user) {
      return;
    }

    socket.emit('join-room', {
      roomId: meeting.roomId,
      userInitialStatusData: {
        userName: user.name,
        userId: user.id,
        speaking: false,
        isRaiseHand: false,
        isRecognizing: false,
        recognizingText: null,
      },
    });
    socket.on('broadcast-current-room-status', (userStatusListFromServer: userStatus[]) => {
      setUserStatusList(userStatusListFromServer);
    });

    socket.on('broadcast-user-join-initial-status', (userInitialStatusData: userStatus) => {
      setUserStatusList((prev) => [...prev, userInitialStatusData]);
    });

    socket.on('sync-room-status-list', (userStatusListFromServer: userStatus[]) => {
      setUserStatusList(userStatusListFromServer);
    });

    return () => {
      socket.off('broadcast-current-room-status');
      socket.off('broadcast-user-join-initial-status');
      socket.off('sync-room-status-list');
    };
  }, [meeting?.roomId, user]);

  useEffect(() => {
    const handleSpeechBroadcast = (data: {
      text: string;
      user: userInfoFromServer;
      speakingUserId: string;
    }) => {
      const { text, user: emittingUser } = data;
      setRecognizedText((prev) => [...prev, text]);
      setRecognizedTextUserList((prev) => [...prev, emittingUser.name]);

      // Use selectedLanguage instead of localPreferenceLanguage for translation requests
      if (selectedLanguage) {
        socket.emit('request-translate-for-me', {
          text,
          myPreferLanguage: selectedLanguage,
        });
      }
    };

    const handleJoinRoomBroadcast = (userInitialStatusData: userStatus) => {
      setUserStatusList((prev) => [...prev, userInitialStatusData]);
    };

    const handleUserStatusBroadcast = (updatedStatus: userStatus) => {
      setUserStatusList((prevList) =>
        prevList.map((u) => (u.userId === updatedStatus.userId ? { ...u, ...updatedStatus } : u))
      );
    };

    const handleTranslationForMe = (data: { translatedText: string }) => {
      setMyPersonalizedTranslation((prev) => [...prev, data.translatedText]);
    };

    socket.on('broadcast-text', handleSpeechBroadcast);
    socket.on('broadcast-user-join-initial-status', handleJoinRoomBroadcast);
    socket.on('broadcast-user-status', handleUserStatusBroadcast);
    socket.on('personal-translation-result', handleTranslationForMe);

    return () => {
      socket.off('broadcast-text', handleSpeechBroadcast);
      socket.off('broadcast-user-join-initial-status', handleJoinRoomBroadcast);
      socket.off('broadcast-user-status', handleUserStatusBroadcast);
      socket.off('personal-translation-result', handleTranslationForMe);
    };
  }, [selectedLanguage]);

  const handleOnRaiseHand = () => {
    if (!user) return;
    const newRaiseHandState = !isRaiseHand;
    setIsRaiseHand(newRaiseHandState);
    socket.emit('update-user-status', {
      roomId: meeting?.roomId,
      userId: user.id,
      isRaiseHand: newRaiseHandState,
    });
  };

  const handleOnListening = () => {
    if (!user) return;
    const newListeningState = !isListening;
    setIsListening(newListeningState);

    socket.emit('update-user-status', {
      roomId: meeting?.roomId,
      userId: user.id,
      speaking: newListeningState,
    });

    if (newListeningState) {
      speechRecognizer?.startContinuousRecognitionAsync(() => {});
    } else {
      speechRecognizer?.stopContinuousRecognitionAsync(() => {});
    }
  };

  const handleCloseShareLinkPanel = () => {
    setShowBarCodeAndLink(false);
  };

  const handleOpenShareLinkPanel = () => {
    setShowBarCodeAndLink(true);
  };

  // Translation language selector handlers
  const handleOpenLanguageSelector = () => {
    setShowLanguageSelector(true);
  };

  const handleCloseLanguageSelector = () => {
    setShowLanguageSelector(false);
  };

  const handleLanguageSelect = (languageCode: string) => {
    updateLanguage(languageCode);

    // Note: Language preference is managed locally with localStorage
    // No need to sync with server as translation is client-side

    // Trigger history message retranslation
    retranslateHistoryMessages(languageCode);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={{ base: '16px', md: '2vw' }}
        position="relative"
        w="100%"
        maxW="100vw"
        overflow="hidden"
      >
        <Box
          w="100%"
          px={{ base: '16px', md: '2vw' }}
          display={{ base: 'none', md: 'flex' }}
          justifyContent="flex-start"
        >
          <DeskTopHeading />
        </Box>
        <Box
          w="100%"
          display={{ base: 'flex', md: 'none' }}
          justifyContent="space-between"
          alignItems="center"
          mt="15px"
          px="16px"
        >
          <MobileHeading />
        </Box>
        <MainTranslationArea
          messagesWithTranslations={messagesWithTranslations}
          userNameList={recognizedTextUserList}
          recognizingText={recognizingText}
          beforeTranslationMessageList={recognizedText}
          isRecognizing={isRecognizing}
          afterTranslation={myPersonalizedTranslation}
          usersStatusList={usersStatusList}
          isRetranslating={isRetranslating}
        />
        <BottomNavBar
          clickShare={handleOpenShareLinkPanel}
          clickMic={handleOnListening}
          clickAItranslation={handleOpenLanguageSelector}
          clickRaiseHand={handleOnRaiseHand}
          isListening={isListening}
          isRaiseHand={isRaiseHand}
        />
        {showBarCodeAndLink && <ShareLinkPanel closeThePanel={handleCloseShareLinkPanel} />}
        <TranslationLanguageSelector
          isOpen={showLanguageSelector}
          onClose={handleCloseLanguageSelector}
          selectedLanguage={selectedLanguage}
          onLanguageSelect={handleLanguageSelect}
        />
      </Box>
    </>
  );
}

export default MeetingRoom;
