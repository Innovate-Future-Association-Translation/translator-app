import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type Feature = {
  title: string;
  description: string;
  keyPointArray: string[];
};

function DescriptionGenerator({ title, description, keyPointArray }: Feature) {
  return (
    <Flex flexDirection="column" w={{ base: '80vw', md: '45vw' }}>
      <Text
        w={{ base: '80vw', md: '45vw' }}
        fontSize={{ base: '24px', md: '40px', lg: '48px' }}
        color="black"
        fontWeight="bold"
        mb="1.1vw"
        lineHeight="normal"
      >
        {title}
      </Text>

      <Text
        w={{ base: '80vw', md: '30vw' }}
        mb={{ base: '5vw', md: '2vw', lg: '1.5vw' }}
        fontFamily="Helvetica"
        fontSize={{ base: '14px', md: '14px', lg: '16px' }}
        fontWeight="normal"
        fontStretch="normal"
        fontStyle="normal"
        lineHeight="1.43"
        letterSpacing="normal"
        color="#676b6f"
      >
        {description}
      </Text>

      <Flex flexDirection="column" alignItems="flex-start" mb={1}>
        {keyPointArray.map((keyPoint, index) => (
          <Flex key={index} alignItems="center" gap="0.6vw" mb={{ base: '4vw', md: '1.4vw' }}>
            <Box
              color="#0063e5"
              fontSize={{ base: '6vw', md: '1.8vw' }}
              display="flex"
              alignItems="center"
            >
              <CheckCircleOutlineIcon />
            </Box>
            <Text
              color="black"
              fontSize={{ base: '16px', md: '22px' }}
              fontWeight="bold"
              letterSpacing="normal"
            >
              {keyPoint}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

export default DescriptionGenerator;
