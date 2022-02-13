import { Box, Flex, Text } from "@chakra-ui/react";
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
      <Flex
        pr={2}
        overflowX={"hidden"}
        h={"90%"}
        overflowY={"scroll"}
        flexDir={"column"}
        gridGap="3"
        className="custom-scrollbar"
      >
        {/* Display the list of events trying to register to */}
        {props.events.length > 0 ? (
          props.events.map((event, key) => (
            <Flex key={key}>
              <EventCard
                participation={event}
                token={props.token}
                setEvents={props.setEvents}
                isProfile={props.isProfile}
              />
            </Flex>
          ))
        ) : (
          <Flex
            alignItems={"center"}
            flexDir="column"
            justifyContent="center"
            h="100%"
            fontSize="x-large"
          >
            <Text color="gray.700" fontSize={"xx-large"} fontWeight={"bold"}>
              No events
            </Text>
            <Text color="gray.700">
              Register on{" "}
              <Box
                href="/events"
                textDecor={"underline"}
                as="a"
                color="pink.600"
              >
                Events
              </Box>{" "}
              page
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
