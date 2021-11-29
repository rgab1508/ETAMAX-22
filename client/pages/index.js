import { Box, Center, Text, Flex } from "@chakra-ui/react";
import Background from "../components/Background";
// import LoginForm from "../components/LoginForm";
import Layout from "../components/layout/Layout";

export default function Home() {
  return (
    <>
      <Background />
      <Flex
        bg="transparent"
        minH="100vh"
        minW="100vw"
        fontSize="2xl"
        fontWeight="bold"
        flexDirection="column"
      >
        <Layout>
          <Center bg="rgb(0,0,0,0.5)" h="100vh" w="100%">
            <Box w="80%">
              <Text fontSize="6xl" color="white">
                ETAMAX-22 FLEUR
              </Text>
            </Box>
          </Center>
        </Layout>
      </Flex>
      {/* <LoginForm /> */}
    </>
  );
}
