import React from 'react';
import Header from '@/app/module/LandingPage/header';
import Footer from '../module/LandingPage/footer/footer';
import HeroSection from '../module/LandingPage/heroSection';
import TranslationFeatures from '../module/LandingPage/translation-features/translation-features';
import MeetingUI from '../module/LandingPage/meetingUI/international-bussiness-meeting';
import Multilingual from '../module/LandingPage/multilingual';
import UserFeedback from '../module/LandingPage/user-feedback/user-feedback';
import { Box } from '@chakra-ui/react';

export default function Page() {
  return (
    <Box bg="white" minH="100vh">
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
