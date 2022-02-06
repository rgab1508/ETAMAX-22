import {
  Box,
  Flex,
  Button,
  Badge,
  Text,
  toast,
  useToast,
} from "@chakra-ui/react";
import { API_BASE_URL_IMG, API_BASE_URL } from "../../config";

export default function EventCard({ participation, token, setEvents }) {
  const toast = useToast();
  async function unRegister() {
    console.log(participation.part_id, token);
    fetch(`${API_BASE_URL}/e/unregister/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        part_id: participation.part_id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast({
            title: res.detail,
            status: "success",
            position: "top-right",
            isClosable: true,
          });
          setEvents((prevEvents) =>
            prevEvents.filter((e) => participation.part_id != e.part_id)
          );
        }
      })
      .catch((err) => {
        console.error(err);
        toast({ title: res.detail, status: "error", position: "top-right" });
      });
  }

  return (
    <Box
      w="100%"
      backgroundSize={"cover"}
      backgroundPosition={"center"}
      backgroundRepeat="no-repeat"
      backgroundImage={`${API_BASE_URL_IMG}${participation.event.image}`}
      h={{ base: "16vh", md: "17vh" }}
      borderRadius={"10px"}
    >
      <Flex w="100%" h="100%" bgColor="rgb(0,0,0,0.4)" borderRadius="10px">
        <Flex
          transition="all 0.2s"
          p="15px"
          w={{ base: "50%", md: "60%" }}
          h="100%"
          borderRadius="10px"
          bg="transparent"
          _hover={{
            bg: "white",
            color: "pink.300",
            width: { base: "50%", md: "70%" },
          }}
          color="white"
          flexDir="column"
          justifyContent="space-evenly"
        >
          <Text
            fontSize={{
              base: "11pt",
              md: "12pt",
            }}
            transition="all 0.2s ease"
          >
            #{participation.part_id.slice(participation.part_id.length - 5)}
          </Text>
          <Box>
            <Text
              fontWeight="bold"
              fontSize={{
                base: "18pt",
                md: "20pt",
              }}
              transition="all 0.2s ease"
              noOfLines={1}
            >
              {participation.event.title}
            </Text>
          </Box>
          {participation.members.length > 1 && (
            <Flex gridGap={"1"}>
              {participation.members.map((mem) => (
                <Text>•{mem}</Text>
              ))}
            </Flex>
          )}
        </Flex>
        <Box
          overflow="hidden"
          borderRadius="10px"
          position="relative"
          w={{ base: "100%", md: "40%" }}
          transition={"all 0.2s ease"}
        >
          <Flex
            p="10px"
            flexDirection="row"
            borderRadius="10px"
            gridGap="1"
            position="absolute"
            flexDir={{ base: "row", lg: "column" }}
            right={0}
            zIndex={0}
            wrap={"wrap"}
            transition={"all 0.2s ease"}
          >
            <Badge
              ml="auto"
              bg="purple.900"
              color="white"
              fontSize={"10pt"}
              borderRadius="5px"
            >
              Day - {participation.event.day}
            </Badge>
            <Badge
              ml="auto"
              bg={participation.event.category == "S" ? "blue.700" : "red.700"}
              color="white"
              fontSize={"10pt"}
              borderRadius="5px"
            >
              {participation.event.category == "S" ? "E-sports" : "Cultural"}
            </Badge>
            {participation.event.team_size > 1 ? (
              <Badge
                ml="auto"
                bg="yellow.500"
                color="white"
                fontSize={"10pt"}
                borderRadius="5px"
              >
                Group
              </Badge>
            ) : null}
          </Flex>
          <Button
            variant={"outline"}
            color="white"
            bg="transparent"
            position={"absolute"}
            _hover={{
              bg: "white",
              color: "pink.300",
            }}
            _focus={{
              outline: "none",
              bg: "white",
              color: "pink.300",
            }}
            px={1}
            py={1}
            bottom={2}
            right={2}
            onClick={unRegister}
            fontSize={"11pt"}
          >
            Unregister
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
