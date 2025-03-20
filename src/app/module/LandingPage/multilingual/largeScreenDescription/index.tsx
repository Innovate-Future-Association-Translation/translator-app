import React from "react";
import { Stack,Heading,Box } from "@chakra-ui/react";

function LargeScreenDescription() {
  return (
         <Stack
           mr={20}
           mt={20}
           flex="1"
           pl={4}
           pr={4}
           bg="white"
           borderRadius="3xl"
           h="auto"
           className="leftContainer"
           alignItems="baseline"
           display={{ base: "none", lg: "flex" }}
         >
           <Heading size="3xl" mt={5} flex="1" color="black" fontWeight="bold">
             Multilingual Classroom Discussion
           </Heading>
   
           <Box flex="1" justifyContent="center">
             <Box fontWeight="bold" m={3} color="black">
               Real-time Speech Translation
             </Box>
             <Box fontWeight="bold" m={3} color="black">
               Smart Speaker Recognition
             </Box>
             <Box fontWeight="bold" m={3} color="black">
               Seamless Language Switching
             </Box>
           </Box>
         </Stack>
  )
}

export default LargeScreenDescription