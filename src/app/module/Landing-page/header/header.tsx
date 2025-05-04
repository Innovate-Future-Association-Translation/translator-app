import React from 'react';
import { Box } from '@chakra-ui/react';
import DrawerNavbar from './drawer-navbar';
import NormalNav from './desktop-navbar';

export default function Header() {
  return (
    <Box w="100%" alignItems="center" mx="auto" className="nav-bar">
      <NormalNav />
      <Box
        display={{ base: 'block', xl: 'none' }}
        position="absolute"
        zIndex="999"
        minW="100vw"
        left={2}
        mt={2}
        bg="#F4F5F5"
      >
        <DrawerNavbar />
      </Box>
    </Box>
  );
}
