import React from "react";
import Header from "@/app/module/LandingPage/header";
import Footer from "@/app/module/LandingPage/footer";
import HeroSection from "../module/LandingPage/heroSection";
import TranslationFeatures from "../module/LandingPage/translationFeatures";
import MeetingUI from "../module/LandingPage/meetingUI/international-bussiness-meeting";
import Multilingual from "../module/LandingPage/multilingual";
import UserFeeback from "../module/LandingPage/UserFeeback";
import { Box } from "@chakra-ui/react";

export default function Page() {
  return (
    <Box bg="white" minH="100vh">
      <Header></Header>
      <Box
        w="95%"
        alignItems="center"
        mx="auto"
        mt={ {base:0,lg:"5vh"}}
        p={{base:"10",lg:"20"}}
        mb={ {base:0,lg:"15vh"}}
      >
        <HeroSection></HeroSection>
        <TranslationFeatures></TranslationFeatures>
        <MeetingUI></MeetingUI>
        <Multilingual></Multilingual>
        <UserFeeback></UserFeeback>
      </Box>
      <Footer></Footer>
    </Box>
  );
}
