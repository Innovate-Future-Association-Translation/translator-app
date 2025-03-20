'use client'
import { Collapsible, Link, Stack } from "@chakra-ui/react";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import FunctionsIcon from "@mui/icons-material/Functions";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CallIcon from "@mui/icons-material/Call";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import React from "react";

const menuItems = [
  { label: "Home", icon: <HomeIcon />, hoverColor: "#066FFB" },
  { label: "Product Function", icon: <FunctionsIcon />, hoverColor: "#066FFB" },
  { label: "Pricing Schema", icon: <AttachMoneyIcon />, hoverColor: "#066FFB" },
  { label: "Contact Us", icon: <CallIcon />, hoverColor: "#066FFB" },
  { label: "Get Start", icon: <HowToRegIcon/>, hoverColor: "#066FFB" },
  { label: "Sign In", icon: <ExitToAppIcon />, hoverColor: "#066FFB" },
];

function NavDrawer() {
  return (
    <Collapsible.Root>
      <Collapsible.Trigger>
        <ListIcon sx={{ color: "#212121" }} />
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Stack minH="100vh" gap="8vh">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href="/signup"
              fontSize="sm"
              color="black"
              fontWeight="bold"
              mt={index === 0 ? "5vh" : "0"}
              _hover={{
                fontSize: "lg",
                color: item.hoverColor,
                transform: "scale(1.05) translateX(20px)",
                
                transition: "0.2s ease-in-out",
              }}
            >
              {item.icon} {item.label}
          
            </Link>
          ))}
        </Stack>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default NavDrawer;