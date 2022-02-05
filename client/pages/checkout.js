import EventsList from "../components/checkout/EventsList";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Layout from "../components/layout";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import { Center, Spacer } from "@chakra-ui/react";
import Head from "next/head";

export default function Checkout() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("eta_user"));
    if (user && user.token) {
      let es = user.user.participations;
      setEvents(es);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Layout>
        <Center
          backgroundImage={"assets/checkout.svg"}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
          h={{ base: "auto", lg: "105vh" }}
          w={"100vw"}
          flexDir={"column"}
        >
          <Center bg="transparent" h={{ base: "13vh", md: "0vh" }} />
          <Center
            w={{ base: "97%", lg: "90%" }}
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
              <EventsList events={events} />
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
          <Center bg="transparent" h={{ base: "10vh", md: "0vh" }} />
        </Center>
      </Layout>
    </>
  );
}
