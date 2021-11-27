import { Box, Center, Text } from "@chakra-ui/react";
import Background from "../components/Background";

export default function Home() {
  return (
    <>
      <Background />
      <Center
        bg="rgb(0,0,0,0.5)"
        minH="100vh"
        minW="100vw"
        fontSize="2xl"
        fontWeight="bold"
      >
        <Box w="80%">
          <Text fontSize="6xl" color="white">
            ETAMAX-22
          </Text>
        </Box>
      </Center>
    </>
  );
}
