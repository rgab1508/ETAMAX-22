import { useState, useEffect } from "react";
import { Box, Center, Flex, Heading, Image } from "@chakra-ui/react";
import Carousal from "./Carousal";

const Sponsors = () => {
  const bans = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
    <Image
      borderRadius={"15px"}
      mb={5}
      align={"center"}
      src={`/assets/sponsors/${num}.png`}
    />
  ));

  const [banners, setBanners] = useState([]);
  useEffect(() => {
    setBanners([...bans]);
  }, []);

  const breakpoints = {
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    620: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
  };

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
        <Flex my={4} h="auto" overflow="hidden">
          <Carousal
            breakpoints={breakpoints}
            allowPagination={true}
            items={banners}
          />
        </Flex>
      </Flex>
    </Center>
  );
};

export default Sponsors;
