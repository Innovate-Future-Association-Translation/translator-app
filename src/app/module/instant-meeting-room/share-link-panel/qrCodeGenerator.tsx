'use client';

import React, { useState, useEffect } from 'react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { API_BASE_URL } from '@/lib/api';

interface QRCodeGeneratorProps {
  roomId: string;
}

function QRCodeGenerator({ roomId }: QRCodeGeneratorProps) {
  const [qrCodeDataURL, setQrCodeDataURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/meetings/qr-code/${roomId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQrCodeDataURL(data.qrCode);
      } catch {
        setError('Failed to generate QR code');
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchQRCode();
    }
  }, [roomId]);

  if (loading) {
    return (
      <Box w="100%" display="flex" justifyContent="center" p={4}>
        <Spinner size="lg" color="blue.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box w="100%" display="flex" justifyContent="center" p={4}>
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      </Box>
    );
  }

  return (
    <Box w="100%" display="flex" justifyContent="center">
      {qrCodeDataURL ? (
        <Image
          src={qrCodeDataURL}
          alt="Meeting QR Code"
          width={120}
          height={120}
          style={{
            border: '2px solid #ffffff',
          }}
          priority
        />
      ) : (
        <Text color="gray.500" fontSize="sm">
          QR code unavailable
        </Text>
      )}
    </Box>
  );
}

export default QRCodeGenerator;
