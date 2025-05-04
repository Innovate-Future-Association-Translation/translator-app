import { Flex, Stack, Heading, Box } from '@chakra-ui/react';
import FooterNav from './footer-nav/footer-nav';
import Contact from './contact/contact';
import React from 'react';
import Textbox from '../text-box/text-box';

function Footer() {
  return (
    <Stack
      bg="#F7F8FA"
      alignItems="center"
      className="footer-container"
      padding={{ base: '3vh 0', sm: '3vh 0', md: '3vh 0' }}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        height={{ base: 'auto', md: '25vh' }}
        width={{ base: 'auto', md: '80vw' }}
        bg="#F7F8FA"
        className="logo-nav-contact-container"
        justify="space-between"
        align="flex-start"
        wrap="wrap"
        gap={{ base: '4', md: '12' }}
      >
        <Box
          className="businessLogo"
          flex={{ base: 'none', md: '1' }}
          textAlign={{ base: 'center', md: 'left' }}
          mb={{ base: '4vh', md: '0' }}
          alignSelf={{ base: 'center', md: 'flex-start' }}
        >
          <Heading fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" color="#066FFB">
            IFA TRANSLATOR
          </Heading>
        </Box>
        <Box
          className="navBar"
          fontSize={{ base: '1', sm: '2' }}
          flex={{ base: 'none', md: '2' }}
          bg="#F7F8FA"
          color="black"
          textAlign={{ base: 'center', md: 'left' }}
          mb={{ base: '4vh', md: '0' }}
          alignSelf={{ base: 'center', md: 'flex-start' }}
        >
          <FooterNav />
        </Box>
        <Box
          className="contact"
          flex={{ base: 'none', md: '1' }}
          bg="#F7F8FA"
          textAlign={{ base: 'center', md: 'left' }}
          mb={{ base: '4vh', md: '0' }}
          alignSelf={{ base: 'center', md: 'flex-start' }}
        >
          <Contact />
        </Box>
      </Flex>
      <Textbox
        headerText="Privacy Protected  |  Legal Disclaimer"
        bg="none"
        headerSize="md"
        text="© 2025 IFA Translator. All rights reserved."
        box_w={{ base: '90vw', sm: '80vw', md: '25vw' }}
        box_h="10vh"
        textColor="grey"
        fontSize={{ base: 'sm', md: 'md' }}
      />
    </Stack>
  );
}

export default Footer;
