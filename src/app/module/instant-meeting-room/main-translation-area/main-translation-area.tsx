'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import ParticipantList from './participant-list/participants-list';
import AllParticipantList from '../main-translation-area/show-all-participant-list/show-all-participants';
import ChatBubble from './chat-bubble/chat-bubble';
import RecognizingBubble from './chat-bubble/user-recognizing-bubble';
import AddUserBtnInParticipantListDesktop from '../add-user-btn-and-participant-box-desktop';

interface userStatus {
  userName: string;
  userId: string;
  speaking: boolean;
  isRaiseHand: boolean;
  isRecognizing?: boolean;
  recognizingText?: string | null;
}

interface speechData {
  userNameList: string[];
  recognizingText?: string | null;
  beforeTranslationMessageList?: string[];
  afterTranslation?: string[];
  isRecognizing?: boolean;
  currentRecognizingUserId?: boolean;
  usersStatusList?: userStatus[];
}
interface Props {
  speechData: speechData;
  openParticipantsPanel: boolean;
  openParticipantPanelFullScreen: boolean;
  toggleParticipantsListFullScreen?: () => void;
}

function MainTranslationArea({
  speechData,
  openParticipantsPanel,
  openParticipantPanelFullScreen,
  toggleParticipantsListFullScreen,
}: Props) {
  const {
    beforeTranslationMessageList = [],
    afterTranslation = [],
    userNameList,
    usersStatusList,
  } = speechData;
  const [messages, setMessages] = useState<string[]>([]);
  const [translatedMessage, setTranslatedMessage] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (beforeTranslationMessageList.length > 0) {
      const newMessages = [...beforeTranslationMessageList];
      setMessages(newMessages);
    }
  }, [beforeTranslationMessageList]);

  useEffect(() => {
    console.log('after translation:', afterTranslation);
    if (afterTranslation.length > 0) {
      const newTranslatedMessages = [...afterTranslation];

      setTranslatedMessage(newTranslatedMessages);
    }
  }, [afterTranslation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, translatedMessage, usersStatusList]);

  return (
    <>
      <Box
        bgColor="white"
        w={{ base: '100%', md: '85vw' }}
        h={{ base: '74vh', md: '74vh' }}
        borderRadius="20px"
        display={openParticipantPanelFullScreen ? 'none' : 'flex'}
        flexDir={{ base: 'column-reverse', md: 'row' }}
        pt={{ base: '0px', md: '30px' }}
        maxW={{ base: 'calc(100vw - 32px)', md: '85vw' }}
        mx={{ base: 'auto', md: 'initial' }}
      >
        <Box
          w={openParticipantsPanel ? { base: '100%', md: '83%' } : { base: '100%', md: '100%' }}
          flex={{ base: 1, md: 'none' }}
          minH={{ base: '60vh', md: '100%' }}
          p={{ base: '2px', md: '5px' }}
          borderTopLeftRadius="20px"
          borderBottomLeftRadius="20px"
          overflowY="auto"
        >
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              beforeTranslationMessage={message}
              userName={userNameList[index]}
              afterTranslation={translatedMessage[index]}
            />
          ))}
          {usersStatusList?.map((user) =>
            user.isRecognizing && !!user.recognizingText?.trim() ? (
              <RecognizingBubble
                key={user.userId}
                userName={user.userName}
                recognizingText={user.recognizingText}
              />
            ) : null
          )}
          <Box ref={messagesEndRef} />
        </Box>
        {openParticipantsPanel && (
          <Box w={{ base: '100%', md: '17%' }} maxH={{ base: '40vh', md: '100%' }} overflowY="auto">
            <ParticipantList userStatusList={usersStatusList} />
          </Box>
        )}
      </Box>
      <Box>
        <Box
          bgColor="white"
          w={{ base: '100%', md: '85vw' }}
          h={{ base: '74vh', md: '74vh' }}
          borderRadius="20px"
          display={openParticipantPanelFullScreen ? 'flex' : 'none'}
          flexDir={{ base: 'column-reverse', md: 'row' }}
          pt={{ base: '0px', md: '30px' }}
          maxW={{ base: 'calc(100vw - 32px)', md: '85vw' }}
          mx={{ base: 'auto', md: 'initial' }}
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          {openParticipantPanelFullScreen && (
            <Box
              w={{ base: '90vw', md: '100%' }}
              h={{ base: '74vh', md: '100%' }}
              overflowY="auto"
              position="relative"
            >
              <AllParticipantList
                userStatusList={usersStatusList}
                clickToHideFullParticipantsPanel={toggleParticipantsListFullScreen}
              />
              <Box position="absolute" bottom="10px" right="10px">
                <AddUserBtnInParticipantListDesktop />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}

export default MainTranslationArea;
