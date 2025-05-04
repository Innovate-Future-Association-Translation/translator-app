import React from 'react';
import { Stack, Box, Flex, Text, Image } from '@chakra-ui/react';

interface QRcodeInfo {
  code_id: number;
  description: string;
  img_src: string;
}

interface QRcodeListProps {
  QRCodeList: QRcodeInfo[];
}

function QRcodeList({ QRCodeList }: QRcodeListProps) {
  return (
    <Flex w="100%" h="auto" justifyContent="space-evenly">
      {QRCodeList.map((qrCode) => (
        <Stack key={qrCode.code_id} flexDirection="column" w="10vw" h="10vw">
          <Text color="gray.800" fontSize="12px">
            {qrCode.description}
          </Text>
          <Box
            w="4vw"
            h="4vw"
            bg="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {qrCode.img_src === '' ? (
              <Box w="80%" h="80%" bg="#D8D8D8"></Box>
            ) : (
              <Image src={qrCode.img_src} alt={qrCode.description} w="7vw" h="7vh" />
            )}
          </Box>
        </Stack>
      ))}
    </Flex>
  );
}

export default QRcodeList;
