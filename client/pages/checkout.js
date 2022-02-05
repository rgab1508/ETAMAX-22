import EventsList from "../components/checkout/EventsList";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Layout from "../components/layout";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { Center } from "@chakra-ui/react";
import Head from "next/head";

export default function Checkout() {
  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Center bg="#fff2f6" h={{ base: "auto", lg: "100vh" }} w={"100vw"}>
        <Center
          w="90%"
          h={{ base: "95%", lg: "90%" }}
          p="10px"
          flexDirection={["column", "row"]}
          gridGap={"10"}
        >
          <Center
            borderRadius={"10px"}
            bg="#fccfd7"
            w={{ base: "100%", lg: "43%" }}
            h="90%"
            p="10px"
            flexDir={"column"}
          >
            {/* House the selected events */}
            <EventsList />
          </Center>
          <Center
            borderRadius={"10px"}
            bg="#fccfd7"
            w={{ base: "100%", lg: "43%" }}
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
