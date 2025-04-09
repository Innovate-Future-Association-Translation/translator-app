import React from "react";
import CardList from "./cardList";

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
import Textbox from "../textBox";
import { base } from "framer-motion/client";

const messages = [
  {
    id: 1,
    name: "Emily",
    role: "International Student",

    text: " The meeting translation feature ensures I never worry about understanding foreign- language meetings again!",
  },
  {
    id: 2,
    name: "David",
    role: "Cross-Border E-commerce Seller",
    text: "he live lecture subtitles are amazing-my learning efficiency has increased by 200%!",
  },
  {
    id: 3,
    name: "Kevin",
    role: "Cross-Border E-commerce Seller",
    text: "Mettre l’accent sur l’intelligence, le temps réel, la sécurité et la commodité des produits.",
  },
];

function UserFeeback() {
  return (
    <Stack
      justifyContent="center"
      justifyItems="center"
      alignItems="center"
      gap={4}
    >
      <Box hideBelow="md">
        <Textbox
          bg="white"
          headerText="Trusted by Users Worldwide"
          text="Real user experiences - see what they have to say!"
          box_h="20vh"
          box_w="50vw"
          textColor="grey"
          fontSize="smaller"
        />
      </Box>
      <Stack
        display={{ md: "none" }}
        justifyContent="center"
        alignItems="center"
        gap={{ base: "1", md: "2", lg: "3" }}
      >
        <Heading
          as="h1"
          fontSize={{ base: "2xl", md: "3xl", lg: "6xl" }}
          color="black"
          fontWeight="black"
          textAlign="center"
        >
          "Trusted by Users Worldwide"
        </Heading>
        <Text textAlign="center" color="grey">"Real user experiences - see what they have to say!"</Text>
      </Stack>

      <CardList users={messages}></CardList>
    </Stack>
  );
}

export default UserFeeback;
