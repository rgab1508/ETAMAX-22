import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Select,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";

const register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [semester, setSem] = useState("");
  const [branch, setBranch] = useState(""); 
  const [email, setEmail] = useState(""); 

  const firstNameHandler = event =>{
      setFirstName(event.target.value);
  };
  const lastNameHandler = event =>{
      setLastName(event.target.value);
  };
  const emailHandler = event =>{
      setEmail(event.target.value);
  };
  const semesterHandler = event =>{
      setSem(event.target.value);
  };
  const branchHandler = event =>{
      setBranch(event.target.value);
  };

  const submitFormHandler = event =>{
    event.preventDefault();
    console.log({
        firstName,
        lastName,
        email,
        semester,
        branch
    })
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} textAlign={"center"}>
            Sign up for Non-FCRIT Students
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input 
                  type="text"
                  value = {firstName}
                  onChange = {firstNameHandler}
                  placeholder = "John"
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input 
                  type="text" 
                  value = {lastName}
                  onChange={lastNameHandler}
                  placeholder = "Doe"
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input 
              type="email" 
              value = {email}
              onChange ={emailHandler}
              placeholder="abc@xyz.com"
              />
            </FormControl>
            <FormControl id="semester" isRequired>
              <FormLabel>Semester</FormLabel>

              <Input 
              type="number" 
              max="8" min="1" 
              value = {semester}
              onChange = {semesterHandler}
              placeholder = "5"
              />
            </FormControl>
            <FormControl id="branch" isRequired>
              <FormLabel>Branch</FormLabel>
              <Select 
              placeholder="Select branch"
              value = {branch}
              onChange = {branchHandler}
              >
                <option>Computer</option>
                <option>IT</option>
                <option>EXTC</option>
                <option>Electrical</option>
                <option>Mechanical</option>
                <option>Civil</option>
              </Select>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick = {submitFormHandler}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={2}>
              <Text align={"center"}>
                Already a user? <Link color={"blue.400"}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default register;
