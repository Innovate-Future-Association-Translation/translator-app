import {
  Avatar,
  Button,
  Card,
  Flex,
  For,
  Stack,
  Text,
  HStack,
  Heading,
  Box,
} from "@chakra-ui/react";
import FooterNav from "./footerNav";
import Contact from "./contact";
import React from "react";
import Textbox from "../translationFeatures/textBox";

function Footer() {
  return (
    <Stack bg="#F7F8FA" alignItems="center" className="footer-container">
      <Flex height="25vh" bg="#F7F8FA" className= "logo-nav-contact-container">
        <Box className="bussinessLogo" flex="1">
          <Heading
            fontSize="2xl"
            fontWeight="bold"
            color="#066FFB"
            pt={20}
            pl="10vh"
          >
            IFA TRANSLATOR
          </Heading>
        </Box>
        <Box
          className="navBar"
          fontSize="xl"
          flex="1"
          bg="#F7F8FA"
          color="black"
          pt={20}
          pl="10vh"
        >
          <FooterNav></FooterNav>
        </Box>
        <Box
          className="contact"
          flex="1"
          bg="#F7F8FA"
          pt={20}
          pl={60}
          pr="10vh"
        >
          <Contact></Contact>
        </Box>
      </Flex>
      <Textbox
        headerText="Privacy Protected  |  Legal Disclaimer"
        bg="none"
        headerSize="md"
        text="© 2025 IFA Translator. All rights reserved."
        box_w="25vw"
        box_h="10vh"
        textColor="black"
         heaerColor="black"
         fontSize="md"
      ></Textbox>
    </Stack>
  );
}

export default Footer;
