import React from "react";

import B1 from "../public/assets/sponsors/b1.jpg";
import B2 from "../public/assets/sponsors/b2.jpeg";
import B3 from "../public/assets/sponsors/b3.jpg";
import Image from "next/image";
import { Box, Flex, Heading } from "@chakra-ui/react";
import Carousal from "./Carousal";

const Sponsors = () => {
  const banners = [
    <Image className="sponsor-image" src={B1} />,
    <Image className="sponsor-image" src={B2} />,
    <Image className="sponsor-image" src={B3} />,
  ];

  return (
    <Flex bg="#fcc0cb" pt="5" pb="10">
      <Flex mx="auto" w={["90%", "90%", "80%", "80%"]} flexDir={"column"}>
        <Box my={3}>
          <Heading fontSize={["3xl", "4xl", "5xl", "5xl"]}>
            Our Sponsors
          </Heading>
        </Box>
        <Flex borderRadius={"2rem"} overflow="hidden">
          <Carousal items={banners} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Sponsors;
