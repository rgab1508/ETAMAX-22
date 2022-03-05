import {
  Box,
  Flex,
  Center,
  Heading,
  Text,
  Select,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import EventCard from "../components/cards/EventCards";
import Background from "../components/misc/Background";
import Layout from "../components/layout";
import { API_BASE_URL } from "../config";
import { useRouter } from "next/router";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function Events(props) {
  const router = useRouter();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const dist = window.scrollY;
      document.getElementById(
        "blossom-container"
      ).style.transform = `-translateY(${dist * 1}px)`;
      document.getElementById(
        "background-image"
      ).style.transform = `translateY(${dist * 0.03}px)`;
    });
  }, []);

  useEffect(() => {
    const { id } = router.query;
    if (!id) return;

    const ele = document.getElementById(id);
    if (!ele) return;

    const y = ele.getBoundingClientRect().top + window.pageYOffset - 200;

    window.scrollTo({ top: y, behavior: "smooth" });
    // ele.scrollIntoView({ behavior: "smooth" });
    // window.scrollBy(0, -100);
  }, [router.query]);

  // create a simple array of numbers
  const [events, setEvents] = useState(
    props.events.sort((event1, event2) => {
      if (event1.day > event2.day) return 1;
      if (event1.day < event2.day) return -1;
      if (event1.start > event2.start) return 1;
      if (event1.start < event2.start) return -1;
    })
  );
  const [daySelect, setDaySelect] = useState("");
  const [catSelect, setCatSelect] = useState("");

  useEffect(() => {
    if (daySelect === "") {
      setEvents(
        events.sort((event1, event2) => {
          if (event1.day > event2.day) return 1;
          if (event1.day < event2.day) return -1;
          if (event1.start > event2.start) return 1;
          if (event1.start < event2.start) return -1;
        })
      );
    } else {
      setEvents(
        events
          .filter((event) => event.day === parseInt(daySelect, 10))
          .sort((event1, event2) => {
            if (event1.day > event2.day) return 1;
            if (event1.day < event2.day) return -1;
            if (event1.start > event2.start) return 1;
            if (event1.start < event2.start) return -1;
          })
      );
    }
  }, [daySelect]);

  useEffect(() => {
    if (catSelect === "") {
      setEvents(
        events.sort((event1, event2) => {
          if (event1.day > event2.day) return 1;
          if (event1.day < event2.day) return -1;
          if (event1.start > event2.start) return 1;
          if (event1.start < event2.start) return -1;
        })
      );
    } else {
      setEvents(
        events
          .filter((event) => event.category === catSelect)
          .sort((event1, event2) => {
            if (event1.day > event2.day) return 1;
            if (event1.day < event2.day) return -1;
            if (event1.start > event2.start) return 1;
            if (event1.start < event2.start) return -1;
          })
      );
    }
  }, [catSelect]);

  return (
    <>
      <Head>
        <title>ETAMAX-22 | Events</title>
        <meta name="ETAMAX-22" content="Events" />
        <meta
          name="description"
          content="Here is the list of events for this year"
        />
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Background pageName={"Events"} />
      <Layout>
        <Flex
          id="blossom-container"
          flexDir="column"
          h="auto"
          w="100vw"
          maxW="100vw"
        >
          <Flex
            maxW="100vw"
            flexDirection="column"
            h={{ base: "120vh", md: "100vh" }}
          >
            <Center
              h={{ base: "110vh", md: "100vh" }}
              w="100%"
              flexDir={"column"}
            >
              <Box w="80%">
                <Heading color="pink.300" fontSize="6xl">
                  ETAMAX-22{" "}
                  <Text fontSize="8xl" fontFamily="Birthstone Bounce">
                    Fleur
                  </Text>
                </Heading>
              </Box>
              <Box mt={4} w="83%" p="20px">
                <Text
                  fontSize={{ base: "xl", md: "3xl" }}
                  fontWeight={"normal"}
                  color="pink.400"
                >
                  ETAMAX offers you a variety of events to choose from. Feel
                  free to pick any event of your choice from Technical, Cultural
                  and Sports (Only for FCRIT students), but make sure you follow
                  the registration criteria.
                </Text>
              </Box>
            </Center>
          </Flex>
          <Center w="100%" gridGap={"3"}>
            <Center w={{ base: "95%", lg: "50%" }} gridGap={3}>
              <Select
                value={catSelect}
                onChange={(e) => setCatSelect(e.target.value)}
                placeholder="Select Category"
                _focus={{
                  color: "pink.500",
                  borderColor: "pink.500",
                }}
                _hover={{
                  color: "pink.500",
                  borderColor: "pink.500",
                }}
              >
                <option value="T">Technical</option>
                <option value="C">Cultural</option>
                <option value="S">Sports</option>
              </Select>
              <Select
                value={daySelect}
                onChange={(e) => setDaySelect(e.target.value)}
                placeholder="Select Day"
                _focus={{
                  color: "pink.500",
                  borderColor: "pink.500",
                }}
                _hover={{
                  color: "pink.500",
                  borderColor: "pink.500",
                }}
              >
                <option value="1">Day 1</option>
                <option value="2">Day 2</option>
                <option value="3">Day 3</option>
              </Select>
              <Button
                _focus={{
                  color: "pink.500",
                  borderColor: "pink.500",
                }}
                _hover={{
                  color: "pink.500",
                  borderColor: "pink.500",
                }}
                variant="outline"
                fontWeight={"normal"}
                onClick={() => {
                  setCatSelect("");
                  setDaySelect("");
                  setEvents(
                    props.events.sort((event1, event2) => {
                      if (event1.day > event2.day) return 1;
                      if (event1.day < event2.day) return -1;
                      if (event1.start > event2.start) return 1;
                      if (event1.start < event2.start) return -1;
                    })
                  );
                }}
              >
                Reset
              </Button>
            </Center>
          </Center>
          <Center py="30px" w="100%" minH="60vh" flexDir={"column"} gridGap="4">
            {events.map((event, idx) => (
              <Center w="100vw" key={idx}>
                <EventCard event={event} />
              </Center>
            ))}
          </Center>
        </Flex>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  try {
    const res = await fetch(`${API_BASE_URL}/e`).then((response) =>
      response.json()
    );
    return {
      props: {
        events: res.events,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
}
