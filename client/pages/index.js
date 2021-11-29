import { Box, Center, Text, Flex } from "@chakra-ui/react";
import Background from "../components/Background";
/* import LoginForm from "../components/LoginForm"; */
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Flower from "../components/Flower";
import { randNum } from "../components/utils/utils";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function Home() {
  // Parallax effect for the background
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener("mousedown", function(e) {
      var amt = randNum(1, 5);
      for (var i = 0; i < amt; i++) {
        var top = randNum(e.clientY - 30, e.clientY + 30);
        var left = randNum(e.clientX - 30, e.clientX + 10);
        var flower = new Flower({
          top: top,
          left: left,
        });
      }
    });
  }, []);

  return (
    <>
      {/* <Background /> */}
      <Flex
        bg="transparent"
        minH="100vh"
        minW="100vw"
        fontSize="2xl"
        fontWeight="bold"
        id="blossom-container"
      >
        <Center bgColor="pink.50" h="100vh" w="100%">
          <Box w="80%">
            <Text fontSize="6xl">ETAMAX-22 FLEUR</Text>
          </Box>
        </Center>
      </Flex>
      {/*    <LoginForm /> */}
    </>
  );
}
