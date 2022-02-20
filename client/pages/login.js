import {
  Box,
  Tab,
  Tabs,
  TabPanel,
  TabPanels,
  TabList,
  Center,
} from "@chakra-ui/react";
import LoginForm from "../components/login/LoginForm";
import LoginOtherColleges from "../components/login/LoginOtherColleges";
import Background from "../components/misc/Background";
import Head from "next/head";
import * as cookie from "cookie";

if (typeof window !== "undefined") {
  import("../components/utils/blossom");
}

export default function Login(props) {
  return (
    <>
      <Head>
        <title>ETAMAX-22 | Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Background pageName={"Login"} />
      <Box
        id="blossom-container"
        w="100vw"
        alignItems="center"
        borderRadius="lg"
      >
        <Center>
          <Tabs
            w={["90%", "80%", "60%", "60%"]}
            mt={10}
            isFitted
            variant="solid-rounded"
          >
            <TabList>
              <Tab
                _selected={{ color: "white", bg: "#fcc0cb" }}
                fontSize={"xl"}
                color="pink.400"
                _focus={{ outline: "none!important" }}
              >
                Login
              </Tab>
              <Tab
                _selected={{ color: "white", bg: "#fcc0cb" }}
                fontSize={"xl"}
                color="pink.400"
                _focus={{ outline: "none!important" }}
              >
                Register
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LoginForm />
              </TabPanel>
              <TabPanel>
                <LoginOtherColleges />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Center>
      </Box>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = cookie.parse(req.headers.cookie || "")["eta_token"];
  if (token) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
  }
  return { props: {} };
}
