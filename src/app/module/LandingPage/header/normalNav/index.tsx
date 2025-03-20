'use client'

import React from 'react'
import { Center, Flex, Heading, Link } from "@chakra-ui/react";

function NormalNav() {
  return (
    <Flex as="nav" justify="space-between" align="center">
         {/* Trademark */}
         <Heading
           fontSize={{ base: "2xl", lg: "3xl" }}
           fontWeight="bold"
           color="#066FFB"
           padding={{ base: 2, lg: 10 }}
         >
           IFA TRANSLATOR
         </Heading>
         {/* End Trademark */}
         {/*navlink*/}
 
         <Flex fontSize="2xl" gap={8} hideBelow="xl">
           <Link fontSize="xl" color="black" fontWeight="bold">
             Home
           </Link>
           <Link fontSize="xl" color="black" fontWeight="bold">
             Product Function
           </Link>
           <Link fontSize="xl" color="black" fontWeight="bold">
             Pricing Schema
           </Link>
           <Link fontSize="xl" color="black" fontWeight="bold">
             Contact Us
           </Link>
         </Flex>
 
         {/* right sign in / get start btns */}
         <Flex gap={8} mr={10} hideBelow="xl">
           <Link fontSize="xl" color="black" fontWeight="bold">
             Sign In
           </Link>
           <Link
             fontSize="xl"
             background="black"
             color="white"
             fontWeight="bold"
             borderRadius="full"
             px={8}
             py={4}
             href='/signup'
           >
             Get Started
           </Link>
         </Flex>
       </Flex>
  )
}

export default NormalNav