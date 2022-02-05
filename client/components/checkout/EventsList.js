import { Flex, Text } from "@chakra-ui/react";
import EventCard from "./EventCard";

export default function EventsList(props) {
  return (
    <Flex
      w={{ base: "100%", lg: "90%" }}
      h="95%"
      gridGap={"2"}
      p="15px"
      flexDir={"column"}
    >
      <Text fontSize={{ base: "25pt", md: "35pt" }} color="gray.700">
        Events
      </Text>
      <Flex h={"90%"} overflow={"scroll"} flexDir={"column"} gridGap="3">
        {/* Display the list of events trying to register to */}
        {props.events.map((event, key) => (
          <Flex key={key}>
            <EventCard participation={event} />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
