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
} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
const login = () => {
  return (
    <Box  alignItems='center' borderRadius="lg">
      <Center>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>FCRIT Students</Tab>
            <Tab>Other Colleges</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </Box>
  );
};

export default login;
