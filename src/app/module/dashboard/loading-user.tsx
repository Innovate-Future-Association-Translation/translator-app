import { Text, Box, Spinner } from '@chakra-ui/react';
function LoadingUser() {
  return (
    <Box textAlign="center">
      <Spinner size="xl" />
      <Text>Loading user data...</Text>
    </Box>
  );
}

export default LoadingUser;
