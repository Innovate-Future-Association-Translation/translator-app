import React from 'react';
import { Stack, Heading, Text } from '@chakra-ui/react';

function UserFeedbackTitle() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      gap={{ base: '20px', md: '25px', lg: '30px' }}
      mt={{ base: '30px', md: '250px' }}
    >
      <Heading
        as="h1"
        fontSize={{ base: '24px', md: '40px', lg: '45px' }}
        color="black"
        fontWeight="bold"
        textAlign="center"
        fontFamily="Helvetica"
        fontStretch="normal"
      >
        &quot;Trusted by Users Worldwide&quot;
      </Heading>
      <Text textAlign="center" color="#676b6f" fontSize={{ base: '14px', md: '16px' }}>
        &quot;Real user experiences - see what they have to say!&quot;
      </Text>
    </Stack>
  );
}

export default UserFeedbackTitle;
