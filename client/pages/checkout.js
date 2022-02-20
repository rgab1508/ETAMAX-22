import EventsList from "../components/checkout/EventsList";
import CheckoutForm from "../components/checkout/CheckoutForm";
import Layout from "../components/layout";
import { useState, useEffect } from "react";
import { Center } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as cookie from "cookie";

export default function Checkout() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const userJSON = localStorage.getItem("eta_user");
    if (!userJSON) {
      router.replace("/login");
      return;
    }
    let user = JSON.parse(userJSON);
    setUser(user);
    if (user.token) {
      let es = user.user.participations;
      es = es.filter((e) => !e.transaction);
      setEvents(es);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Checkout</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {user && (
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
                <EventsList
                  events={events}
                  token={user.token}
                  setEvents={setEvents}
                />
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
                <CheckoutForm
                  participations={events}
                  user={user}
                  setEvents={setEvents}
                />
              </Center>
            </Center>
            <Center bg="transparent" h={{ base: "10vh", md: "0vh" }} />
          </Center>
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = cookie.parse(req.headers.cookie || "")["eta_token"];
  if (!token) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return { props: {} };
  } else {
    return { props: {} };
  }
}
