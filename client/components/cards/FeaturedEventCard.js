import { Box, Flex, Text, Badge } from "@chakra-ui/react";
import { API_BASE_URL_IMG } from "../../config";

export default function EventCard({ event }) {
  return (
    <>
      <Flex
        w={"100%"}
        h="auto"
        flexDirection="column"
        bgColor="#e96196"
        backgroundImage="linear-gradient(315deg, #e96196 0%, #ffffff 74%)"
        borderRadius="10px"
        boxShadow="lg"
        _hover={{
          boxShadow: "2xl",
        }}
        position="relative"
        zIndex="1"
        transition="box-shadow 0.2s ease, height 1s"
        mb={{ base: "10px", lg: "30px" }}
        as="a"
        href={"/events?id=" + event.event_code}
      >
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundImage={`${API_BASE_URL_IMG}${event.image}`}
          h={{ base: "20vh", lg: "30vh" }}
          borderRadius="10px"
          cursor="pointer"
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
                    base: "18pt",
                    md: "35pt",
                  }}
                  transition="all 0.2s ease"
                  noOfLines={2}
                >
                  {event.title}
                </Text>
                <Text
                  w="100%"
                  noOfLines={2}
                  fontWeight="normal"
                  position={"relative"}
                  bottom={"0px"}
                  fontSize={{
                    base: "13pt",
                    md: "20pt",
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
                {event.category == "C" ? (
                  <Badge
                    ml="auto"
                    bg={"red.700"}
                    color="white"
                    fontSize={{ base: "10pt", md: "14pt" }}
                    borderRadius="5px"
                  >
                    Cultural
                  </Badge>
                ) : null}
                {event.category == "T" ? (
                  <Badge
                    ml="auto"
                    bg={"blue.700"}
                    color="white"
                    fontSize={{ base: "10pt", md: "14pt" }}
                    borderRadius="5px"
                  >
                    Technical
                  </Badge>
                ) : null}
                {event.category == "S" ? (
                  <Badge
                    ml="auto"
                    bg={"green.700"}
                    color="white"
                    fontSize={{ base: "10pt", md: "14pt" }}
                    borderRadius="5px"
                  >
                    Sports
                  </Badge>
                ) : null}
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
        </Flex>
      </Flex>
    </>
  );
}
