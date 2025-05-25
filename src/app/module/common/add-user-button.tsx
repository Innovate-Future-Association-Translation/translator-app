import React from 'react';
import { Button, Image, Text, Flex } from '@chakra-ui/react';

interface AddUserProps {
  backgroundColor: string;
  information: string;
  addUserAPI?: () => void;
}

function AddUserButton({ backgroundColor, information, addUserAPI }: AddUserProps) {
  return (
    <Button
      bgColor={backgroundColor}
      onClick={addUserAPI}
      borderRadius="18px"
      px="16px"
      py="8px"
      _hover={{ bg: '#F0F0F0' }}
      _active={{ bg: '#046ffb' }}
    >
      <Flex alignItems="center" gap="8px">
        <Image src="/navbar-icon/user.svg" w="20px" h="20px" alt="add-user-in-the-meeting" />
        <Text fontWeight="normal" fontSize="14px" color="#fff">
          {information}
        </Text>
      </Flex>
    </Button>
  );
}

export default AddUserButton;
