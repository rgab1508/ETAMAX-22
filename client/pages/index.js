import { Box, Center, Text, Flex } from "@chakra-ui/react";
import Background from "../components/Background";
import { useState } from "react";

export default function Home() {
  // Parallax effect for the background
  const [scrollY, setScrollY] = useState(0);

  return (
    <>
      <Background />
      <Flex
        bg="transparent"
        minH="100vh"
        minW="100vw"
        fontSize="2xl"
        fontWeight="bold"
      >
        <Center bg="rgb(0,0,0,0.5)" h="100vh" w="100%">
          <Box w="80%">
            <Text fontSize="6xl" color="white">
              ETAMAX-22 FLEUR
            </Text>
          </Box>
        </Center>
      </Flex>
    </>
  );
}
