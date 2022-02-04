import EventCard from "../components/checkout/EventCard";
import CheckoutForm from "../components/checkout/CheckoutForm";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { Flex, Center } from "@chakra-ui/react";
import Head from "next/head";

export default function Checkout() {
  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Center bg="#fff2f6" h={"100vh"} w={"100vw"}>
        <Center
          w="90%"
          h="90%"
          p="10px"
          flexDirection={["column", "row"]}
          gridGap={"10"}
        >
          <Center
            borderRadius={"10px"}
            bg="#fccfd7"
            w="43%"
            h="90%"
            p="10px"
            flexDir={"column"}
          >
            {/* House the selected events */}
          </Center>
          <Center
            borderRadius={"10px"}
            bg="#fccfd7"
            w="43%"
            h="90%"
            p="10px"
            flexDir={"column"}
          >
            {/* Display total price and donations */}
            <CheckoutForm />
          </Center>
        </Center>
      </Center>
    </>
  );
}
