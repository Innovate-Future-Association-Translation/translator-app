import React from "react";
import {
  Text,
  Box,
  Button,
  Avatar,
  Card,
  Stack,
  HStack,
} from "@chakra-ui/react";

interface UserProfile {
  name: string;
  email: string;
  language: string;
  mobile: string;
  selfDescription: string;
  handleLogout: () => void;
}

function UserProfile(userData: UserProfile) {
  const { name, email, language, mobile, selfDescription, handleLogout } =
    userData;
  return (
    <Box
      bg="white"
      minH="100vh"
      minW="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Card.Root width="320px" boxShadow="md" borderRadius="md" padding={5}>
        <Card.Body>
          <HStack mb="6" gap="3">
            <Avatar.Root className={name} />
            <Stack gap="0">
              <Text fontWeight="semibold" fontSize="lg">
                {name}
              </Text>
            </Stack>
          </HStack>

          <Text fontWeight="bold">User Information</Text>
          <Text>Email: {email}</Text>
          <Text>Language: {language}</Text>
          <Text>Self Description: {selfDescription}</Text>
          <Text>Phone: {mobile}</Text>
        </Card.Body>

        <Card.Footer>
          <Button
            variant="solid"
            colorScheme="red"
            width="full"
            py={6}
            borderRadius="md"
            fontSize="lg"
            fontWeight="bold"
            boxShadow="lg"
            _hover={{
              bg: "red.600",
              transform: "scale(1.05)",
              boxShadow: "xl",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}

export default UserProfile;
