'use client';
import { Box, Card } from '@chakra-ui/react';
import ThirdPartyFailureAction from './thrid-party-failure-action/third-party-failure-action';
import React from 'react';

interface authErrorMessage {
  switchToSignUp: () => void;
  switchToSignIn: () => void;
  errorMessage: string;
}
function AuthFailHandler({ errorMessage, switchToSignIn, switchToSignUp }: authErrorMessage) {
  return (
    <Box
      minH="100vh"
      minW="100VW"
      bg="white"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Card.Root
        width="320px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        padding="4"
        border="none"
      >
        <Box
          borderRadius="full"
          bg="red"
          w="10vh"
          h="10vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          fontWeight="bold"
          fontSize="6xl"
          mb={4}
        >
          X
        </Box>
        <Card.Body gap="2" mb="10vh">
          <Card.Title mt="2">Fail To register!</Card.Title>
          <Card.Description>{errorMessage}</Card.Description>
        </Card.Body>

        <ThirdPartyFailureAction switchToSignIn={switchToSignIn} switchToSignUp={switchToSignUp} />
      </Card.Root>
    </Box>
  );
}

export default AuthFailHandler;
