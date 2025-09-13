import React from 'react'
import { Flex, Text, Spinner, Heading } from '@chakra-ui/react'
import "./common.css"

const EmailVerificationLoading = () => {
  return (
    <Flex direction="column" align="center" gap={6}>
      <Spinner size="xl" borderWidth="3px" />
      <Heading as="h1" size="lg">Verifying</Heading>
      <Text fontSize="lg">Email verification in process</Text>
    </Flex>
  )
}

export default EmailVerificationLoading