import Background from "../components/Background";
import { Center, Text } from "@chakra-ui/react";
import Footer from "../components/Layout/Footer";
import Head from "next/head";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function NotFound() {
  return (
    <>
      <Head>
        <title>This page does not exist</title>
      </Head>
      <Center id="blossom-container" h="100vh">
        <Background pageName="Home" />
        <Text color="pink.400" fontSize="30pt" fontWeight="bold">
          404 | PAGE NOT FOUND
        </Text>
      </Center>
      <Footer />
    </>
  );
}
