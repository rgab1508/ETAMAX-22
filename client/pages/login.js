import {
  Box,
  Tab,
  Tabs,
  TabIndicator,
  Container,
  TabPanel,
  TabPanels,
  TabList,
  Center,
  Spacer,
} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import LoginOtherColleges from "../components/LoginOtherColleges";
import Background from "../components/Background";
import Head from "next/head";
const login = () => {
  return (
    <>
      <Head>
        <title>ETAMAX-22 | Login</title>
      </Head>
      <Background />
      <Box alignItems="center" borderRadius="lg">
        <Center>
          <Tabs
            w={["90%", "80%", "60%", "30%"]}
            mt={10}
            isFitted
            variant="enclosed"
            color="pink.800"
          >
            <TabList color="pink.800">
              <Tab fontSize={"xl"} color="pink.800">
                Login
              </Tab>
              <Tab fontSize={"xl"} color="pink.800">
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
};

export default login;
