"use client";

import React from "react";
import { Suspense } from "react";
import { Box, Flex, Image, useBreakpointValue, } from "@chakra-ui/react";

import { Navbar } from "@/app/module/common/navbar";
import { SignInForm } from "../module/sign-in-page/sign-in-form";

// Default export for the Sign In page
export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}

// Sign In page content component
function SignInContent() {
  const showImage = useBreakpointValue({ base: false, lg: true });

  return (
    <Box w="100%" h="100vh" overflow="hidden" bg="white">
      {/* Top navigation bar */}
      <Navbar />
      {/* Main content area */}
      <Flex w="100%" h="calc(100vh - 60px)"> {/* Adjust height for Navbar */}
        {/* Left form area - centered */} 
        <Flex 
          w={{ base: "100%", lg: "55%" }} 
          px={4} 
          py={8} 
          overflowY="auto"
          maxH="calc(100vh - 60px)"
          align="center" 
          justify="center" 
        >
          <Box maxW="md" w="full"> {/* Limit form width */} 
            {/* Sign In Form Component */}
            <SignInForm />
          </Box>
        </Flex>
        {/* Right image area - displayed on lg screens and up */}
        {showImage && (
          <Flex 
            w={{ base: "0", lg: "45%" }} 
            h="100%" 
            position="relative" 
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src="/signinPage.png"
              alt="Sign In Visual"
              objectFit="cover" 
              w="80%"
              h="90%"
            />
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
