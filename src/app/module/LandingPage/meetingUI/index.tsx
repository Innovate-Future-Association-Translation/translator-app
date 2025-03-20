'use client'
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MicIcon from "@mui/icons-material/Mic";
import MicNoneIcon from "@mui/icons-material/MicNone";
import EmergencyRecordingIcon from "@mui/icons-material/EmergencyRecording";

import {
  Box,
  Flex,
  Heading,
  Container,
  Text,
  Image,
  Grid,
  Link,
  VStack,
  Badge,
  Stack,
  Center,
} from "@chakra-ui/react";

import Textbox from "../translationFeatures/textBox";
import IPhoneScreen from "./phoneScreen";
function MeetingUI() {
  return (
    <>
      <Stack
        display={{ base: "flex", lg: "none" }}
        pt={8}
        alignItems="center"
        justifyContent="center"
        mt={10}
      >
        <Flex
          flexDirection="column"
          w={{ base: "100%", lg: "70%" }}
          align={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Text
            as="h1"
            fontSize={{ base: "2xl", md: "3xl", lg: "6xl" }}
            color="black"
            fontWeight="black"
          >
            International Bussiness Meeting
          </Text>
          <Text
            fontSize={{ base: "md", lg: "xl" }}
            mt={6}
            mr={10}
            color="gray.600"
            fontWeight="md"
          >
            IFA Translator ensures that all participants can instantly read
            subtitles in their native language, making the meeting more
            efficient!
          </Text>
        </Flex>

        <IPhoneScreen></IPhoneScreen>
      </Stack>

      <Flex
        mt={40}
        gap={50}
        display={{ base: "none", lg: "flex" }}
      >
        {/* left UI Stimulation */}

        <Box
          p={6}
          bg="black"
          borderRadius="4xl"
          w="70vw"
          h="60vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          className="meeting-screen-simulation"
        >
          <Grid
            className="4-users-screen"
            templateColumns="repeat(2, 1fr)"
            gap={4}
            p={4}
            w="100%"
            h="100%"
          >
            <Box bg="#C6C2C2" h="100%" borderRadius="4xl"></Box>
            <Box bg="#C6C2C2" h="100%" borderRadius="4xl"></Box>
            <Box bg="#C6C2C2" h="100%" borderRadius="4xl"></Box>
            <Box bg="#C6C2C2" h="100%" borderRadius="4xl"></Box>
          </Grid>

          {/* 3 buttons simulation */}
          <Flex className="3-buttons-section" mt={5} gap={4}>
            <Box
              bg="#FEFFFF"
              rounded="full"
              w={50}
              height={50}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <MicNoneIcon fontSize="medium" sx={{ color: "#212121" }} />
            </Box>
            <Box
              bg="#FEFFFF"
              rounded="full"
              w={50}
              height={50}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <EmergencyRecordingIcon
                fontSize="medium"
                sx={{ color: "#212121" }}
              />
            </Box>
            <Box
              bg="#FF333A"
              rounded="full"
              w={50}
              height={50}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <LocalPhoneIcon fontSize="medium" />
            </Box>
          </Flex>
        </Box>

        {/* right description */}
        <Box ml={50} w="30vw" h="40vh">
          <Textbox
            bg="white"
            headerText="International Bussiness Meeting"
            textColor="grey"
            text="IFA Translator ensures that all participants can instantly read subtitles in their native language, making the meeting more efficient!"
            box_h="80%"
            box_w="80%"
            fontSize="normal"
            costomPadding="0"
            headerSize="3xl"
          />
          <Box mt={50} mb={0}>
            <Text mb={5} color="black" fontSize="xl" fontWeight="bold">
              Real-time Subtitle
            </Text>
            <Text mb={5} color="black" fontSize="xl" fontWeight="bold">
              Translation One-Click
            </Text>
            <Text mb={5} color="black" fontSize="xl" fontWeight="bold"></Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default MeetingUI;
