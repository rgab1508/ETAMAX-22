import React from "react";
import { Flex, Center, Heading, Box } from "@chakra-ui/react";
import EventCards from "./cards/FeaturedEventCard";
import Carousal from "./Carousal";

export default function FeaturedEvents({ events }) {
  const list = events.map((event) => <EventCards event={event} />);

  return (
    <Center w="100%" pt="5" pb="10" flexDir={"column"}>
      <Flex w="90%" flexDir={"column"}>
        <Box my={5}>
          <Heading color="#fcc1cb" fontSize={["3xl", "4xl", "5xl", "5xl"]}>
            Featured Events
          </Heading>
        </Box>
        <Center borderRadius={"1rem"} overflow="hidden" gridGap={"3"}>
          <Carousal items={list} />
        </Center>
      </Flex>
    </Center>
  );
}
