import React from 'react';
import { Box } from '@chakra-ui/react';
import BackgroundCircleGenerator from '../../background-circle/back-ground-circle-genrator';
import SubScreen from './multilingual-sub-screen/multilingual-sub-screen';
import FlyingLogo from './flying-logo/logo';
import TranslateIcon from '@mui/icons-material/Translate';
import GraphicEqSharpIcon from '@mui/icons-material/GraphicEqSharp';
function MultilingualUi() {
  return (
    <Box
      p={6}
      bg="#25292C"
      borderRadius="4xl"
      w={{ base: '75vw', md: '45vw' }}
      h={{ base: '45vw', md: '25vw' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      className="meeting-screen-simulation"
      overflow="visible"
      position="relative"
    >
      <FlyingLogo
        width={{ base: '8vw', md: '4vw' }}
        height={{ base: '8vw', md: '4vw' }}
        top={{ base: '25vw', md: '15vw' }}
        left={{ base: '10vw', md: '7vw' }}
        backgroundColor="#046ffb"
        logo={<TranslateIcon fontSize="large" style={{ color: 'white' }} />}
      />
      <FlyingLogo
        width={{ base: '8vw', md: '4vw' }}
        height={{ base: '8vw', md: '4vw' }}
        top={{ base: '15vw', md: '8vw' }}
        right={{ base: '10vw', md: '8vw' }}
        backgroundColor="#046ffb"
        logo={<GraphicEqSharpIcon fontSize="large" style={{ color: 'white' }} />}
      />
      <FlyingLogo
        width={{ base: '6vw', md: '3vw' }}
        height={{ base: '6vw', md: '3vw' }}
        top={{ base: '10vw', md: '4vw' }}
        left={{ base: '8vw', md: '5vw' }}
        image="/image/japan_pro.jpg"
      />
      <BackgroundCircleGenerator />
      <SubScreen />
    </Box>
  );
}

export default MultilingualUi;
