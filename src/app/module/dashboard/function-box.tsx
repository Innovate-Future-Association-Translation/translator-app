import React from 'react';
import { Box, Button, Heading } from '@chakra-ui/react';

interface FunctionDetail {
  header: string;
  headerTextColor: string;
  buttonText: string;
  backgroundColor: string;
  backgroundImage?: string;
  buttonBackgroundColor: string;
  buttonTextColor: string;
  onClickApi?: () => void | Promise<void>;
}

function FunctionBox({
  header,
  buttonText,
  backgroundColor,
  backgroundImage,
  buttonBackgroundColor,
  buttonTextColor,
  headerTextColor,
  onClickApi,
}: FunctionDetail) {
  return (
    <Box
      bgColor={backgroundColor}
      backgroundImage={backgroundImage ? `url(${backgroundImage})` : undefined}
      backgroundSize="cover"
      backgroundPosition="center"
      borderRadius="20px"
      w={{ base: '80vw', md: '20vw' }}
      h={{ base: '80vw', md: '20vw' }}
      p="4"
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Heading size={{ base: 'md', md: '3xl' }} mb="2vw" color={headerTextColor}>
        {header}
      </Heading>
      <Button
        bgColor={buttonBackgroundColor}
        w={{ base: '20vw', md: '9vw' }}
        h="5vh"
        borderRadius="24px"
        color={buttonTextColor}
        _hover={{ opacity: 0.8 }}
        onClick={onClickApi}
      >
        {buttonText}
      </Button>
    </Box>
  );
}

export default FunctionBox;
