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
import LoginForm from "../components/layout/LoginForm";
import LoginOtherColleges from "../components/layout/LoginOtherColleges";
import Head from "next/head";
const login = () => {
  return (
    <>
      <Head>
        <title>ETAMAX-22 | Login</title>
      </Head>
      <Box alignItems="center" borderRadius="lg">
        <Center>
          <Tabs isFitted variant="enclosed" color="pink.800">
            <TabList color="pink.800">
              <Tab fontSize={"xl"} color="pink.800">
                FCRIT Students
              </Tab>
              <Tab fontSize={"xl"} color="pink.800">
                Other Colleges
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
