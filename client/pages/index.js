import { Box, Center, Heading, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Flower from "../components/Flower";
import { randNum } from "../components/utils/utils";
import Layout from "../components/layout";
import Head from "next/head";
import Background from "../components/Background";
import "@fontsource/birthstone-bounce";
import Sponsors from "../components/Sponsors";
import FeaturedEvents from "../components/FeaturedEvents";
import { API_BASE_URL } from "../config";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function Home(props) {
  useEffect(() => {
    window.addEventListener("mousedown", function(e) {
      var amt = randNum(1, 3);
      for (var i = 0; i < amt; i++) {
        var top = randNum(e.clientY - 30, e.clientY + 30);
        var left = randNum(e.clientX - 30, e.clientX + 10);
        var flower = new Flower({
          top: top,
          left: left,
        });
      }
    });

    return () => {
      window.removeEventListener("mousedown", () => {
        console.log("removed");
      });
    };
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const dist = window.scrollY;

      let ele = document.getElementById("background-image");
      if (ele) ele.style.transform = `translateY(${dist * 0.1}px)`;
    });
  }, []);
  return (
    <>
      <Head>
        <title>ETAMAX-22 | Home</title>
      </Head>
      <Background pageName={"Home"} />
      <Layout>
        <Flex bg="transparent" h="100vh" maxW="100vw" flexDirection="column">
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
        <FeaturedEvents events={props.events} />
        <Sponsors />
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(`${API_BASE_URL}/e/featured/`).then((response) =>
      response.json()
    );
    return {
      props: {
        events: res.events,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
