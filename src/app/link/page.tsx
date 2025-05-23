'use client';
import { useUser } from '@/context/userContext';
import Sidebar from '../module/dashboard/sidebar';
import Footer from '../module/dashboard/footer';
import { Box, Flex } from '@chakra-ui/react';
const LinkPage = () => {
  const { user } = useUser();
  return (
    <div>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        bgImage="url('/dashboard-bg.png')"
        bgSize="cover"
      >
        <Sidebar />
        <div>This is link welcome {user ? user.name : 'Guest'}</div>
      </Flex>
      <Box display={{ base: 'block', md: 'none' }} px="20px">
        <div>This is link welcome {user ? user.name : 'Guest'}</div>
        <Footer></Footer>
      </Box>
    </div>
  );
};

export default LinkPage;
