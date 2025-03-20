"use client";

import { ReactElement } from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import GTranslateIcon from '@mui/icons-material/GTranslate';


import SmartToyIcon from '@mui/icons-material/SupportAgent';
interface FeatureProps {
  title: string;
  text: string;
    icon: ReactElement
  bgColor: string;
  iconBg :string;
}

const Feature = ({ title, text, bgColor ,icon ,iconBg}: FeatureProps) => {
  return (
    <Stack bg={bgColor} borderRadius="4xl" p={4}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
      bg={iconBg}
          boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600} color="black">
        {title}
      </Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeRow() {
  return (
    <Box p={4} mt={8}>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>
        <Feature
          title={"Support 50+ Languages"}
          text={
            "Effortless multilingual communication across various scenarios and audiences."
          }
          bgColor="#FFFAEF"
          icon={<SupportAgentIcon fontSize="large"/>}
          iconBg="linear-gradient(135deg, #FFFAEF, #FFD700)"
        />
        <Feature
          title={"AI Smart Translation"}
          text={"High-accuracy, instant language conversion."}
          bgColor="#F1F7FF"
          icon={<SmartToyIcon fontSize="large"/>}
          iconBg="linear-gradient(135deg, #F1F7FF, #2C7DF7)"
        />
        <Feature
          title={"Multiple Translation Modes"}
          text={"Supports voice, text, image, and screen translation."}
          bgColor="#FFF3F2"
          icon={<GTranslateIcon fontSize="large"/>}
          iconBg="linear-gradient(135deg, #FFF3F2, #F0A6CA)"
        />
      </SimpleGrid>
    </Box>
  );
}
