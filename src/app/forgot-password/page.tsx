'use client';

import { Box, Button, Input, Text, IconButton, Image, Flex } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

const BackIcon = () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </svg>
);

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleBack = () => {
    router.push('/sign-in');
  };

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('The mailbox is not registered. Please check and try again.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        setIsSuccess(true);
      } else if (res.status === 404) {
        setError('The mailbox is not registered. Please check and try again.');
      } else {
        setShowErrorModal(true);
      }
    } catch {
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box width="375px" margin="0 auto" padding="108px 24px 0" position="relative">
      <IconButton
        aria-label="Back to sign in"
        onClick={handleBack}
        variant="ghost"
        position="absolute"
        left="10px"
        top="20px"
      >
        <BackIcon />
      </IconButton>

      {isSuccess ? (
        <Flex direction="column" align="center">
          <Image src="/green.svg" alt="Success" width="64px" height="64px" margin="0 auto 32px" />

          <Text
            width="210px"
            height="22px"
            margin="0 auto 32px"
            fontFamily="Helvetica"
            fontSize="18px"
            fontWeight="bold"
            lineHeight="normal"
            textAlign="center"
            color="#25292c"
          >
            Email sent successfully!
          </Text>

          <Text
            width="288px"
            height="48px"
            margin="0 auto 32px"
            fontFamily="Helvetica"
            fontSize="14px"
            fontWeight="normal"
            lineHeight="1.14"
            textAlign="center"
            color="#676b6f"
          >
            A password reset link has been sent to your email, please check and follow the
            instructions to reset your password.
          </Text>

          <Button
            width="327px"
            height="48px"
            margin="124px auto 0"
            padding="15px 0"
            borderRadius="24px"
            bg="#25292c"
            color="white"
            _hover={{ bg: '#3a3f42' }}
            onClick={() => router.push('/sign-in')}
          >
            Sign In
          </Button>
        </Flex>
      ) : (
        <Box>
          <Text
            width="197px"
            height="30px"
            margin="0 0 32px"
            fontFamily="Helvetica"
            fontSize="24px"
            fontWeight="bold"
            lineHeight="1.25"
            color="#25292c"
          >
            Forgot Password
          </Text>

          <Text
            width="36px"
            height="16px"
            margin="0 0 4px"
            fontFamily="Helvetica"
            fontSize="14px"
            fontWeight="normal"
            lineHeight="1.14"
            color="#676b6f"
          >
            Email
          </Text>

          <Input
            width="327px"
            height="48px"
            margin="4px 0 0"
            padding="15px 20px"
            borderRadius="24px"
            border="1px solid #d8d8d8"
            bg="#fff"
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            _focus={{
              borderColor: '#3182ce',
              boxShadow: '0 0 0 1px #3182ce',
            }}
          />

          {error && (
            <Text color="red.500" mt={2} fontSize="sm">
              {error}
            </Text>
          )}

          <Button
            width="327px"
            height="48px"
            margin="48px 0 0"
            padding="15px 0"
            borderRadius="24px"
            bg={email ? '#25292c' : '#d8d8d8'}
            color="white"
            _hover={{ bg: email ? '#3a3f42' : '#d8d8d8' }}
            onClick={handleSubmit}
            loading={loading}
            loadingText="Sending..."
            disabled={!email}
          >
            Send
          </Button>
        </Box>
      )}

      {showErrorModal && (
        <Box
          position="fixed"
          inset={0}
          bg="blackAlpha.600"
          zIndex={1400}
          onClick={() => setShowErrorModal(false)}
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="303px"
            padding="40px 27px"
            borderRadius="20px"
            bg="white"
            onClick={(e) => e.stopPropagation()}
          >
            <Flex direction="column" align="center" width="100%">
              <Image src="/red.svg" alt="Failed" boxSize="40px" />

              <Text
                width="185px"
                margin="24px 0 12px"
                fontFamily="Helvetica"
                fontSize="16px"
                fontWeight="bold"
                lineHeight="1.25"
                textAlign="center"
                color="#25292c"
              >
                Email verification failed!
              </Text>

              <Text
                width="248px"
                margin="12px 0 0"
                fontFamily="Helvetica"
                fontSize="14px"
                fontWeight="normal"
                lineHeight="1.14"
                textAlign="center"
                color="#676b6f"
              >
                Please verified email again.
              </Text>

              <Button
                width="120px"
                height="40px"
                margin="40px 0 0"
                padding="11px 0"
                borderRadius="20px"
                bg="#25292c"
                color="white"
                _hover={{ bg: '#3a3f42' }}
                onClick={() => setShowErrorModal(false)}
              >
                Go
              </Button>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
}
