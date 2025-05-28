'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import MainTranslationArea from './main-translation-area/main-translation-area';
import BottomNavBar from './bottom-nav-bar';
import ShareLinkPanel from './share-link-panel/share-link-panel';
import { useUser } from '@/context/userContext';
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { useMeetingContext } from '@/context/meetingContext';
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
  //usersStatusList used to store all participants in the room and this list will be updated while receive users' status broadcast from the back end
  const [usersStatusList, setUserStatusList] = useState<userStatus[]>([]);
  const { user } = useUser();
  const { meeting } = useMeetingContext();
  const localPreferenceLanguage = user?.language;

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server!');
    });
    return () => {
      socket.off('connect');
      socket.off('translated-text');
    };
  }, []);

  useEffect(() => {
    if (!meeting?.roomId || !user) return;

    socket.emit('join-room', {
      roomId: meeting.roomId,
      // Initial user status when joining the room and emit those local initial state to the backend
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

    console.log('Joined room:', meeting.roomId);
  }, [meeting?.roomId, user]);

  const handleRecognizing = (text: string) => {
    /* when azure ai is recognizing the speech text, set user local recognizing state is true
     and update the local recognizing text state corresponding to the azure ai real-time response ,
     emit those local status update to the backend
     NOTE: here we can not directly use the state and the text we set!! because it is async
     */
    setIsRecognizing(true);
    setRecognizingText(text);

    socket.emit('update-user-status', {
      roomId: meeting?.roomId,
      userId: user?.id,
      isRecognizing: true,
      recognizingText: text,
    });
  };

  const handleRecognized = (text: string) => {
    /* when azure ai has generated the final recognized speech text, set user local recognizing state is false
     and clear the local recognizing text state corresponding to the azure ai real-time response ,
     emit those local user status update to the backend
     */
    setIsRecognizing(false);
    setRecognizingText(null);
    socket.emit('update-user-status', {
      roomId: meeting?.roomId,
      userId: user?.id,
      isRecognizing: false,
      recognizingText: text,
    });

    /* emit the recognized speech text to the backend
     */
    socket.emit('speech-text', {
      roomId: meeting?.roomId,
      text,
      user: { name: user?.name, speakingUserId: user?.id, preferLanguage: user?.language },
    });
  };

  useEffect(() => {
    // Handling speech broadcasting
    const handleSpeechBroadcast = (data: {
      text: string;
      user: userInfoFromServer;
      roomId: string;
      speakingUserId: string;
      //translatedText: string;
    }) => {
      const { text, user, roomId } = data;
      console.log(
        `Message from ${user.name} userId: ${user.speakingUserId} in room ${roomId}: ${text}`
      );
      setRecognizedText((prev) => [...prev, text]);
      setRecognizedTextUserList((prev) => [...prev, user.name]);

      socket.emit('request-translate-for-me', {
        text,
        myPreferLanguage: localPreferenceLanguage,
      });
    };

    /* Handling user initial join status broadcast, if the front end receive user(including the the user him/herself) 
    join-room broadcast(with initial user status)
    update the local userStatus list
    */
    const handleJoinRoomBroadcast = (userInitialStatusData: userStatus) => {
      console.log('Received user initial status broadcast data:', userInitialStatusData);
      setUserStatusList((prev) => [...prev, userInitialStatusData]);
    };

    /*
   if frontend received any user status update broadcast from the backend, update local userStatusList(including raise-hand,speaking and recognizing)
   */
    const handleUserStatusBroadcast = (updatedStatus: userStatus) => {
      setUserStatusList((prevList) =>
        prevList.map((user) =>
          user.userId === updatedStatus.userId ? { ...user, ...updatedStatus } : user
        )
      );
    };

    const handleTranslationForMe = (data: { translatedText: string }) => {
      setMyPersonalizedTranslation((prev) => [...prev, data.translatedText]);
    };

    socket.on('connect', () => {
      console.log('Connected to socket.io server!');
    });

    socket.on('broadcast-text', handleSpeechBroadcast);
    socket.on('broadcast-user-join-initial-status', handleJoinRoomBroadcast);
    socket.on('broadcast-user-status', handleUserStatusBroadcast);
    socket.on('personal-translation-result', handleTranslationForMe);

    return () => {
      socket.off('connect'); //socket io need to turn 'off' once when 'on'and need to return a callback to clean up the effect
      socket.off('broadcast-text', handleSpeechBroadcast);
      socket.off('broadcast-user-join-initial-status', handleJoinRoomBroadcast);
      socket.off('broadcast-user-status', handleUserStatusBroadcast);
      socket.off('personal-translation-result', handleTranslationForMe);
    };
  }, []);

  const initializeSpeechRecognizer = () => {
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
  };

  //handle raise-hand status of user, when user click raise hand button, emit the state of raise hand to the back-end
  const handleOnRaiseHand = () => {
    const newRaiseHandState = !isRaiseHand;
    setIsRaiseHand(newRaiseHandState);
    socket.emit('update-user-status', {
      roomId: meeting?.roomId,
      userId: user?.id,
      isRaiseHand: newRaiseHandState, //here need to use newRaiseHandState instead of local isRaise Hand
    });
  };

  const handleOnListening = () => {
    const newListeningState = !isListening;
    setIsListening(newListeningState);

    socket.emit('update-user-status', {
      roomId: meeting?.roomId,
      userId: user?.id,
      speaking: newListeningState,
    });

    if (newListeningState) {
      speechRecognizer?.startContinuousRecognitionAsync(() => {
        console.log('Started listening.');
      });
    } else {
      speechRecognizer?.stopContinuousRecognitionAsync(() => {
        console.log('Stopped listening.');
      });
    }
  };

  useEffect(() => {
    initializeSpeechRecognizer();
    return () => {
      speechRecognizer?.stopContinuousRecognitionAsync(() => {
        console.log('Speech recognition stopped on unmount.');
      });
    };
  }, []);

  const handleCloseShareLinkPanel = () => {
    setShowBarCodeAndLink(false);
  };

  const handleOpenShareLinkPanel = () => {
    setShowBarCodeAndLink(true);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="2vw"
        position="relative"
      >
        <Box w="100%" px="2vw" display={{ base: 'none', md: 'flex' }} justifyContent="flex-start">
          <DeskTopHeading />
        </Box>
        <Box
          w="100%"
          display={{ base: 'flex', md: 'none' }}
          justifyContent="space-between"
          alignItems="center"
          mt="15px"
        >
          {/*NOTE!: 
         To do need to do handle log out meeting here in this mobile header button*/}
          <MobileHeading />
        </Box>
        <MainTranslationArea
          userNameList={recognizedTextUserList}
          recognizingText={recognizingText}
          beforeTranslationMessageList={recognizedText}
          isRecognizing={isRecognizing}
          afterTranslation={myPersonalizedTranslation}
          usersStatusList={usersStatusList}
        />
        <BottomNavBar
          clickShare={handleOpenShareLinkPanel}
          clickMic={handleOnListening}
          clickRaiseHand={handleOnRaiseHand}
          isListening={isListening}
          isRaiseHand={isRaiseHand}
        />
        {showBarCodeAndLink && <ShareLinkPanel closeThePanel={handleCloseShareLinkPanel} />}
      </Box>
    </>
  );
}

export default MeetingRoom;
