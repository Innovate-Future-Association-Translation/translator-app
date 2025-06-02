'use client';
import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import ParticipantList from './participant-list/participants-list';
import ChatBubble from './chat-bubble/chat-bubble';
import RecognizingBubble from './chat-bubble/user-recognizing-bubble';

interface userStatus {
  userName: string;
  userId: string;
  speaking: boolean;
  isRaiseHand: boolean;
  isRecognizing?: boolean;
  recognizingText?: string | null;
}

interface MessageWithTranslation {
  id: string;
  originalText: string;
  userName: string;
  timestamp: Date;
  translatedText?: string;
  targetLanguage?: string;
}

interface speechData {
  messagesWithTranslations?: MessageWithTranslation[];
  isRetranslating?: boolean;
  userNameList?: string[];
  recognizingText?: string | null;
  beforeTranslationMessageList?: string[];
  afterTranslation?: string[];
  isRecognizing?: boolean;
  currentRecognizingUserId?: boolean;
  usersStatusList?: userStatus[];
}

function MainTranslationArea(speechData: speechData) {
  const {
    messagesWithTranslations = [],
    isRetranslating = false,
    beforeTranslationMessageList = [],
    afterTranslation = [],
    userNameList = [],
    usersStatusList,
  } = speechData;
  const [messages, setMessages] = useState<string[]>([]);
  const [translatedMessage, setTranslatedMessage] = useState<string[]>([]);

  useEffect(() => {
    if (beforeTranslationMessageList.length > 0) {
      const newMessages = [...beforeTranslationMessageList];
      setMessages(newMessages);
    }
  }, [beforeTranslationMessageList]);

  useEffect(() => {
    if (afterTranslation.length > 0) {
      const newTranslatedMessages = [...afterTranslation];
      setTranslatedMessage(newTranslatedMessages);
    }
  }, [afterTranslation]);

  return (
    <Box
      bgColor="white"
      w={{ base: '100%', md: '85vw' }}
      h={{ base: '74vh', md: '74vh' }}
      borderRadius="20px"
      display="flex"
      flexDir={{ base: 'column-reverse', md: 'row' }}
      pt={{ base: '20px', md: '30px' }}
      maxW={{ base: 'calc(100vw - 32px)', md: '85vw' }}
      mx={{ base: 'auto', md: 'initial' }}
    >
      <Box
        w={{ base: '100%', md: '83%' }}
        h={{ base: '69%', md: '100%' }}
        p="5px"
        borderRight={{ base: 'none', md: '1px solid #d8d8d8' }}
        borderTopLeftRadius="20px"
        borderBottomLeftRadius="20px"
        overflowY="auto"
      >
        {isRetranslating && (
          <Box textAlign="center" py={2} bg="blue.50" borderRadius="8px" mb={4}>
            <Text fontSize="sm" color="blue.600">
              Retranslating historical messages...
            </Text>
          </Box>
        )}
        {messagesWithTranslations.length > 0
          ? messagesWithTranslations.map((message) => (
              <ChatBubble
                key={message.id}
                beforeTranslationMessage={message.originalText}
                userName={message.userName}
                afterTranslation={message.translatedText}
              />
            ))
          : messages.map((message, index) => (
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
      </Box>

      <Box w={{ base: '100%', md: '17%' }} h={{ base: '41%', md: '100%' }}>
        <ParticipantList userStatusList={usersStatusList} />
      </Box>
    </Box>
  );
}

export default MainTranslationArea;
