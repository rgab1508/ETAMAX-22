import { Flex, Text } from "@chakra-ui/react";
import EventCard from "./EventCard";

export default function EventsList(props) {
  return (
    <Flex w={{ base: "100%", lg: "90%" }} h="95%" p="15px" flexDir={"column"}>
      <Text fontSize={"35pt"} color="gray.700">
        Events
      </Text>
      <Flex
        h={"90%"}
        bg="whatsapp.100"
        overflowY={"scroll"}
        flexDir={"column"}
        gridGap="3"
      >
        {/* Display the list of events trying to register to */}
      </Flex>
    </Flex>
  );
}
