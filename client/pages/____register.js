import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Select,
  Stack,
  Center,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";

const register = () => {
  const [participant, setParticipant] = useState({
    firstName: "",
    lastName: "",
    semester: "",
    college: "",
    branch: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipant({ ...participant, [name]: value });
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    console.log(participant);
  };
  return (
    <>
      <Head>
        <title>ETAMAX-22 | Register</title>
      </Head>
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
                      value={participant.firstName}
                      name="firstName"
                      onChange={handleChange}
                      placeholder="John"
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={participant.lastName}
                      name="lastName"
                      onChange={handleChange}
                      placeholder="Doe"
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={participant.email}
                  name="email"
                  onChange={handleChange}
                  placeholder="abc@xyz.com"
                />
              </FormControl>
              <FormControl id="semester" isRequired>
                <FormLabel>Semester</FormLabel>

                <Input
                  type="number"
                  max="8"
                  min="1"
                  value={participant.semester}
                  name="semester"
                  onChange={handleChange}
                  placeholder="5"
                />
              </FormControl>
              <FormControl id="branch" isRequired>
                <FormLabel>Branch</FormLabel>
                <Select
                  placeholder="Select branch"
                  value={participant.branch}
                  name="branch"
                  onChange={handleChange}
                >
                  <option>Computer</option>
                  <option>IT</option>
                  <option>EXTC</option>
                  <option>Electrical</option>
                  <option>Mechanical</option>
                  <option>Civil</option>
                </Select>
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>College</FormLabel>
                <Input
                  type="text"
                  value={participant.college}
                  name="college"
                  onChange={handleChange}
                  placeholder="XYZ College"
                />
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
                  onClick={submitFormHandler}
                >
                  Sign up
                </Button>
              </Stack>
              <Center pt={2}>
                <Flex gridGap="1" align={"center"}>
                  Already a user?{" "}
                  <Link href="/login" color={"blue.400"}>
                    <Text color="blue.300">
                      <u> Login</u>
                    </Text>
                  </Link>
                </Flex>
              </Center>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default register;
