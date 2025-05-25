import { Box, Button, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

interface URLClipboardProps {
  url: string;
  handleCopy?: () => void;
}

function URLClipboard({ url, handleCopy }: URLClipboardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (handleCopy) {
        handleCopy();
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <>
      <Box
        display="flex"
        flexDir="row"
        w="80%"
        bgColor="#E5F0FE"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Text flex="1" title={url} fontSize="sm">
          {url}
        </Text>
      </Box>

      <Button
        onClick={copyToClipboard}
        _hover={{ bg: '#E5F0FE' }}
        bgColor={copied ? 'green' : '#E5F0FE'}
        display="flex"
        alignItems="center"
        justifyContent="center"
        size="sm"
        borderRadius="18px"
      >
        <Image src="/join-link-panel/copy.svg" alt="Copy Icon" w="18px" h="18px" />
        {copied && (
          <Text ml={2} fontSize="sm" color="green.600">
            Copied!
          </Text>
        )}
      </Button>
    </>
  );
}

export default URLClipboard;
