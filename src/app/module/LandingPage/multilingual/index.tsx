import { Flex, Box } from '@chakra-ui/react';
import DescriptionGenerator from '../meeting-and-classroom-description-generator/meeting-and-classroom-description-generator';
import MultilingualUi from '../multilingual/multilingual-new-screen/multilingual-new-screen';
import React from 'react';
const featureList = {
  title: 'Multilingual Multilingual Classroom',
  description:
    'IFA Translator automatically translates their speech, displaying each participant’s native language version on their device—no more struggling to understand foreign languages!',
  keyPointArray: [
    'Real-time Subtitle Translation',
    'Smart Speaker Recognition',
    'Seamless Language Switching',
  ],
};

function Multilingual() {
  return (
    <Flex
      mt={{ base: '24px', md: '120px' }}
      mr={{ base: '0', md: '20px' }}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <DescriptionGenerator {...featureList} />
      <Box position="relative">
        <MultilingualUi />
      </Box>
    </Flex>
  );
}

export default Multilingual;
