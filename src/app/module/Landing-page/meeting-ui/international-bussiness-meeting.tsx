'use client';
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

import MeetingScreen from './international-business-meeting-screen';
import DescriptionGenerator from '../meeting-and-classroom-description-generator/meeting-and-classroom-description-generator';

const featureList = {
  title: 'International Business Meeting',
  description:
    'IFA Translator ensures that all participants can instantly read subtitles in their native language, making the meeting more efficient!',
  keyPointArray: [
    'Real-time Subtitle Translation',
    'One-Click Language Switching',
    'Saved Translated Content',
  ],
};

function MeetingUI() {
  return (
    <Flex
      mt={{ base: '20px', md: 40 }}
      gap={{ base: '10vw', md: '5vw' }}
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems="center"
      justifyContent="center"
    >
      <Box order={{ base: 2, md: 1 }}>
        <MeetingScreen />
      </Box>
      <Box order={{ base: 1, md: 2 }}>
        <DescriptionGenerator {...featureList} />
      </Box>
    </Flex>
  );
}

export default MeetingUI;
