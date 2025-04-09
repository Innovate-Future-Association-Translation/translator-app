"use client";

import { ReactElement } from "react";
import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import SmartToyIcon from "@mui/icons-material/SupportAgent";
interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
  bgColor: string;
  iconBg: string;
}

const Feature = ({ title, text, bgColor, icon}: FeatureProps) => {
  return (
    <Stack bg={bgColor} borderRadius="xl" w="28vw" h="17.37vw"
    >
      <Text fontWeight={600} color="black">
        {title}
      </Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeRow() {
  return (
    <>
      <Feature
        title={"Support 50+ Languages"}
        text={
          "Effortless multilingual communication across various scenarios and audiences."
        }
        bgColor="#f7f8fa"
        icon={<SupportAgentIcon fontSize="large" />}
        iconBg="linear-gradient(135deg, #FFFAEF, #FFD700)"
      />
      <Feature
        title={"AI Smart Translation"}
        text={"High-accuracy, instant language conversion."}
        bgColor="#f7f8fa"
        icon={<SmartToyIcon fontSize="large" />}
        iconBg="linear-gradient(135deg, #F1F7FF, #2C7DF7)"
      />
      <Feature
        title={"Multiple Translation Modes"}
        text={"Supports voice, text, image, and screen translation."}
        bgColor="#f7f8fa"
        icon={<GTranslateIcon fontSize="large" />}
        iconBg="linear-gradient(135deg, #FFF3F2, #F0A6CA)"
      />
    </>
  );
}
