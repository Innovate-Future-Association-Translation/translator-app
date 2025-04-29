'use client';
import React from 'react';
import { Stack, Box, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import NavIconButton from '../common/nav-icon-button';

function TemporarySideNavBar() {
  const router = useRouter();
  return (
    <Stack w="6vw" h="100vh" bgColor="#E9EEFF" zIndex={1} gap={6} align="center" pt={10}>
      <Image
        w="2.5vw"
        h="2.5vw"
        src="/business-logo-middle.png"
        bg="transparent"
        mb="4vw"
        onClick={() => router.push('/dashboard/home')}
        alt="business-logo"
      />

      <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
        <NavIconButton
          src="/navbar-icon/Home.svg"
          bg="transparent"
          onClick={() => router.push('/dashboard/home')}
        />
        <Text>Home</Text>
      </Box>
      <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
        <NavIconButton
          src="/navbar-icon/scan.svg"
          bg="transparent"
          onClick={() => router.push('/dashboard/home')}
        />
        <Text>Scan</Text>
      </Box>
      <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
        <NavIconButton
          src="/navbar-icon/toolbox.svg"
          bg="transparent"
          onClick={() => router.push('/dashboard/home')}
        />
        <Text>Toolbox</Text>
      </Box>
      <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
        <NavIconButton
          src="/navbar-icon/user.svg"
          bg="transparent"
          onClick={() => router.push('/dashboard/home')}
        />
        <Text>Profile</Text>
      </Box>
    </Stack>
  );
}

export default TemporarySideNavBar;
