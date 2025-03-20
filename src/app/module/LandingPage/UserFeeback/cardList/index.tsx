import React from "react";

import {
  Avatar,
  Button,
  Card,
  Flex,
  For,
  Stack,
  Text,
  HStack,
  Heading,
  Box,
} from "@chakra-ui/react";

interface User {
  id: number;
  name: string;
  role: string;
  text: string;
}

interface UserListProps {
  users: User[];
}

function CardList({ users }: UserListProps) {
  return (
    <Flex flexDirection="row" gap="2vw">
      {users.map((user) => (
        <Card.Root
          key={user.id}
          width="25vw"
          height="20vh"
          borderRadius="2xl"
          border="none"
        >
          <Card.Body
            gap="4"
            bg="#F7F8FA"
            borderRadius="2xl"
            boxShadow="xl"
            border="none"
          >
            <HStack mb="6" gap="2" padding={2}>
              <Avatar.Root>
                <Avatar.Image bg="#grey" />
              </Avatar.Root>
              <Stack>
                <Text fontWeight="semibold" textStyle="sm">
                  {user.name}
                </Text>
                <Text color="fg.muted" textStyle="sm">
                  {user.role}
                </Text>
              </Stack>
            </HStack>
            <Card.Description padding={4}>{user.text}</Card.Description>
          </Card.Body>
        </Card.Root>
      ))}
    </Flex>
  );
}

export default CardList;
