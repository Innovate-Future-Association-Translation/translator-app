import React from 'react';
import { Box } from '@chakra-ui/react';
import BackgroundCircleGenerator from '../background-circle/back-ground-circle-genrator';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import GraphicEqSharpIcon from '@mui/icons-material/GraphicEqSharp';
import MicSharpIcon from '@mui/icons-material/MicSharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import TungstenSharpIcon from '@mui/icons-material/TungstenSharp';

function MeetingScreen() {
  return (
    <Box
      p={6}
      bg="#046ffb"
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
      <BackgroundCircleGenerator />
      <Box
        zIndex="2"
        w={{ base: '56vw', md: '28vw' }}
        h={{ base: '12vw', md: '6vw' }}
        bgColor="black"
        borderRadius="2xl"
        mt="1vh"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        padding="0 10px"
        position="absolute"
        top={{ base: '3vh', md: '6vh' }}
      >
        <Box
          width={{ base: '6vw', md: '3vw' }}
          height={{ base: '6vw', md: '3vw' }}
          borderRadius="50%"
          bgColor="#25292c"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <PlayArrowIcon fontSize="large" style={{ color: 'white' }} />
        </Box>
        {/* sound wave simulation */}
        <Box display="flex">
          <GraphicEqSharpIcon style={{ color: 'white', fontSize: '4vw' }} />
          <GraphicEqSharpIcon style={{ color: 'white', fontSize: '4vw' }} />
          <GraphicEqSharpIcon style={{ color: 'white', fontSize: '4vw' }} />
          <GraphicEqSharpIcon style={{ color: 'white', fontSize: '4vw' }} />
          <GraphicEqSharpIcon style={{ color: 'white', fontSize: '4vw' }} />
        </Box>
      </Box>
      <Box
        zIndex="3"
        position="relative"
        w={{ base: '66vw', md: '33vw' }}
        h={{ base: '40vw', md: '20vw' }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          w={{ base: '8vw', md: '4vw' }}
          h={{ base: '8vw', md: '4vw' }}
          borderRadius="50%"
          bgColor="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box fontSize={{ base: '4vw', md: '2vw' }} color="black">
            <MicSharpIcon
              style={{
                transform: 'rotate(-45deg) scale(1.2)',
              }}
            />
          </Box>
        </Box>
        <Box
          position="absolute"
          bottom="0"
          right="0"
          w={{ base: '8vw', md: '4vw' }}
          h={{ base: '8vw', md: '4vw' }}
          borderRadius="50%"
          bgColor="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box fontSize={{ base: '4vw', md: '2vw' }} color="black">
            <TungstenSharpIcon />
          </Box>
        </Box>
        <Box
          position="absolute"
          bottom="0"
          left="0"
          w={{ base: '8vw', md: '4vw' }}
          h={{ base: '8vw', md: '4vw' }}
          borderRadius="50%"
          bgColor="#0063e5"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box fontSize={{ base: '4vw', md: '2vw' }} color="white">
            <PersonSharpIcon />
          </Box>
        </Box>
        <Box
          position="absolute"
          bottom="1vw"
          left="5vw"
          width="5vw"
          height="2vw"
          borderRadius="3xl"
          bgColor="#0063e5"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box width="0.6vw" height="0.6vw" borderRadius="50%" bgColor="white" mx="0.2vw" />
          <Box width="0.6vw" height="0.6vw" borderRadius="50%" bgColor="white" mx="0.2vw" />
          <Box width="0.6vw" height="0.6vw" borderRadius="50%" bgColor="white" mx="0.2vw" />
        </Box>
      </Box>
    </Box>
  );
}

export default MeetingScreen;
