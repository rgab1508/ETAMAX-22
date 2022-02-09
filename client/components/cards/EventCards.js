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
  Skeleton,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, MinusIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { API_BASE_URL_IMG, API_BASE_URL } from "../../config";
import AlertDialogBox from "../AlertDialogBox";
import * as ga from "../../libs/ga";

export default function EventCard({ event }) {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({
    teamName: "",
    members: [],
  });
  const [member, setMember] = useState("");
  const [isRegistered, setIsRegitered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const toast = useToast();

  useEffect(() => {
    let newIsRegistered = false;
    let userJSON = localStorage.getItem("eta_user");
    if (userJSON) {
      let user = JSON.parse(userJSON);
      setUser(user);
      for (let p of user.user.participations) {
        if (p.event.event_code == event.event_code) {
          newIsRegistered = true;
          break;
        }
      }
    }
    setIsRegitered(newIsRegistered);
    setIsLoading(false);
  }, []);

  const handleChange = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: [e.target.value],
      };
    });
  };

  const clearValues = () => setValues({ teamName: "", members: [] });

  async function checkIfStudentExists(rollNo) {
    const response = await fetch(`${API_BASE_URL}/u/exists/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roll_no: rollNo }),
    });
    let res = await response.json();
    console.log(res);

    if (res.exists) {
      setNames({ ...names, [rollNo]: res.name });
      return res.exists;
    } else {
      return false;
    }
  }

  const validateInput = () => {
    if (event.team_size > 1 && values.teamName == "") {
      toast({
        title: "Please Enter a valid Team Name",
        position: "top-right",
        duration: 3000,
        status: "error",
      });
      return false;
    }
    if (event.team_size > 1) {
      // TEAM Event
      if (
        event.is_team_size_strict &&
        values.members.length != event.team_size
      ) {
        toast({
          title: `This Event has a Strict Team Size of ${event.team_size}`,
          position: "top-right",
          duration: 3000,
          status: "error",
        });
        return false;
      }
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateInput()) return;

    let data = {
      event_code: event.event_code,
      team_name: values.teamName,
      members: values.members, // Insert Array of Roll Nos,
    };

    fetch(`${API_BASE_URL}/e/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user.token,
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          ga.event({
            action: "Event Registration",
            params: {
              event_code: event.event_code,
              category: event.category,
              day: event.day,
              is_solo: event.team_size == 1,
            },
          });
          setIsRegitered(true);
          user.user.participations.push(res.team);
          localStorage.setItem("eta_user", JSON.stringify(user));
          // ! update user state
          toast({
            title: res.detail,
            duration: 3000,
            status: "success",
            position: "top-right",
          });
          clearValues();
        } else {
          toast({
            title: res.detail,
            duration: 3000,
            status: "error",
            position: "top-right",
          });
        }
      })
      .catch((e) => {
        console.log(e);
        toast({
          title: e.detail,
          position: "top-right",
          duration: 3000,
          status: "error",
        });
      });
  };

  async function addTeamMembers(event) {
    let roll_no = Number.parseInt(member);
    if (Number.isNaN(roll_no)) {
      toast({
        title: "Please Enter a Valid Roll No.",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    if (roll_no <= 99999 || roll_no >= 9999999) {
      toast({
        title: "Please Enter a Valid Roll No.",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    if (values.members.includes(roll_no)) {
      toast({
        title: "Student Already Added!",
        status: "info",
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    if (!(await checkIfStudentExists(roll_no))) {
      toast({
        title: "Roll No. Doesn't Exist!",
        status: "error",
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    values.members.push(roll_no);
    setMember("");
  }

  function removeTeamMembers(event) {
    values.members.pop();
    setValues({ ...values });
  }

  // background-color: #e96196;
  // background-image: linear-gradient(315deg, #e96196 0%, #ffffff 74%);
  return (
    <>
      <Flex
        id={event.event_code}
        w={["95%", "95%", "75%", "60%"]}
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
        {alertContent && (
          <AlertDialogBox
            content={alertContent}
            open={alertOpen}
            setOpen={setAlertOpen}
            closeBtn={true}
            submitText="Confirm"
            onClose={handleRegister}
          />
        )}
        <Flex
          flexDirection={{ base: "column-reverse", md: "row" }}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundImage={`${API_BASE_URL_IMG}${event.image}`}
          h={{ base: "auto", lg: "30vh" }}
          onClick={() => setOpen(!isOpen)}
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
              h={{ base: "20vh", md: "auto" }}
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
              p="10px"
            >
              <b style={{ marginLeft: "10px" }}>Event description</b>
              <Box p="10px">
                {event.description ? (
                  <ReactMarkdown
                    components={{
                      li: ({ node, ordered = false, ...props }) => (
                        <li style={{ listStyleType: "disc" }} {...props} />
                      ),
                    }}
                    children={event.description}
                  />
                ) : (
                  "No description"
                )}
              </Box>
            </Flex>
            <Flex p="15px" gridGap="5" flexDir="column">
              {event.size > 1 && (
                <Text
                  color="pink.400"
                  fontWeight="bold"
                  fontSize={{ base: "12pt", md: "17pt" }}
                >
                  Team size : {event.team_size}{" "}
                  {event.is_team_size_strict ? "(Strict)" : "(Not Strict)"}
                </Text>
              )}
              <Text
                fontSize={{ base: "12pt", md: "17pt" }}
                color={event.max_seats - event.seats < 10 ? "red" : "pink.400"}
                fontWeight="bold"
              >
                Seats booked: {event.seats} / {event.max_seats}
              </Text>
              <Text
                fontSize={{ base: "12pt", md: "18pt" }}
                color="pink.400"
                fontWeight="bold"
              >
                Event price:{" "}
                {event.entry_fee != 0 ? `${event.entry_fee} Rs` : "Free"}
              </Text>
            </Flex>
            {/* {true &&  event.team_size > 1  true && ( */}
            {user && event.team_size > 1 && !isRegistered && (
              <Flex flexDirection="column" gridGap="3">
                <Flex
                  bg="pink.200"
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
                  <Input
                    variant="filled"
                    placeholder="Enter a team name"
                    bg="white"
                    _placeholder={{ fontSize: "14pt" }}
                    _focus={{ color: "black", bg: "white" }}
                    value={values.teamName}
                    name="teamName"
                    onChange={handleChange}
                  />
                  <Flex gridGap="4">
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
                  </Flex>
                </Flex>
                <Flex gridGap="2" wrap="wrap">
                  {values.members.map((val) => {
                    return (
                      <Flex p="15px" borderRadius="10px" bg="rgb(27, 94, 32)">
                        <Text color="white">{names[val] || val}</Text>
                      </Flex>
                    );
                  })}
                </Flex>
              </Flex>
            )}
            <Flex justifyContent="flex-end">
              {isLoading ? (
                <Skeleton h="40px" w="115px" borderRadius={"7px"} />
              ) : user ? (
                isRegistered ? (
                  <Box
                    display="flex"
                    p={2}
                    // color="whitesmoke"
                    gridGap={2}
                    alignItems="center"
                    bgColor="pink.200"
                    borderRadius="md"
                  >
                    <Text>Registered</Text>
                    <CheckIcon color="green" />
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
