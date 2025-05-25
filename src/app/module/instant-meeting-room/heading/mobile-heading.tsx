import React from 'react';
import { Heading, Text, Button, Image } from '@chakra-ui/react';

function MobileHeading() {
  return (
    <>
      <Heading fontSize="17px" fontFamily="Helvetica">
        <Text as="span" fontSize="17px" fontWeight="bold" color="#25292c">
          Instant Meeting
        </Text>
      </Heading>
      <Button bgColor="#ff4646" borderRadius="18px" w="52px" h="32px">
        <Image src="/mobile-meeting/turn-off.svg" alt="turn-off-logo" />
      </Button>
    </>
  );
}

export default MobileHeading;
