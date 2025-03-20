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
  Image,
  Box,
} from "@chakra-ui/react";
import Textbox from "../translationFeatures/textBox";

import React from "react";
import { wrap } from "module";
import SmallScreenDescription from "./smallScreenDescription";
import LargeScreenDescription from "./largeScreenDescription";
const messages = [
  {
    id: 1,
    name: "hun",
    text: "IFA Translator ensures that all participants can instantly read subtitles in their native language, making the meeting more efficient!",
    translated:
      "IFA Translator 让所有与会者都能即时阅读母语字幕，让会议更高效！",
  },
  {
    id: 2,
    name: "wang",
    text: "在大学的学习小组中",
    translated: "在大学的学习小组中",
  },
  {
    id: 3,
    name: "Liujd",
    text: "Mettre l’accent sur l’intelligence, le temps réel, la sécurité et la commodité des produits.",
    translated: "强调产品的智能化、实时性、安全性和便捷性。",
  },
  {
    id: 4,
    name: "Liujd",
    text: "提供画像信息によると、メインページは、以下の主要なモジュールです",
    translated: "根据提供的图片信息，首页包含以下主要模块。",
  },
];

function Multilingual() {
  return (
    <Flex
      className="mainContainer"
      h="auto"
      mb="12vh"
      mt="8vh"
      flexWrap={{ md: "wrap", lg: "nowrap" }}
      justifyContent="center"
    >

      <SmallScreenDescription></SmallScreenDescription>
      <LargeScreenDescription></LargeScreenDescription>



      <Flex
        m={20}
        p={4}
        bg="white"
        border="1px grey"
        borderRadius="4xl"
        h="auto"
        flex="2"
        className="rightConatiner"
        boxShadow="2xl"
        display={{ base: "none", sm: "flex" }}
      >
        <Stack m={0} flex="1" gap={0} borderRadius="3xl">
          <Card.Root
            width="100%"
            flex="1"
            bg="#F5F5F5"
            p={2}
            borderRadius="3xl"
          >
            {messages.map((element) => (
              <Card.Body key={element.id} gap="3" mb={2} bg="gray.100">
                <Flex flexDirection="row" alignItems="center">
                  <Avatar.Root m="1">
                    <Avatar.Image bg="#D8D9D8" />
                  </Avatar.Root>
                  <Text textStyle="sm">{element.name}</Text>
                </Flex>
                <Card.Description ml={8}>{element.text}</Card.Description>
              </Card.Body>
            ))}
          </Card.Root>
        </Stack>

        <Stack m={0} flex="1" borderRadius="3xl">
          <Card.Root width="100%" bg="white" borderRadius="3xl">
            <Text
              m="3"
              w="30%"
              h="auto"
              color="black"
              bg="#E9EAEA"
              rounded="4xl"
              padding={2}
              fontSize="smaller"
              textAlign="center"
            >
              转化为中文
            </Text>
            {messages.map((element) => (
              <Card.Body key={element.id} mb={2}>
                <Flex flexDirection="row" alignItems="center">
                  <Avatar.Root m="3">
                    <Avatar.Image bg="#D8D9D8" />
                  </Avatar.Root>
                  <Text>{element.name}</Text>
                </Flex>
                <Card.Description ml={8}>{element.translated}</Card.Description>
              </Card.Body>
            ))}
          </Card.Root>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default Multilingual;
