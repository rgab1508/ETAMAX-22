import { Box, Center, Text, Flex } from "@chakra-ui/react";
import Background from "../components/Background";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  // Parallax effect for the background

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
        <Navbar />
        <Center bg="rgb(0,0,0,0.5)" h="100vh" w="100%">
          <Box w="80%">
            <Text fontSize="6xl" color="white">
              ETAMAX-22 FLEUR
            </Text>
          </Box>
        </Center>
      </Flex>
      <LoginForm />
    </>
  );
}
