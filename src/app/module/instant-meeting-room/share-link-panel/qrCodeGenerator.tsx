'use client';

import React from 'react';
import { useQRCode } from 'next-qrcode';
import { Box } from '@chakra-ui/react';

interface QRCodeGeneratorProps {
  url: string;
}

function QRCodeGenerator({ url }: QRCodeGeneratorProps) {
  const { SVG } = useQRCode();

  return (
    <Box w="100%" display="flex" justifyContent="center">
      <SVG
        text={url}
        options={{
          margin: 2,
          width: 120,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        }}
      />
    </Box>
  );
}

export default QRCodeGenerator;
