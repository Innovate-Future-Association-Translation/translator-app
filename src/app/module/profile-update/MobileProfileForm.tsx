'use client';

import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FiChevronRight } from 'react-icons/fi';
import { createListCollection } from '@chakra-ui/react';
import { UserData } from '../../profile-update/page';

interface MobileProfileFormProps {
  userData: UserData;
  onEditField: (key: keyof UserData, label: string, type?: 'text' | 'textarea' | 'select') => void;
  onToggleSwitch: () => void;
}

const MobileProfileForm: React.FC<MobileProfileFormProps> = ({
  userData,
  onEditField,
  onToggleSwitch,
}) => {
  const languageCollection = createListCollection({
    items: [
      { value: 'en', label: 'English' },
      { value: 'zh', label: 'Chinese' },
      { value: 'fr', label: 'French' },
      { value: 'ko', label: 'Korean' },
      { value: 'ja', label: 'Japanese' },
      { value: 'ar', label: 'Arabic' },
      { value: 'ru', label: 'Russian' },
      { value: 'th', label: 'Thai' },
    ],
  });

  const rowStyle = {
    width: '100%',
    height: '56px',
    padding: '20px 24px',
    borderBottom: '1px solid',
    borderColor: 'gray.100',
  };

  const getDisplayValue = (key: keyof UserData, placeholder: string = 'Fill in'): string => {
    const value = userData[key];

    if (key === 'language' && typeof value === 'string') {
      const langItem = languageCollection.items.find((item) => item.value === value);
      return langItem ? langItem.label : value;
    }

    if (!value && value !== false) return placeholder;
    return String(value);
  };

  return (
    <>
      <Box
        w="95%"
        borderRadius="16px"
        bg="white"
        overflow="visible"
        mb="12px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
      >
        <Box {...rowStyle}>
          <Flex align="center" h="full">
            <Text color="gray.700" fontSize="sm" width="120px">
              Email
            </Text>
            <Text color="gray.500" fontSize="sm" fontWeight="normal">
              {userData.email}
            </Text>
          </Flex>
        </Box>
        <Box
          {...rowStyle}
          className="editable-field"
          onClick={() => onEditField('userName', 'Username')}
        >
          <Flex align="center" h="full" position="relative" cursor="pointer">
            <Text color="gray.700" fontSize="sm" width="120px">
              Username
            </Text>
            <Text
              color={userData.userName ? 'gray.800' : 'gray.400'}
              fontSize="sm"
              fontWeight="normal"
            >
              {getDisplayValue('userName')}
            </Text>
            <Box position="absolute" right="0">
              <FiChevronRight color="#CBD5E0" size={16} />
            </Box>
          </Flex>
        </Box>
        <Box
          {...rowStyle}
          className="editable-field"
          onClick={() => onEditField('mobile', 'Phone Number')}
        >
          <Flex align="center" h="full" position="relative" cursor="pointer">
            <Text color="gray.700" fontSize="sm" width="120px">
              Phone number
            </Text>
            <Text
              color={getDisplayValue('mobile') !== 'Fill in' ? 'gray.800' : 'gray.400'}
              fontSize="sm"
              fontWeight="normal"
            >
              {getDisplayValue('mobile')}
            </Text>
            <Box position="absolute" right="0">
              <FiChevronRight color="#CBD5E0" size={16} />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box
        w="95%"
        borderRadius="16px"
        bg="white"
        overflow="visible"
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
      >
        <Box
          {...rowStyle}
          className="editable-field"
          onClick={() => onEditField('language', 'Language', 'select')}
        >
          <Flex align="center" h="full" position="relative" cursor="pointer">
            <Text color="gray.700" fontSize="sm" width="120px">
              Language
            </Text>
            <Text
              color={userData.language ? 'gray.800' : 'gray.400'}
              fontSize="sm"
              fontWeight="normal"
            >
              {getDisplayValue('language', 'Select')}
            </Text>
            <Box position="absolute" right="0">
              <FiChevronRight color="#CBD5E0" size={16} />
            </Box>
          </Flex>
        </Box>
        <Box {...rowStyle} borderBottom="none">
          <Flex align="center" h="full" position="relative">
            <Text color="gray.700" fontSize="sm" width="150px">
              Show text or not
            </Text>
            <Box position="absolute" right="0">
              <Box
                as="button"
                role="switch"
                aria-checked={userData.showText}
                w="36px"
                h="20px"
                borderRadius="full"
                bg={userData.showText ? 'blue.500' : 'gray.200'}
                position="relative"
                transition="background 0.2s"
                onClick={onToggleSwitch}
              >
                <Box
                  w="16px"
                  h="16px"
                  bg="white"
                  borderRadius="full"
                  position="absolute"
                  top="2px"
                  left={userData.showText ? '18px' : '2px'}
                  transition="left 0.2s"
                  boxShadow="0px 1px 2px rgba(0, 0, 0, 0.1)"
                />
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box
        w="95%"
        minH="152px"
        mt="12px"
        borderRadius="16px"
        bg="white"
        overflow="visible"
        display="flex"
        flexDirection="column"
        alignItems="center"
        className="editable-field"
        position="relative"
        onClick={() => onEditField('selfDescription', 'Self Description', 'textarea')}
      >
        <Box {...rowStyle} borderBottom="none" width="100%" px={6}>
          <Flex align="flex-start" h="full" position="relative" direction="column" cursor="pointer">
            <Flex align="center" w="full" mb={4} h="24px" justify="space-between">
              <Text color="gray.700" fontSize="sm">
                Self-description
              </Text>
              <Box h="24px" display="flex" alignItems="center">
                <FiChevronRight color="#CBD5E0" size={16} />
              </Box>
            </Flex>
            <Text
              color={userData.selfDescription ? 'gray.800' : 'gray.400'}
              fontSize="sm"
              fontWeight="normal"
            >
              {getDisplayValue('selfDescription')}
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default MobileProfileForm;
