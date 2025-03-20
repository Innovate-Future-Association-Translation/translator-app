import React from "react";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import NavDrawer from "./drawerNav";

import NormalNav from "./normalNav";

export default function Header() {
  return (
    <Box w="100%" alignItems="center" mx="auto" className="nav-bar">
      <NormalNav></NormalNav>
      <Box
        display={{ base: "block", xl: "none" }}
        position="absolute"
        zIndex="999"
        minW="100vw"
        left={2}
        mt={2}
        bg="#F4F5F5"
      >
      <NavDrawer></NavDrawer>
      </Box>
    </Box>
  );
}
