import React from "react";
import B1 from "../public/assets/sponsors/b1.jpg";
import B2 from "../public/assets/sponsors/b2.jpeg";
import B3 from "../public/assets/sponsors/b3.jpg";
import Image from "next/image";
import { Box, Center, Flex, Heading } from "@chakra-ui/react";
import Carousal from "./Carousal";

const Sponsors = () => {
  const banners = [
    <Image className="sponsor-image" src={B1} />,
    <Image className="sponsor-image" src={B2} />,
    <Image className="sponsor-image" src={B3} />,
  ];

  return (
    <Center
      bgGradient={"linear(to-b,rgb(252, 193, 203,0.6),#fcc0cb)"}
      pt="5"
      pb="10"
    >
      <Flex w={["90%", "90%", "90%", "90%"]} flexDir={"column"}>
        <Box my={5}>
          <Heading color="white" fontSize={["3xl", "4xl", "5xl", "5xl"]}>
            Our Sponsors
          </Heading>
        </Box>
        <Flex h="auto" borderRadius={"2rem"} overflow="hidden">
          <Carousal allowPagination={true} items={banners} />
        </Flex>
      </Flex>
    </Center>
  );
};

export default Sponsors;
