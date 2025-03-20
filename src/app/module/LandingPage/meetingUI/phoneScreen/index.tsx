import { Box, Flex, Grid } from "@chakra-ui/react";
import MicNoneIcon from "@mui/icons-material/MicNone";
import EmergencyRecordingIcon from "@mui/icons-material/MicNone";
import LocalPhoneIcon from "@mui/icons-material/MicNone";
export default function IPhoneScreen() {
  return (
    <Box
      // width={{ base: "280px", md: "360px", lg: "400px" }}
      height="50vh"
      width="auto"
      borderRadius="3xl"
      backgroundColor="white"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="10px"
        left="50%"
        transform="translateX(-50%)"
        width="60px"
        height="5px"
        backgroundColor="gray.500"
        borderRadius="50px"
      />

      <Box
        width="100%"
        height="100%"
        backgroundColor="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box fontSize="xl" color="gray.700">
          <Box
            p={6}
            bg="black"
            borderRadius="4xl"
            w="70vw"
            h="50vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            className="meeting-screen-simulation"
          >
            <Grid
              className="4-users-screen"
              templateColumns="repeat(2, 1fr)"
              gap={4}
              p={4}
              w="100%"
              h="100%"
            >
              <Box bg="#C6C2C2" h="100%" borderRadius="4xl"></Box>
              <Box bg="#C6C2C2" h="100%" borderRadius="4xl"></Box>
              <Box bg="#C6C2C2" h="100%" borderRadius="4xl"></Box>
              <Box bg="#C6C2C2" h="100%" borderRadius="4xl"></Box>
            </Grid>

            {/* 3 buttons simulation */}
            <Flex className="3-buttons-section" mt={5} gap={4}>
              <Box
                bg="#FEFFFF"
                rounded="full"
                w={50}
                height={50}
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
              <Box
                bg="#FEFFFF"
                rounded="full"
                w={50}
                height={50}
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
              <Box
                bg="#FF333A"
                rounded="full"
                w={50}
                height={50}
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
