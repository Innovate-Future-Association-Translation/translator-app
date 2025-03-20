"use client";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import React from "react";
import Textbox from "./textBox";
import SimpleThreeRow from "./smallScreenFeatureList";

function TranslationFeatures() {
  return (
    <>
      <Box display={{ base: "block", lg: "none" }}>
        <SimpleThreeRow />
      </Box>


      <Box display={{ base: "none", lg: "block" }}>
        <Grid
          w="100%"
          minH="40%"
          gap={6} 
          templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }} 
          justifyContent="center"
        >
          <GridItem>
            <Textbox
              bg="#FFFAEF"
              headerText="Support 50+ Languages"
              text="Effortless multilingual communication across various scenarios and audiences."
              box_h="20vh"
              box_w="100%"
            />
          </GridItem>
          <GridItem>
            <Textbox
              bg="#F1F7FF"
              headerText="AI Smart Translation"
              text="High-accuracy, instant language conversion."
              box_h="20vh"
              box_w="100%"
            />
          </GridItem>
          <GridItem>
            <Textbox
              bg="#FFF3F2"
              headerText="Multiple Translation Modes"
              text="Supports voice, text, image, and screen translation."
              box_h="20vh"
              box_w="100%"
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default TranslationFeatures;