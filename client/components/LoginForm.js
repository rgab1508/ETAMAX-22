import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Box,
  Tab,
  Tabs,
  TabIndicator,
  Container,
  TabPanel,
  TabPanels,
  TabList,
  Input,
} from "@chakra-ui/react";

const LoginForm = () => {
  return (
    <Container maxW="container.xl" centerContent>
      <Tabs isFitted variant="enclosed">
        <Box w="100%">
          <TabList>
            <Tab>FCRIT Students</Tab>
            <Tab>Other Colleges</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FormControl id="rollno">
                <FormLabel>Roll Number</FormLabel>
                <Input type="text" />
              </FormControl>
              <FormControl id="passowrd">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </Container>
  );
};

export default LoginForm;
