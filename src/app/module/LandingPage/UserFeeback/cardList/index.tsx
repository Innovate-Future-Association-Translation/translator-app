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
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: "2vh", md: "2vw" }}
    >
      {users.map((user) => (
        <Card.Root
          key={user.id}
          width={{ base: "80vw", sm: "75vw", md: "25vw" }}
          height="20vh"
          borderRadius="2xl"
          border="none"
          gap={{ base: "2vh", sm: "2vh", md: "3vw" }}
        >
          <Card.Body
            gap={{ base: "1", sm: "2", md: "4" }}
            bg="#F7F8FA"
            borderRadius="2xl"
            boxShadow="xl"
            border="none"
          >
            <HStack mb={{base:"2",  lg:"6"}} padding={2}>
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
            <Card.Description
              paddingLeft={{ base: "0", md: "30px" }}
              paddingRight={{ base: "0", md: "30px" }}
              paddingBottom={{ base: "0", md: "10px" }}
              fontFamily="Helvetica"
              fontSize={{base:"sm",md:"normal"}}
            >
              {user.text}
            </Card.Description>
          </Card.Body>
        </Card.Root>
      ))}
    </Flex>
  );
}

export default CardList;