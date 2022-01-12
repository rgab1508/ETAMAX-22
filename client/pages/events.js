import { Box, Flex, Center, Heading, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import EventCard from "../components/cards/EventCards";
import Background from "../components/Background";
import Layout from "../components/layout/Layout";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function Events() {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const dist = window.scrollY;
      document.getElementById(
        "blossom-container"
      ).style.transform = `-translateY(${dist * 1}px)`;
      document.getElementById(
        "background-image"
      ).style.transform = `translateY(${dist * 0.1}px)`;
    });
  }, []);

  // create a simple array of numbers
  const [numbers, setNumbers] = useState([1, 2, 3, 4]);

  return (
    <>
      <Head>
        <title>ETAMAX-22 | Events</title>
      </Head>
      <Layout>
        <Background pageName={"Events"} />
        <Flex
          id="blossom-container"
          flexDir="column"
          h="auto"
          w="100vw"
          maxW="100vw"
        >
          <Flex
            maxW="100vw"
            flexDirection="column"
            h={{ base: "120vh", md: "100vh" }}
          >
            <Center
              h={{ base: "110vh", md: "100vh" }}
              w="100%"
              flexDir={"column"}
            >
              <Box w="80%">
                <Heading color="pink.300" fontSize="6xl">
                  ETAMAX-22{" "}
                  <Text fontSize="8xl" fontFamily="Birthstone Bounce">
                    Fleur
                  </Text>
                </Heading>
              </Box>
              <Box mt={4} w="83%" p="20px">
                <Text
                  fontSize={{ base: "xl", md: "3xl" }}
                  fontWeight={"normal"}
                  color="pink.400"
                >
                  ETAMAX offers you a variety of events to choose from. Feel
                  free to pick any event of your choice from Technical, Cultural
                  and Sports (Only for FCRIT students), but make sure you follow
                  the registration criteria.
                </Text>
              </Box>
            </Center>
          </Flex>
          <Center py="30px" w="100%" minH="60vh" flexDir={"column"} gridGap="4">
            {numbers.map((num) => (
              <Center w="100vw" key={num}>
                <EventCard />
              </Center>
            ))}
          </Center>
        </Flex>
      </Layout>
    </>
  );
}
