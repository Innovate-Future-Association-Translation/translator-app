'use client';
import Sidebar from '../../module/dashboard/sidebar'; // Adjusted path
import { Box, Flex, Text } from '@chakra-ui/react';
const Profile = () => {
  return (
    <Box>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        bgImage="url('/dashboard-bg.png')"
        bgSize="cover"
      >
        <Sidebar />
        <Text>Profile</Text>
      </Flex>
    </Box>
  );
};

export default Profile;
