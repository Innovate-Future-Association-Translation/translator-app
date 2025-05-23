'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import DesktopHomePage from '@/app/module/dashboard/home/desktopHomePage';
import MobileHomePage from '@/app/module/dashboard/home/mobileHomePage';

export default function HomePage() {
  return (
    <div>
      <Box display={{ base: 'none', md: 'block' }} flex="1">
        <DesktopHomePage />
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <MobileHomePage />
      </Box>
    </div>
  );
}
