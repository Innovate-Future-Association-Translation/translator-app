'use client';

import { useState, useEffect } from 'react';
import {
  Drawer,
  Button,
  Input,
  Textarea,
  Select,
  createListCollection,
  Box,
  Flex,
  Field,
} from '@chakra-ui/react';
import { FiX, FiChevronDown } from 'react-icons/fi';
import { validateUsername, validatePhoneNumber } from '@/app/validation/profileupdate';

type LanguageItem = {
  value: string;
  label: string;
};

type FieldType = 'text' | 'textarea' | 'select';

type LanguageCollection = ReturnType<typeof createListCollection<LanguageItem>>;

export default function EditFieldDrawer({
  isOpen,
  onClose,
  title,
  value,
  onChange,
  onSave,
  fieldType = 'text',
  languageCollection: passedLanguageCollection,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  value: string;
  onChange: (val: string) => void;
  onSave: () => void;
  fieldType?: FieldType;
  languageCollection?: LanguageCollection;
}) {
  const [localValue, setLocalValue] = useState(value);
  const [countryCode, setCountryCode] = useState('+61');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phoneInvalid, setPhoneInvalid] = useState(false);
  const [usernameInvalid, setUsernameInvalid] = useState(false);

  const COUNTRY_CODES = ['+61', '+86', '+1', '+44', '+81', '+82'];

  const languageCollection =
    passedLanguageCollection ||
    createListCollection({
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

  useEffect(() => {
    if (isOpen) {
      setLocalValue(value);
      setErrorMessage('');
      setPhoneInvalid(false);
      setUsernameInvalid(false);

      if (title.toLowerCase().includes('phone') && value) {
        const countryCodeMatch = value.match(/^\+\d+/);
        if (countryCodeMatch) {
          const code = countryCodeMatch[0];
          const number = value.substring(code.length).trim();
          setCountryCode(code);
          setPhoneNumber(number);
        } else {
          setCountryCode('+61');
          setPhoneNumber(value);
        }
      }
    }
  }, [isOpen, value, title]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLocalValue(e.target.value);

    if (title.toLowerCase().includes('username')) {
      setUsernameInvalid(false);
      setErrorMessage('');
    }
  };

  const handleLanguageChange = (value: string[]) => {
    if (value.length > 0) {
      setLocalValue(value[0]);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    setPhoneNumber(newNumber);
    setPhoneInvalid(false);
    setErrorMessage('');
  };

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
    setShowCountryCodes(false);
    setPhoneInvalid(false);
    setErrorMessage('');
  };

  const validateForm = (): boolean => {
    setErrorMessage('');
    setPhoneInvalid(false);
    setUsernameInvalid(false);

    if (title.toLowerCase().includes('username')) {
      const error = validateUsername(localValue);
      if (error) {
        setErrorMessage(error);
        setUsernameInvalid(true);
        return false;
      }
    }

    if (title.toLowerCase().includes('phone')) {
      const fullNumber = `${countryCode} ${phoneNumber}`.trim();
      const error = validatePhoneNumber(fullNumber);
      if (error) {
        setErrorMessage(error);
        setPhoneInvalid(true);
        return false;
      }
      setLocalValue(fullNumber);
    }

    return true;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (title.toLowerCase().includes('phone')) {
        const fullNumber = `${countryCode} ${phoneNumber}`.trim();
        onChange(fullNumber);
      } else {
        onChange(localValue);
      }
      onSave();
    }
  };

  return (
    <Drawer.Root open={isOpen} placement="bottom">
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content
          borderTopRadius="20px"
          overflow="visible"
          style={{
            maxHeight: fieldType === 'textarea' ? '356px' : 'auto',
            height: fieldType === 'textarea' ? 'auto' : undefined,
            overflow: 'visible',
          }}
        >
          <Flex justify="space-between" align="center" p={4}>
            <Drawer.Title>{title}</Drawer.Title>
            <Box
              as="button"
              onClick={onClose}
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="24px"
              _hover={{ bg: 'gray.100' }}
            >
              <FiX size={16} />
            </Box>
          </Flex>
          <Drawer.Body px={4} pb={4} overflow="visible">
            {fieldType === 'textarea' ? (
              <Textarea
                value={localValue}
                onChange={handleTextChange}
                placeholder="Self-description"
                borderRadius="16px"
                minHeight="100px"
                width="100%"
              />
            ) : fieldType === 'select' ? (
              <Box position="relative" w="100%">
                <Select.Root
                  collection={languageCollection}
                  value={localValue ? [localValue] : []}
                  onValueChange={(details) => handleLanguageChange(details.value)}
                  open={isSelectOpen}
                  onOpenChange={(details) => {
                    setIsSelectOpen(details.open);
                  }}
                  size="md"
                  width="100%"
                  positioning={{
                    placement: 'top-start',
                    fitViewport: true,
                    shift: 8,
                    flip: true,
                  }}
                >
                  <Select.HiddenSelect />
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder={`Select ${title.toLowerCase()}`} />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator>
                        <FiChevronDown />
                      </Select.Indicator>
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner style={{ zIndex: 1200 }}>
                    <Select.Content>
                      {languageCollection.items.map((item) => (
                        <Select.Item key={item.value} item={item}>
                          <Select.ItemText>{item.label}</Select.ItemText>
                          <Select.ItemIndicator>✓</Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </Box>
            ) : title.toLowerCase().includes('phone') ? (
              <Field.Root invalid={phoneInvalid} width="100%">
                <Box
                  h="48px"
                  border="1px solid"
                  borderColor={phoneInvalid ? 'red.500' : 'gray.200'}
                  borderRadius="16px"
                  px={3}
                  bg="white"
                  transition="border-color 0.2s"
                  _focusWithin={{
                    borderColor: phoneInvalid ? 'red.500' : 'blue.500',
                    boxShadow: 'none',
                  }}
                  display="flex"
                  alignItems="center"
                  width="100%"
                  overflow="visible"
                >
                  <Box position="relative" minWidth="70px">
                    <Button
                      variant="ghost"
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      color="gray.800"
                      fontSize="md"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowCountryCodes(!showCountryCodes);
                      }}
                      _focus={{ outline: 'none' }}
                      height="auto"
                      minWidth="0"
                      padding="0"
                    >
                      {countryCode}
                      <Box ml={-2} color="gray.400">
                        <FiChevronDown size={17} />
                      </Box>
                    </Button>
                    {showCountryCodes && (
                      <Box
                        position="fixed"
                        bottom={`calc(48px + ${phoneInvalid ? '45px' : '36px'} + 20px)`}
                        left="15px"
                        zIndex={1200}
                        bg="white"
                        borderRadius="md"
                        boxShadow="lg"
                        border="1px solid"
                        borderColor="gray.200"
                        width="80px"
                      >
                        {COUNTRY_CODES.map((code) => (
                          <Button
                            key={code}
                            variant="ghost"
                            w="full"
                            textAlign="left"
                            px={3}
                            py={2}
                            _hover={{ bg: 'gray.100' }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCountryCodeChange(code);
                            }}
                          >
                            {code}
                          </Button>
                        ))}
                      </Box>
                    )}
                  </Box>
                  <Box h="100%" borderRight="1px solid" borderColor="gray.300" mx={-2} />
                  <Input
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    placeholder="Phone number"
                    fontSize="md"
                    color="gray.800"
                    _placeholder={{ color: 'gray.400' }}
                    border="none"
                    _focus={{ boxShadow: 'none', border: 'none' }}
                    flex="1"
                    width="100%"
                  />
                </Box>
                {phoneInvalid && (
                  <Field.ErrorText color="red.500" fontSize="sm" mt={1}>
                    {errorMessage}
                  </Field.ErrorText>
                )}
              </Field.Root>
            ) : (
              <Field.Root invalid={usernameInvalid} width="100%">
                <Input
                  value={localValue}
                  onChange={handleTextChange}
                  placeholder={title}
                  borderRadius="16px"
                  width="100%"
                  borderColor={usernameInvalid ? 'red.500' : 'gray.200'}
                  _focusWithin={{
                    borderColor: usernameInvalid ? 'red.500' : 'blue.500',
                  }}
                />
                {usernameInvalid && (
                  <Field.ErrorText color="red.500" fontSize="sm" mt={1}>
                    {errorMessage}
                  </Field.ErrorText>
                )}
              </Field.Root>
            )}
          </Drawer.Body>
          <Drawer.Footer px={4} pb={4}>
            <Button
              colorScheme="blue"
              onClick={handleSave}
              w="full"
              borderRadius="24px"
              disabled={phoneInvalid || usernameInvalid}
            >
              Save
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}
