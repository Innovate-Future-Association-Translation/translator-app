'use client';

import {
  Drawer,
  Button,
  Box,
  Flex,
  Text,
  Image,
  Avatar,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useRef, useState, useCallback } from 'react';

interface AvatarManagerProps {
  profileImage: string | null;
  onImageChange: (imageUrl: string) => void;
  onImageSelect?: (file: File) => void;
  showSuccessMessage?: (message: string) => void;
}

export default function AvatarManager({
  profileImage,
  onImageChange,
  onImageSelect,
  showSuccessMessage,
}: AvatarManagerProps) {
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const handleAvatarClick = useCallback(() => {
    if (isDesktop) {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } else {
      setIsActionSheetOpen(true);
    }
  }, [isDesktop]);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result as string;
          onImageChange(imageUrl);
          if (showSuccessMessage) {
            showSuccessMessage('Profile image selected. Click Save to apply changes.');
          }
        };
        reader.readAsDataURL(file);
        if (onImageSelect) {
          onImageSelect(file);
        }
      }
    },
    [onImageChange, onImageSelect, showSuccessMessage]
  );

  const handleTakePicture = useCallback(() => {
    if (showSuccessMessage) {
      showSuccessMessage('Camera would open here in a real mobile app.');
    }
    setIsActionSheetOpen(false);
  }, [showSuccessMessage]);

  const handleChooseFromAlbum = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleCloseActionSheet = useCallback(() => {
    setIsActionSheetOpen(false);
  }, []);

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <Flex justify="center" mt={8} mb={8}>
        <Box onClick={handleAvatarClick} cursor="pointer">
          <Avatar.Root size="2xl">
            {profileImage ? (
              <Avatar.Image src={profileImage} />
            ) : (
              <Avatar.Image src="/avatar-default.svg" />
            )}
          </Avatar.Root>
        </Box>
      </Flex>
      {!isDesktop && (
        <Drawer.Root open={isActionSheetOpen} placement="bottom">
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content borderTopRadius="2xl" p={4} pb={8} bg="white">
              <Drawer.Body p={0}>
                <Flex direction="column" align="center" w="100%">
                  <Flex w="100%" justify="space-around" mb={4}>
                    <Flex
                      direction="column"
                      align="center"
                      gap={2}
                      cursor="pointer"
                      onClick={handleTakePicture}
                    >
                      <Box
                        w="48px"
                        h="48px"
                        bg="#f9f9f9"
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image src="/photo.svg" alt="Take a picture" w="24px" h="24px" />
                      </Box>
                      <Text fontSize="sm" color="gray.700">
                        Take a picture
                      </Text>
                    </Flex>
                    <Flex
                      direction="column"
                      align="center"
                      gap={2}
                      cursor="pointer"
                      onClick={handleChooseFromAlbum}
                    >
                      <Box
                        w="48px"
                        h="48px"
                        bg="#f9f9f9"
                        borderRadius="md"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image src="/album.svg" alt="Photo album" w="24px" h="24px" />
                      </Box>
                      <Text fontSize="sm" color="gray.700">
                        Photo album
                      </Text>
                    </Flex>
                  </Flex>
                  <Button
                    mt={2}
                    variant="outline"
                    w="90%"
                    h="48px"
                    borderRadius="24px"
                    fontWeight="bold"
                    onClick={handleCloseActionSheet}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Drawer.Root>
      )}
    </>
  );
}
