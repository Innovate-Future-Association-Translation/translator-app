'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Box } from '@chakra-ui/react';
import MainTranslationArea from './main-translation-area/main-translation-area';
import BottomNavBar from './bottom-nav-bar';
import ShareLinkPanel from './share-link-panel/share-link-panel';
import { useUserStore } from '@/store/userStore';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { useMeetingStore } from '@/store/meetingStore';
import socket from '@/lib/socket';
import { getMeetingCreator } from '@/lib/api';
import supportLanguagesList from '@/lib/support-language-list';
import DeskTopHeading from './heading/desktop-heading';
import MobileHeading from './heading/mobile-heading';
import AddUserNavBarInMobile from './add-user-navbar-mobile';
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

function MeetingRoom() {
  const [showBarCodeAndLink, setShowBarCodeAndLink] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState<string[]>([]);
  const [recognizedTextUserList, setRecognizedTextUserList] = useState<string[]>([]);
  const [recognizingText, setRecognizingText] = useState<string | null>(null);
  const [speechRecognizer, setSpeechRecognizer] = useState<sdk.SpeechRecognizer | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isRaiseHand, setIsRaiseHand] = useState<boolean>(false);
  const [myPersonalizedTranslation, setMyPersonalizedTranslation] = useState<string[]>([]);
  const [usersStatusList, setUserStatusList] = useState<userStatus[]>([]);
  const [openParticipantsPanel, setOpenParticipantsPanel] = useState<boolean>(true);
  const [openParticipantPanelFullScreen, setOpenParticipantPanelFullScreen] =
    useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const meeting = useMeetingStore((state) => state.meeting);
  const localPreferenceLanguage = user?.language;
  const setMeetingParticipants = useMeetingStore((state) => state.setMeetingParticipants);

  //used to handle IT-44 default open shareLinkPanel and other user close panel
  useEffect(() => {
    const fetchCreatorId = async () => {
      if (meeting?.roomId) {
        const creatorId = await getMeetingCreator(meeting.roomId);
        if (creatorId === user?.id) {
          setShowBarCodeAndLink(true);
        } else {
          setShowBarCodeAndLink(false);
        }
      }
    };
    fetchCreatorId();
  }, [meeting?.roomId]);

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
    socket.on('sync-room-participants-number', (participantsNumber: number) => {
      setMeetingParticipants(participantsNumber);
    });

    return () => {
      socket.off('broadcast-current-room-status');
      socket.off('broadcast-user-join-initial-status');
      socket.off('sync-room-status-list');
      socket.off('sync-room-participants-number');
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

      if (localPreferenceLanguage) {
        socket.emit('request-translate-for-me', {
          text,
          myPreferLanguage: localPreferenceLanguage,
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
  }, [localPreferenceLanguage]);

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

  const toggleUserPanel = () => {
    setOpenParticipantsPanel((prev) => !prev);
  };

  const toggleFullScreenUserPanel = () => {
    setOpenParticipantPanelFullScreen((prev) => !prev);
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
          speechData={{
            userNameList: recognizedTextUserList,
            recognizingText: recognizingText,
            beforeTranslationMessageList: recognizedText,
            isRecognizing: isRecognizing,
            afterTranslation: myPersonalizedTranslation,
            usersStatusList: usersStatusList,
          }}
          openParticipantsPanel={openParticipantsPanel}
          openParticipantPanelFullScreen={openParticipantPanelFullScreen}
          toggleParticipantsListFullScreen={toggleFullScreenUserPanel}
        />
        <BottomNavBar
          clickShare={handleOpenShareLinkPanel}
          clickMic={handleOnListening}
          clickRaiseHand={handleOnRaiseHand}
          toggleUserPanel={toggleUserPanel}
          isListening={isListening}
          isRaiseHand={isRaiseHand}
          openParticipantsPanel={openParticipantsPanel}
          toggleFullScreenUserPanel={toggleFullScreenUserPanel}
          isHidden={openParticipantPanelFullScreen}
        />
        <AddUserNavBarInMobile isHidden={!openParticipantPanelFullScreen} />
        {showBarCodeAndLink && <ShareLinkPanel closeThePanel={handleCloseShareLinkPanel} />}
      </Box>
    </>
  );
}

export default MeetingRoom;
