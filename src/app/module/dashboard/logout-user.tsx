import { Text, Box, Spinner } from '@chakra-ui/react';
function LogoutUser() {
  return (
    <Box textAlign="center">
      <Spinner size="xl" />
      <Text>User Signing out</Text>
    </Box>
  );
}

export default LogoutUser;
