import Sidebar from '../module/dashboard/sidebar';
import { Box, Flex, Text } from '@chakra-ui/react';
const ScanPage = () => {
  return (
    <Box>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        bgImage="url('/dashboard-bg.png')"
        bgSize="cover"
      >
        <Sidebar />
        <Text>Scan</Text>
      </Flex>
    </Box>
  );
};

export default ScanPage;
