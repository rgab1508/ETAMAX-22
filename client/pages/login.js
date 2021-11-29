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
  Spacer
} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import LoginOtherColleges from "../components/LoginOtherColleges";
const login = () => {
  return (
    
    <Box  alignItems='center' borderRadius="lg">
      <Center>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab fontSize={"xl"}>FCRIT Students</Tab>
            <Tab fontSize={"xl"}>Other Colleges</Tab>
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
    
  );
};

export default login;
