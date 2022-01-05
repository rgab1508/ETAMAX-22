import { Box, Flex, Center } from "@chakra-ui/react";
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
        <Background />
        <Flex
          id="blossom-container"
          maxW="100vw"
          flexDirection="column"
          h="100vh"
        ></Flex>
        <Center w="100%" minH="60vh" flexDir={"column"} gridGap="2">
          {numbers.map((num) => (
            <EventCard />
          ))}
        </Center>
      </Layout>
    </>
  );
}
