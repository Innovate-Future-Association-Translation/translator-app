import React from 'react';
import { Box } from '@chakra-ui/react';
import ParticipantList from './participants-list';

function MainTranslationArea() {
  return (
    <Box
      bgColor="white"
      w={{ base: '100vw', md: '85vw' }}
      h={{ base: '74vh', md: '74vh' }}
      borderRadius="20px"
      display="flex"
      flexDir={{ base: 'column-reverse', md: 'row' }}
    >
      <Box
        w={{ base: '100%', md: '83%' }}
        h={{ base: '69%', md: '100%' }}
        p="5px"
        borderRight={{ base: 'none', md: '1px solid #d8d8d8' }}
        borderTopLeftRadius="20px"
        borderBottomLeftRadius="20px"
      ></Box>
      <Box w={{ base: '100%', md: '17%' }} h={{ base: '41%', md: '100%' }}>
        <ParticipantList />
      </Box>
    </Box>
  );
}

export default MainTranslationArea;
