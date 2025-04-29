'use client';

import { ReactNode } from 'react';
import { Flex, Box } from '@chakra-ui/react';
import TemporarySideNavBar from '../module/dashboard/navigation-side-bar-temp';
import { UserProvider } from '../../context/userContext';
import { MeetingProvider } from '@/context/meetingContext';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <UserProvider>
      <MeetingProvider>
        <Flex minH="100vh" flexDirection="row">
          <Box width="6vw" bg="white" boxShadow="md" display={{ base: 'none', md: 'block' }}>
            <TemporarySideNavBar />
          </Box>
          <Box
            flex="1"
            p={6}
            bgImage={{ base: 'none', md: "url('/dashboard/dashboard-background-img-small.png')" }}
            bgSize="cover"
          >
            {children}
          </Box>
        </Flex>
      </MeetingProvider>
    </UserProvider>
  );
}
