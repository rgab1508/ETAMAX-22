import Background from "../components/misc/Background";
import { Center, Text } from "@chakra-ui/react";
import Footer from "../components/layout/Footer";
import Head from "next/head";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function NotFound() {
  return (
    <>
      <Head>
        <title>This page does not exist</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <Background pageName="Home" />
      <Center id="blossom-container" flexDir={"column"} h="100vh">
        <Text color="pink.400" fontSize="30pt" fontWeight="bold">
          404 | PAGE NOT FOUND
        </Text>
      </Center>
      <Footer />
    </>
  );
}
