import React from 'react'
import { Button, Center, Flex, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { ErrorType, getErrorMessage } from '@/app/module/verify-email-page/verification-function'
import "./common.css"

const VerificationFail = ( { errorType }: {errorType: ErrorType} ) => {
  const router = useRouter();

  return (
    <Flex direction="column" align="center">
            <Center h="64px" w="64px" borderRadius="32px" backgroundColor="red.400">
              <Text color="white" textStyle="4xl" fontWeight="bold">X</Text>
            </Center>
            <Text marginTop="30px" fontSize="18px">Verification Failed!</Text>
            <Text marginTop="16px" fontSize="14px" color="#676b6f">{getErrorMessage(errorType)}</Text>
            <Flex direction="column" gap={5}>
              <Button
                onClick={() => router.push('/signup/resend-verification-email')}
                colorScheme="black"
                variant="solid"
                width="100vw"
                maxWidth="300px"
                borderRadius="20px"
                marginTop="48px"
              >
                Mailbox Verification
              </Button>
              <Button
                variant="outline"
                width="100vw"
                maxWidth="300px"
                borderRadius="20px"
                borderColor="black"
                onClick={() => router.push('/sign-in')}
              >
                <a href="#">Sign In</a>
              </Button>
            </Flex>
          </Flex>
  )
}

export default VerificationFail