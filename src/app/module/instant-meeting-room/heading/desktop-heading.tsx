import React from 'react';
import { Heading, Text } from '@chakra-ui/react';
function DeskTopHeading() {
  return (
    <>
      <Heading size="md" fontFamily="Helvetica">
        <Text as="span" color="#676b6f">
          Home /{' '}
        </Text>

        <Text as="span" fontWeight="bold" color="#25292c">
          Start An Instant Meeting
        </Text>
      </Heading>
    </>
  );
}

export default DeskTopHeading;
