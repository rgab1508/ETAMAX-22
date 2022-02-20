import {
  Center,
  Box,
  Text,
  Link,
  SimpleGrid,
  Icon,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import Head from "next/head";
import Background from "../components/misc/Background";
import { BsInstagram, BsPhone } from "react-icons/bs";
import Layout from "../components/layout";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function AboutCouncil() {
  const [councilMembers, setCouncilMembers] = useState([
    {
      name: "Celine Fernandes",
      post: "General Secretary",
      phNo: "+91 97693 85854",
      igId: "celinenfernandes",
    },
    {
      name: "Pratamesh Talekar",
      post: "Sports Secretary",
      phNo: "+91 90823 26745",
      igId: "pratameshtalekar",
    },
    {
      name: "Ritwik Saraf",
      post: "Joint Secretary",
      phNo: "+91 76660 53044",
      igId: "ritwik.saraf",
    },
    {
      name: "Daniel Rebeiro",
      post: "PR Head",
      phNo: "+91 83558 86733",
      igId: "dramaraamaa",
    },
    {
      name: "Vaivasvat Vashisht",
      post: "Cultural Secretary",
      phNo: "+91 97798 28977",
      igId: "vaivasvatvashisht",
    },
    {
      name: "Preethi Lydia",
      post: "Ladies Represntative",
      phNo: "+91 93265 95038",
      igId: "preethiilydia",
    },
    {
      name: "Ashwin Shirgaonkar",
      post: "Technical Secretary",
      phNo: "+91 96196 59360",
      igId: "ash_win.__",
    },
    {
      name: "Jordan Fernandes",
      post: "Sponsorship Head",
      phNo: "+91 96190 53001",
      igId: "jordan23fernandes",
    },
  ]);

  return (
    <>
      <Head>
        <title>Contact the council members</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background pageName={"Home"} />
      <Layout>
        <Flex
          justifyContent={"center"}
          w="100vw"
          h="140vh"
          id="blossom-container"
          p={{ base: "10px", md: "25px" }}
          flexDir="column"
        >
          <Center flexDir="column" gridGap={"5"}>
            <Center py="30px">
              <Heading color="pink.500">Contact the council members</Heading>
            </Center>
            <SimpleGrid spacing={10} columns={{ base: "1", md: "2" }}>
              {councilMembers.map((member, index) => (
                <Box p="15px" borderRadius={"10px"} bg="#fcb1cb" key={index}>
                  <Center>
                    <Text
                      color={"pink.500"}
                      fontSize={{ base: "2xl", md: "3xl" }}
                    >
                      {member.name}
                    </Text>
                  </Center>
                  <Center>
                    <Text
                      color={"pink.400"}
                      fontWeight="bold"
                      fontSize={{ base: "xl", md: "2xl" }}
                    >
                      {member.post}
                    </Text>
                  </Center>
                  <Center gridGap={3}>
                    <Icon as={BsPhone} size={"45px"} color={"pink.400"} />
                    <Text
                      color={"pink.400"}
                      fontSize={{ base: "xl", md: "2xl" }}
                    >
                      {member.phNo}
                    </Text>
                  </Center>
                  <Center gridGap={3}>
                    <Icon color={"pink.400"} as={BsInstagram} size="45px" />
                    <Link
                      href={`https://instagram.com/${member.igId}`}
                      color={"pink.400"}
                      fontSize={{ base: "xl", md: "2xl" }}
                      target="_blank"
                    >
                      {member.igId}
                    </Link>
                  </Center>
                </Box>
              ))}
            </SimpleGrid>
          </Center>
        </Flex>
      </Layout>
    </>
  );
}
