import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface ErrorLoadingUserProps {
  error: string | null;
}

function ErrorLoadingUser({ error }: ErrorLoadingUserProps) {
  return (
    <Box textAlign="center" color="red.500">
      <Text>{error}</Text>
    </Box>
  );
}

export default ErrorLoadingUser;
