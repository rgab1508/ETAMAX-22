import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const DroneEvent = () => {
  const droneEventId = "88f89e2e-6503-459f-aca7-7700a3cb9185";

  return (
    <Box
      w={["100%", "80%", "48%", "40%"]}
      p={3}
      bg="#fcc0cb"
      position="absolute"
      right="0"
      top="calc(70vh - 100px)"
      as="a"
      href={`/events?id=${droneEventId}`}
      zIndex={1000}
      borderRadius="5px 0 0 5px"
      display="flex"
      // h={["100px", "150px", "200px", "150px"]}
      // h="150px"
      gridGap={3}
      opacity="0.75"
    >
      <Box display="flex" alignItems={"center"} flex="0.3">
        <Image h="120px" src="/assets/drone.svg" />
      </Box>
      <Flex flex="0.7" flexDir="column" gridGap={2}>
        <Heading fontSize={{ base: "xl", lg: "3xl" }}>Drone Event!!</Heading>
        <Text fontSize={["sm", "md", "lg", "lg"]}>
          This event is conducted in association with the Indian drone racing
          league which is INDIA’s largest drone racing league. Check it out now!
        </Text>
      </Flex>
      <Flex alignSelf={"center"}>
        <ChevronRightIcon fontSize={"50px"} />
      </Flex>
    </Box>
  );
};

export default DroneEvent;
