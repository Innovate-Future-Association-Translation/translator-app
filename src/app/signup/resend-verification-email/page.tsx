'use client'

import React, { useState } from 'react'
import { Container, Flex, Text, Box, Input, Button } from '@chakra-ui/react'
import { Navbar } from '@/app/module/common/navbar'
import { handleRetry } from '@/app/module/verify-email-page/verification-function'

const ResendVerificationEmail = () => {
  const [email, setEmail] = useState('');

  return (
    <Container>
      <Navbar />
      <Flex w="100%" h="calc(100vh - 75px)" direction="column" align="center" justifyContent="center" gap={6}>
        <Text fontSize="xl" fontWeight="bold" color="blue.500">Resend Verification Email</Text>
        <Box justifyContent="center" alignItems="center" display="flex" flexDirection="column" gap={4} width="100%" maxWidth="400px">
          <Input
            size="lg"
            color="gray.800"
            _placeholder={{ color: "gray.400" }}
            borderColor="gray.200"
            pl={6}
            placeholder="Enter your email address"
            margin-bottom="20px"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            >
          </Input>
          <Button
            backgroundColor="blue.500"
            justifyContent="center"
            alignItems="center"
            padding="20px 30px"
            borderRadius="20px"
            onClick={() => handleRetry(email)}>
              Resend Verification Email
          </Button>
        </Box>
      </Flex>
    </Container>
  )
}

export default ResendVerificationEmail