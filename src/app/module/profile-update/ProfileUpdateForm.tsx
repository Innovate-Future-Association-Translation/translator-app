'use client';

import React, { useState } from 'react';
import { Box, Flex, Text, Button, Textarea, Input, Select } from '@chakra-ui/react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { createListCollection } from '@chakra-ui/react';
import { UserData } from '../../profile-update/page';

interface ProfileUpdateFormProps {
  userData: UserData;
  editingInline: keyof UserData | null;
  tempValues: Record<string, unknown>;
  onEditField: (key: keyof UserData, label: string, type?: 'text' | 'textarea' | 'select') => void;
  onSaveField: (key: keyof UserData, e?: React.MouseEvent) => void;
  onToggleSwitch: () => void;
  updateTempValue: (key: keyof UserData, value: unknown) => void;
}

export default function ProfileUpdateForm({
  userData,
  editingInline,
  tempValues,
  onEditField,
  onSaveField,
  onToggleSwitch,
  updateTempValue,
}: ProfileUpdateFormProps) {
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const COUNTRY_CODES = ['+61', '+86', '+1', '+44', '+81', '+82'];
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
    if (editingInline === key && tempValues[key] !== undefined) {
      if (key === 'language') {
        const langItem = languageCollection.items.find((item) => item.value === tempValues[key]);
        return langItem ? langItem.label : String(tempValues[key] || placeholder);
      }
      return String(tempValues[key] || placeholder);
    }
    const value = userData[key];
    if (key === 'language' && typeof value === 'string') {
      const langItem = languageCollection.items.find((item) => item.value === value);
      return langItem ? langItem.label : value;
    }
    if (!value && value !== false) return placeholder;
    return String(value);
  };

  const renderInlineEditor = (
    key: keyof UserData,
    label: string,
    type: 'text' | 'textarea' | 'select' = 'text'
  ) => {
    if (editingInline !== key) return null;
    if (type === 'textarea') return null;
    switch (type) {
      case 'text':
        return (
          <Flex gap={2} align="center" flex="1">
            <Input
              value={String(tempValues[key] || '')}
              onChange={(e) => updateTempValue(key, e.target.value)}
              placeholder={label}
              bg="white"
              border="1px solid"
              borderColor="blue.300"
              _focus={{ boxShadow: '0 0 0 1px blue.500' }}
              autoFocus
              flex="1"
            />
            <Button
              size="sm"
              colorScheme="blue"
              onClick={(e) => onSaveField(key, e)}
              className="save-button"
              minW="50px"
            >
              Save
            </Button>
          </Flex>
        );
      case 'select':
        return (
          <Flex gap={2} align="center" flex="1">
            <Select.Root
              collection={languageCollection}
              value={tempValues[key] ? [String(tempValues[key])] : []}
              onValueChange={(details) => {
                const value = details.value[0];
                updateTempValue(key, value);
              }}
              size="sm"
            >
              <Select.HiddenSelect />
              <Select.Control flex="1">
                <Select.Trigger bg="white">
                  <Select.ValueText placeholder="Select language" />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {languageCollection.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      {item.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={(e) => onSaveField(key, e)}
              className="save-button"
              minW="50px"
            >
              Save
            </Button>
          </Flex>
        );
      default:
        return null;
    }
  };

  const renderPhoneInput = () => {
    if (editingInline !== 'mobile') return null;

    const phoneValue =
      tempValues.mobile !== undefined ? String(tempValues.mobile) : userData.mobile || '';
    let countryCode = '+61';
    let phoneNumber = '';

    if (phoneValue) {
      const countryCodeMatch = phoneValue.match(/^\+\d+/);
      if (countryCodeMatch) {
        countryCode = countryCodeMatch[0];
        phoneNumber = phoneValue.substring(countryCode.length).trim();
      } else {
        phoneNumber = phoneValue;
      }
    }

    return (
      <Flex gap={2} alignItems="center" flex="1">
        <Box position="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCountryCodes(!showCountryCodes)}
            bg="white"
            px={2}
          >
            {countryCode}
            <FiChevronDown style={{ marginLeft: '4px' }} />
          </Button>
          {showCountryCodes && (
            <Box
              position="absolute"
              top="100%"
              left="0"
              mt={1}
              zIndex={1000}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
              minWidth={20}
            >
              {COUNTRY_CODES.map((code) => (
                <Button
                  key={code}
                  variant="ghost"
                  size="sm"
                  w="full"
                  textAlign="left"
                  onClick={() => {
                    const currentNumber = phoneNumber || '';
                    const newValue = `${code} ${currentNumber}`.trim();
                    updateTempValue('mobile', newValue);
                    setShowCountryCodes(false);
                  }}
                >
                  {code}
                </Button>
              ))}
            </Box>
          )}
        </Box>
        <Input
          value={phoneNumber}
          onChange={(e) => {
            const newValue = `${countryCode} ${e.target.value}`.trim();
            updateTempValue('mobile', newValue);
          }}
          placeholder="Phone number"
          flex="1"
          size="sm"
          bg="white"
          border="1px solid"
          borderColor="blue.300"
          _focus={{ boxShadow: '0 0 0 1px blue.500' }}
          autoFocus
        />
        <Button
          size="sm"
          colorScheme="blue"
          onClick={(e) => onSaveField('mobile', e)}
          className="save-button"
          minW="50px"
        >
          Save
        </Button>
      </Flex>
    );
  };

  return (
    <>
      <Box
        w="33.33%"
        borderRadius="16px"
        bg="white"
        overflow="visible"
        mb="12px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
        transition="width 0.3s ease"
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
        <Box {...rowStyle} className="editable-field">
          <Flex
            align="center"
            h="full"
            position="relative"
            cursor="pointer"
            onClick={() => onEditField('userName', 'Username')}
          >
            <Text color="gray.700" fontSize="sm" width="120px">
              Username
            </Text>
            {editingInline === 'userName' ? (
              renderInlineEditor('userName', 'Username')
            ) : (
              <>
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
              </>
            )}
          </Flex>
        </Box>
        <Box {...rowStyle} className="editable-field">
          <Flex
            align="center"
            h="full"
            position="relative"
            cursor="pointer"
            onClick={() => onEditField('mobile', 'Phone Number')}
          >
            <Text color="gray.700" fontSize="sm" width="120px">
              Phone number
            </Text>
            {editingInline === 'mobile' ? (
              renderPhoneInput()
            ) : (
              <>
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
              </>
            )}
          </Flex>
        </Box>
      </Box>
      <Box
        w="33.33%"
        borderRadius="16px"
        bg="white"
        overflow="visible"
        display="flex"
        flexDirection="column"
        alignItems="center"
        position="relative"
        transition="width 0.3s ease"
      >
        <Box {...rowStyle} className="editable-field">
          <Flex
            align="center"
            h="full"
            position="relative"
            cursor="pointer"
            onClick={() => onEditField('language', 'Language', 'select')}
          >
            <Text color="gray.700" fontSize="sm" width="120px">
              Language
            </Text>
            {editingInline === 'language' ? (
              renderInlineEditor('language', 'Language', 'select')
            ) : (
              <>
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
              </>
            )}
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
        w="33.33%"
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
        transition="width 0.3s ease"
      >
        <Box {...rowStyle} borderBottom="none" width="100%" px={6}>
          <Flex
            align="flex-start"
            h="full"
            position="relative"
            direction="column"
            cursor="pointer"
            onClick={() => onEditField('selfDescription', 'Self Description', 'textarea')}
          >
            <Flex align="center" w="full" mb={4} h="24px" justify="space-between">
              <Text color="gray.700" fontSize="sm">
                Self-description
              </Text>
              {editingInline === 'selfDescription' ? (
                <Button
                  size="sm"
                  colorScheme="blue"
                  onClick={(e) => onSaveField('selfDescription', e)}
                  className="save-button"
                  minW="50px"
                  h="24px"
                >
                  Save
                </Button>
              ) : (
                <Box h="24px" display="flex" alignItems="center">
                  <FiChevronRight color="#CBD5E0" size={16} />
                </Box>
              )}
            </Flex>
            {editingInline === 'selfDescription' ? (
              <Box className="inline-editor" w="full">
                <Textarea
                  className="editing-textarea"
                  value={String(tempValues.selfDescription || '')}
                  onChange={(e) => {
                    updateTempValue('selfDescription', e.target.value);
                    setTimeout(() => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }, 0);
                  }}
                  placeholder="Self Description"
                  bg="white"
                  border="1px solid"
                  borderColor="blue.300"
                  _focus={{ boxShadow: '0 0 0 1px blue.500' }}
                  resize="none"
                  minH="60px"
                  autoFocus
                />
              </Box>
            ) : (
              <Text
                color={userData.selfDescription ? 'gray.800' : 'gray.400'}
                fontSize="sm"
                fontWeight="normal"
              >
                {getDisplayValue('selfDescription')}
              </Text>
            )}
          </Flex>
        </Box>
      </Box>
    </>
  );
}
