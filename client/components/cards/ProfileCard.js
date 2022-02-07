import {
  Heading,
  Avatar,
  Box,
  Center,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import EventsList from "../checkout/EventsList";

export default function ProfileCard({ randomAvatar, profile }) {

  const [token, setToken] = useState(null);

  useEffect(() => {
    const userJSON = localStorage.getItem("eta_user");
    if (!userJSON) {
      router.replace("/login");
      return;
    }
    let user = JSON.parse(userJSON);
    setToken(user.token);
  }, []);

  return (
    <Center py={6}>
      <Box
        minW={"350px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"lg"}
        p={6}
        textAlign={"center"}
      >
        <Avatar
          size={"xl"}
          src={profile.avatar}
          alt={"Avatar Alt"}
          mb={4}
          pos={"relative"}
          onClick={randomAvatar}
          _after={{
            content: '""',
            w: 4,
            h: 4,
            bg: "green.300",
            border: "2px solid white",
            rounded: "full",
            pos: "absolute",
            bottom: 0,
            right: 3,
          }}
        />
        <Heading fontSize={"2xl"} fontFamily={"body"}>
          {profile.name}
        </Heading>
        <Text fontWeight={600} color={"gray.500"} mb={4}>
          {profile.roll_no}
        </Text>
        <Text
          textAlign={"center"}
          color={useColorModeValue("gray.700", "gray.400")}
          px={3}
        >
          {profile.department} SEM {profile.semester}
        </Text>
        <EventsList events={profile.participations} token={token} setEvents={console.log} />
      </Box>
    </Center>
  );
}
