import React from 'react';
import { Heading, Text } from '@chakra-ui/react';

function MobileHeading() {
  return (
    <>
      <Heading fontSize="17px" fontFamily="Helvetica">
        <Text as="span" fontSize="17px" fontWeight="bold" color="#25292c">
          Instant Meeting
        </Text>
      </Heading>
    </>
  );
}

export default MobileHeading;
