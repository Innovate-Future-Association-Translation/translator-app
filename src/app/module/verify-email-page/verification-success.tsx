import React from 'react'
import { Flex, Text, Center, Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import './common.css'

const VerificationSuccess = ( ) => {
  const router = useRouter();

  return (
    <>
      <Flex direction="column" align="center">
          <Center h="64px" w="64px" borderRadius="32px" backgroundColor="green.400" marginBottom="30px">
            <Text color="white" textStyle="4xl" fontWeight="bold">✓</Text>
          </Center>
          <Text fontSize="lg" fontWeight="bold" marginBottom="16px">Verification Success</Text>
          <Text fontSize="18" color="#676b6f">Email verification successful. You can start your operation now.</Text>
          <Button 
            colorScheme="black" 
            variant="solid"
            width="100vw"
            maxWidth="300px"
            borderRadius="20px"
            marginTop="48px"
            borderColor="black"
            onClick={() => router.push('/sign-in')}
          >
            <a href="#">Sign In</a>
          </Button>
        </Flex>
    </>
  )
}

export default VerificationSuccess