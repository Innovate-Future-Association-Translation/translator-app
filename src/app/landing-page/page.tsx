import React from 'react';
import Header from '../module/Landing-page/header/header';
import Footer from '../module/Landing-page/footer/footer';
import HeroSection from '../module/Landing-page/hero-section/hero-section';
import TranslationFeatures from '../module/Landing-page/translation-features/translation-features';
import MeetingUI from '../module/Landing-page/meeting-ui/international-bussiness-meeting';
import Multilingual from '../module/Landing-page/multilingual/multilingual';
import UserFeedback from '../module/Landing-page/user-feedback/user-feedback';
import { Box } from '@chakra-ui/react';

export default function Page() {
  return (
    <Box bgColor="white" minH="100vh">
      <Header></Header>
      <Box
        w="95%"
        alignItems="center"
        mx="auto"
        mt={{ base: 0, lg: '5vh' }}
        p={{ base: '10', lg: '10' }}
        mb={{ base: 0, lg: '15vh' }}
      >
        <HeroSection></HeroSection>
        <TranslationFeatures></TranslationFeatures>
        <MeetingUI></MeetingUI>
        <Multilingual></Multilingual>
        <UserFeedback></UserFeedback>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
