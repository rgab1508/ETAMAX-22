import { Box, Center, Heading, Flex, Text } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import Flower from "../components/Flower";
// import { randNum } from "../components/utils/utils";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import Background from "../components/Background";
import "@fontsource/birthstone-bounce";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function Home() {
  // useEffect(() => {
  //   window.addEventListener("mousedown", function (e) {
  //     var amt = randNum(1, 3);
  //     for (var i = 0; i < amt; i++) {
  //       var top = randNum(e.clientY - 30, e.clientY + 30);
  //       var left = randNum(e.clientX - 30, e.clientX + 10);
  //       var flower = new Flower({
  //         top: top,
  //         left: left,
  //       });
  //     }
  //   });

  //   return () => {
  //     window.removeEventListener("mousedown", () => {
  //       console.log("removed");
  //     });
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>ETAMAX-22 | Home</title>
      </Head>
      <Layout>
        <Background />
        <Flex
          id="blossom-container"
          bg="transparent"
          h="100vh"
          minW="100vw"
          flexDirection="column"
        >
          <Center h="60vh" w="100%">
            <Box w="80%">
              <Heading color="pink.300" fontSize="6xl">
                ETAMAX-22{" "}
                <Text fontSize="8xl" fontFamily="Birthstone Bounce">
                  Fleur
                </Text>
              </Heading>
            </Box>
          </Center>
        </Flex>
        <Flex h="100vh" minW="100vw" bg="#fcc0cb">
          Events and sponsors here
        </Flex>
      </Layout>
    </>
  );
}
