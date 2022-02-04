import { Box, Flex, Button } from "@chakra-ui/react";
import { API_BASE_URL_IMG } from "../../config";

export default function EventCard({ event, members }) {
  async function unRegister() {
    // TODO: Code to unregister from event.
  }

  return (
    <Box
      w="100%"
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat="no-repeat"
      backgroundImage={`${API_BASE_URL_IMG}${event.image}`}
      h="20vh"
      borderRadius={"10px"}
    >
      <Flex w="100%" h="100%" bgColor="rgb(0,0,0,0.4)" borderRadius="10px">
        <Flex
          transition="all 0.2s"
          p="15px"
          w={{ base: "100%", md: "60%" }}
          h="100%"
          borderRadius="10px"
          bg="transparent"
          _hover={{
            bg: "white",
            color: "pink.300",
            width: "80%",
          }}
          color="white"
          flexDir="column"
          justifyContent="space-evenly"
        >
          <Box>
            <Text
              fontWeight="bold"
              fontSize={{
                base: isOpen ? "22pt" : "18pt",
                md: "35pt",
              }}
              transition="all 0.2s ease"
            >
              {event.title}
            </Text>
            <Text
              w="100%"
              noOfLines={2}
              fontWeight="normal"
              position={"relative"}
              bottom={isOpen ? "-20px" : "0px"}
              fontSize={{
                base: isOpen ? "18pt" : "16pt",
                md: isOpen ? "23pt" : "20pt",
              }}
              transition="all 0.2s ease"
            >
              {event.start} - {event.end}
            </Text>
          </Box>
        </Flex>
        <Box
          overflow="hidden"
          borderRadius="10px"
          position="relative"
          w={{ base: "100%", md: "50%" }}
          h={{ base: "15vh", md: "auto" }}
          transition={"all 0.2s ease"}
        >
          <Flex
            p="10px"
            flexDirection="column"
            borderRadius="10px"
            gridGap="2"
            position="absolute"
            right={0}
            zIndex={1}
          >
            <Badge
              ml="auto"
              bg="purple.900"
              color="white"
              fontSize={{ base: "10pt", md: "14pt" }}
              borderRadius="5px"
            >
              Day - {event.day}
            </Badge>
            <Badge
              ml="auto"
              bg={event.category == "S" ? "blue.700" : "red.700"}
              color="white"
              fontSize={{ base: "10pt", md: "14pt" }}
              borderRadius="5px"
            >
              {event.category == "S" ? "E-sports" : "Cultural"}
            </Badge>
            {event.team_size > 1 ? (
              <Badge
                ml="auto"
                bg="yellow.500"
                color="white"
                fontSize={{ base: "10pt", md: "14pt" }}
                borderRadius="5px"
              >
                Group
              </Badge>
            ) : null}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
