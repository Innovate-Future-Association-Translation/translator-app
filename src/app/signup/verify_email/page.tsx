'use client'

import React, { useState, useEffect } from 'react';
import { Container, Box, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { ErrorType, tokenVerification } from '@/app/module/verify-email-page/verification-function';
import VerificationSuccess from '@/app/module/verify-email-page/verification-success';
import EmailVerificationLoading from '@/app/module/verify-email-page/email-verification-loading';
import { Navbar } from '@/app/module/common/navbar';
import VerificationFail from '@/app/module/verify-email-page/verification-fail';
import BackgroundImage from '/image/emailVerificationBackground.png';
import './verificationEmail.css';


export default function EmailVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [errorType, setErrorType] = useState<ErrorType>(null);

  const addCloseButton = () => {
    return (
      <Container
        position="absolute"
        right="20px"
        top="20px"
        width="20px"
        height="20px"
      >
        <button className="closeButton">X</button>
      </Container>
    )
  }

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token');
       
        if (!token) {
          throw new Error('Missing verification token');
        }

        const response = await tokenVerification(token);

        if (response.status === 200) {
          setVerificationSuccess(true);
          setTimeout(() => router.push('/sign-in'), 3000);
        }
      } catch (error: any) {
        setVerificationSuccess(false);

        if (error.response) {
          switch(error.response.status) {
            case 400:
              setErrorType(error.response.data.message.includes('expired') ? 'expired' : 'invalid');
              break;
            default:
              setErrorType('server');
          }
        } else {
          setErrorType('server');
        }
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <Container
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center" 
      w="100vw" 
      h="100vh"
      mx="auto"
      textAlign="center"
      gap={6}
      bgImage="url(/image/emailVerificationBackground.png)"
      backgroundSize="cover"
      overflow="hidden"
    >
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        width="100vw"
        height="100vh"
        className="WholePage"
      >
      </Box>
      <Box
          width="460px"
          height="430px"
          bgColor="white"
          padding="20px"
          borderRadius="20px"
          className="popup"
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {addCloseButton()}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {loading ? (
              <EmailVerificationLoading />
            ) : verificationSuccess ? (
              <VerificationSuccess />
            ) : (
              <VerificationFail
                errorType={errorType}
              />
            )}
          </Box>
        </Box>
    </Container>
  );
}
