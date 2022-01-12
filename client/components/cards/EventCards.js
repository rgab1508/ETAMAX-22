import {
  Box,
  Flex,
  Text,
  IconButton,
  Input,
  Collapse,
  Button,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { useState } from "react";

export default function EventCard({ event, key }) {
  const [isOpen, setOpen] = useState(false);
  // background-color: #e96196;
  // background-image: linear-gradient(315deg, #e96196 0%, #ffffff 74%);
  return (
    <>
      <Flex
        w={["90%", "90%", "75%", "60%"]}
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
      >
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundImage={`https://picsum.photos/200/300`}
          h="30vh"
          onClick={() => setOpen(!isOpen)}
          borderRadius="10px"
          cursor="pointer"
        >
          <Flex w="100%" h="100%" bgColor="rgb(0,0,0,0.4)" borderRadius="10px">
            <Flex
              transition="all 0.2s"
              p="15px"
              w={{ base: "100%", md: "50%" }}
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
                    md: isOpen ? "40pt" : "35pt",
                  }}
                  transition="all 0.2s ease"
                >
                  event.title
                </Text>
                <Text
                  w="100%"
                  noOfLines={2}
                  fontWeight="normal"
                  position={"relative"}
                  bottom={isOpen ? "-30px" : "0px"}
                  fontSize={{
                    base: isOpen ? "18pt" : "16pt",
                    md: isOpen ? "25pt" : "20pt",
                  }}
                  transition="all 0.2s ease"
                >
                  event.start - event.end
                </Text>
              </Box>
              <Flex
                opacity={isOpen ? 0 : 1}
                transition={"opacity 0.2s"}
                w={{ md: "100%" }}
                overflow="hidden"
                bottom={0}
              >
                <Text
                  noOfLines={{ base: 2, md: 2 }}
                  fontSize={{ base: "9pt", md: "12pt" }}
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                  fontStyle="italic"
                >
                  Click to learn more
                </Text>
              </Flex>
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
                  Day - event.day
                </Badge>
                {/* <Badge
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
            ) : null} */}
              </Flex>
            </Box>
          </Flex>
        </Flex>
        <Collapse in={isOpen} animateOpacity>
          <Flex
            flexDirection="column"
            bg="transparent"
            w="100%"
            p="15px"
            borderRadius="10px"
            gridGap="3"
          >
            <Flex
              color="pink.400"
              className="listMarginLeft"
              fontSize={{ base: "12pt", md: "17pt" }}
              flexDirection="column"
            >
              {/* <ReactMarkdown children={event.description} /> */}
              Event description
            </Flex>
            <Flex p="15px" gridGap="5" flexDir="column">
              {
                /*event.size > 1 */ true && (
                  <Text
                    color="pink.400"
                    fontWeight="bold"
                    fontSize={{ base: "12pt", md: "17pt" }}
                  >
                    Team size : event.team_size{" "}
                    {/* {event.is_team_size_strict ? "(Strict)" : "(Not Strict)"} */}
                  </Text>
                )
              }
              {/* <Text
              fontSize={{ base: "12pt", md: "17pt" }}
              color={event.max_seats - event.seats < 10 ? "red" : "white"}
              fontWeight="bold"
            >
              Seats booked: {event.seats} / {event.max_seats}
            </Text> */}
              <Text
                fontSize={{ base: "12pt", md: "18pt" }}
                color="pink.400"
                fontWeight="bold"
              >
                Event price: event.entry_fee != 0 ? event.entry_fee Rs` : "Free"
              </Text>
            </Flex>
            {true && /* event.team_size > 1 */ true && (
              <Flex flexDirection="column" gridGap="3">
                <Flex
                  bg="rgb(27, 94, 32)"
                  borderRadius="10px"
                  mt={4}
                  flexDirection="column"
                  p="20px"
                  gridGap="3"
                >
                  <Text color="pink.400" fontSize="15pt" fontWeight="bold">
                    Enter team mate information{" "}
                    <span style={{ color: "red" }}>
                      Enter your own ROLL NO as well !!
                    </span>
                  </Text>
                  {/* <Input
                    variant="filled"
                    placeholder="Enter a team name"
                    bg="white"
                    _placeholder={{ fontSize: "14pt" }}
                    _focus={{ color: "black", bg: "white" }}
                    value={values.teamName}
                    name="teamName"
                    onChange={handleChange}
                  /> */}
                  {/* <Flex gridGap="4">
                    <Input
                      flex={3}
                      variant="filled"
                      placeholder="Enter team members (Roll no)"
                      _placeholder={{ fontSize: "14pt" }}
                      bg="white"
                      _focus={{ color: "black", bg: "white" }}
                      name="member"
                      value={member}
                      onChange={(event) => {
                        setMember(event.target.value);
                      }}
                    />
                    <IconButton
                      flex={1}
                      aria-label="Add team member"
                      icon={<AddIcon />}
                      bg="rgb(76, 175, 80)"
                      color="white"
                      _hover={{ bg: "rgb(129, 199, 132)" }}
                      onClick={addTeamMembers}
                    />
                    <IconButton
                      flex={1}
                      aria-label="Remove team member"
                      icon={<MinusIcon />}
                      bg="rgb(76, 175, 80)"
                      color="white"
                      _hover={{ bg: "rgb(129, 199, 132)" }}
                      onClick={removeTeamMembers}
                    />
                  </Flex> */}
                </Flex>
                <Flex gridGap="2" wrap="wrap">
                  {/* {values.members.map((val) => {
                    return (
                      <Flex p="15px" borderRadius="10px" bg="rgb(27, 94, 32)">
                        <Text color="white">{names[val] || val}</Text>
                      </Flex>
                    );
                  })} */}
                </Flex>
              </Flex>
            )}
            <Flex justifyContent="flex-end">
              {true ? (
                true ? (
                  <Box
                    display="flex"
                    p={2}
                    // color="whitesmoke"
                    gridGap={2}
                    alignItems="center"
                    bgColor="green.200"
                    borderRadius="md"
                  >
                    <Text>Registered</Text>
                    {/* <CheckIcon color="green" /> */}
                  </Box>
                ) : (
                  <Button
                    bg="green.400"
                    color="white"
                    fontWeight="bold"
                    _focus={{ outline: "none!important" }}
                    _hover={{ opacity: 0.8 }}
                    onClick={() => {
                      setAlertContent([
                        "Are you Sure you would like to register for this event? It can only be undone with admin intervention",
                      ]);
                      setAlertOpen(true);
                    }}
                  >
                    Register
                  </Button>
                )
              ) : (
                <Text fontStyle="italic" mr={5} color="white" fontSize="large">
                  Login to register
                </Text>
              )}
            </Flex>
          </Flex>
        </Collapse>
      </Flex>
    </>
  );
}
