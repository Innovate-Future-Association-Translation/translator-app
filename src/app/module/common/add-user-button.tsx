import React from 'react';
import { Button, Text, Flex } from '@chakra-ui/react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

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
        <PersonAddAltIcon />
        <Text fontWeight="normal" fontSize="14px" color="#fff">
          {information}
        </Text>
      </Flex>
    </Button>
  );
}

export default AddUserButton;
