'use client';

import { Button, Input, Text, Heading, Box, CloseButton, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignInClick?: () => void;
}

export function ForgotPasswordModal({ isOpen, onClose, onSignInClick }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('');
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const handleClose = () => {
    setEmail('');
    setIsLoading(false);
    setError('');
    setIsSuccess(false);
    setIsFailed(false);
    onClose();
  };

  const handleResetToForgotPassword = () => {
    setError('');
    setIsFailed(false);
    setIsLoading(false);
  };

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    setIsLoading(true);
    setError('');
    setIsFailed(false);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        setIsSuccess(true);
      } else {
        const data = await res.json();
        if (res.status === 404) {
          setError('The mailbox is not registered. Please check and try again.');
        } else {
          setError('Email verification failed!');
          setIsFailed(true);
        }
      }
    } catch (err) {
      setError('Email verification failed!');
      setIsFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <Box position="fixed" inset={0} bg="blackAlpha.600" zIndex={1400} onClick={handleClose}>
          {isSuccess || isFailed ? (
            /* Success/Failure Modal */
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="460px"
              height="398px"
              padding="60px 60px 60px 20px"
              borderRadius="20px"
              bg="white"
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton position="absolute" right="20px" top="20px" onClick={handleClose} />

              <Flex direction="column" align="center" height="100%">
                {/* Icon - 60px from top of modal */}
                <Image
                  src={isSuccess ? '/green.svg' : '/red.svg'}
                  alt={isSuccess ? 'Success' : 'Failed'}
                  width="64px"
                  height="64px"
                  margin="0 90px 16px 140px"
                />

                {/* Title with 125px side margins */}
                <Text
                  width="210px"
                  height="22px"
                  margin="0 90px 16px 140px"
                  fontFamily="Helvetica"
                  fontSize="18px"
                  fontWeight="bold"
                  lineHeight="normal"
                  letterSpacing="normal"
                  textAlign="center"
                  color={isSuccess ? '#25292c' : 'red.500'}
                >
                  {isSuccess ? 'Email sent successfully!' : 'Email verification failed!'}
                </Text>

                {/* Description */}
                <Text
                  width={isSuccess ? '340px' : '248px'}
                  height={isSuccess ? '54px' : 'auto'}
                  margin="0 90px 16px 140px"
                  fontFamily="Helvetica"
                  fontSize="14px"
                  fontWeight="normal"
                  lineHeight="1.29"
                  letterSpacing="normal"
                  textAlign="center"
                  color="#676b6f"
                >
                  {isSuccess
                    ? 'A password reset link has been sent to your email, please check and follow the instructions to reset your password.'
                    : 'Please verify email again.'}
                </Text>

                {/* Spacer to push button to bottom */}
                <Box flex="1" minHeight="48px" />

                {/* Button - 60px from bottom of modal */}
                <Box
                  as="button"
                  width="280px"
                  height="44px"
                  margin="0 90px 16px 140px"
                  padding="0"
                  borderRadius="22px"
                  bg="#25292c"
                  color="white"
                  _hover={{ bg: '#3a3f42' }}
                  lineHeight="44px"
                  textAlign="center"
                  onClick={
                    isSuccess
                      ? () => {
                          handleClose();
                          onSignInClick?.();
                        }
                      : handleResetToForgotPassword
                  }
                >
                  {isSuccess ? 'Sign In' : 'Go'}
                </Box>
              </Flex>
            </Box>
          ) : (
            /* Original Form Modal */
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              w="460px"
              h="334px"
              bg="white"
              borderRadius="20px"
              p="22px 20px 30px 30px"
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton position="absolute" right="20px" top="10px" onClick={handleClose} />

              <Text
                width="148px"
                height="22px"
                margin="8px 52px 16px 0"
                fontFamily="Helvetica"
                fontSize="18px"
                fontWeight="bold"
                lineHeight="normal"
                letterSpacing="normal"
                color="#25292c"
              >
                Forgot Password
              </Text>

              <Text
                width="400px"
                height="36px"
                margin="16px 10px 40px 0"
                fontFamily="Helvetica"
                fontSize="14px"
                fontWeight="normal"
                lineHeight="1.29"
                letterSpacing="normal"
                color="#676b6f"
              >
                No worries! Fill in your email and we'll send you a link to reset your password.
              </Text>

              <Text
                width="36px"
                height="18px"
                margin="0 364px 6px 0"
                fontFamily="Helvetica"
                fontSize="14px"
                fontWeight="normal"
                lineHeight="1.29"
                letterSpacing="normal"
                color="#25292c"
              >
                Email
              </Text>

              <Input
                position="absolute"
                top="168px"
                left="30px"
                width="400px"
                height="44px"
                padding="13px 20px"
                borderRadius="22px"
                borderColor={error ? '#ff4646' : '#d2d2d2'}
                _focus={{
                  borderColor: error ? '#ff4646' : '#3182ce',
                  boxShadow: error ? '0 0 0 1px #ff4646' : '0 0 0 1px #3182ce',
                }}
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
              />

              {error && !isFailed && (
                <Text
                  position="absolute"
                  top="214px"
                  left="30px"
                  width="309px"
                  height="14px"
                  fontFamily="Helvetica"
                  fontSize="12px"
                  fontWeight="normal"
                  lineHeight="normal"
                  letterSpacing="normal"
                  color="#ff4646"
                >
                  {error}
                </Text>
              )}

              <Box position="absolute" bottom="30px" left="30px" right="20px" height="44px">
                <Button
                  onClick={handleClose}
                  variant="outline"
                  position="absolute"
                  left="200px"
                  width="96px"
                  height="44px"
                  padding="13px 22px 11px 21px"
                  borderRadius="22px"
                  border="1px solid #b6babd"
                  bg="#fff"
                  _hover={{ bg: '#f5f5f5' }}
                >
                  Cancel
                </Button>
                <Button
                  loading={loading}
                  loadingText="Sending..."
                  onClick={handleSubmit}
                  position="absolute"
                  right="0"
                  width="96px"
                  height="44px"
                  padding="13px 28px 11px"
                  borderRadius="22px"
                  bg="#25292c"
                  color="#fff"
                  _hover={{ bg: '#3a3f42' }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
}
