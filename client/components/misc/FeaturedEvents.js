import { useState, useEffect } from "react";
import { Flex, Center, Heading, Box } from "@chakra-ui/react";
import EventCards from "../cards/FeaturedEventCard";
import Carousal from "./Carousal";

export default function FeaturedEvents({ events }) {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    if (events) {
      const list = events
        .sort((e1, e2) => {
          if (e1.day > e2.day) return 1;
          if (e1.day < e2.day) return -1;
          if (e1.start > e2.start) return 1;
          if (e1.start < e2.start) return -1;
        })
        .map((event) => <EventCards event={event} />);
      setEventList(list);
    }
  }, []);

  const breakpoints = {
    1024: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    620: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
  };

  return (
    <Center
      bgGradient={"linear(to-b,transparent,rgb(252, 193, 203,0.6))"}
      w="100%"
      pt="5"
      pb="10"
      flexDir={"column"}
    >
      <Flex w="90%" flexDir={"column"}>
        <Box my={5}>
          <Heading color="pink.300" fontSize={["3xl", "4xl", "5xl", "5xl"]}>
            Featured Events
          </Heading>
        </Box>
        <Center borderRadius={"1rem"} overflow="hidden" gridGap={"3"}>
          <Carousal
            allowPagination={true}
            breakpoints={breakpoints}
            items={eventList}
          />
        </Center>
      </Flex>
    </Center>
  );
}
