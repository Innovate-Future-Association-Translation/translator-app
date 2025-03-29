import React from 'react';
import { Button } from '@chakra-ui/react';

interface thirdPartyFailureAction {
  switchToSignUp: () => void;
  switchToSignIn: () => void;
}

function ThirdPartyFailureAction({ switchToSignUp, switchToSignIn }: thirdPartyFailureAction) {
  return (
    <>
      <Button mb="2vh" borderRadius="3xl" minW="90%" fontWeight="bold" onClick={switchToSignUp}>
        Sign Up
      </Button>
      <Button
        borderRadius="3xl"
        minW="90%"
        bg="white"
        border="1px"
        borderStyle="solid"
        color="black"
        fontWeight="bold"
        onClick={switchToSignIn}
      >
        Sign In
      </Button>
    </>
  );
}

export default ThirdPartyFailureAction;
