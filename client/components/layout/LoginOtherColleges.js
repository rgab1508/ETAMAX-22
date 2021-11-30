import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";

const LoginOtherColleges = () => {

  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [isFormValid, setFormValid] = useState(true);

  const emailHandler = (event) => {
    setRoll(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (email == "" && password.trim() == "") {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    console.log({ email, password });
  };
  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("pink.100", "pink.800")}
    >
      <Stack spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} textAlign={"center"}>
            Sign In for Non-FCRIT Students
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel color={isFormValid ? "black" : "red"}>Email address</FormLabel>
              <Input 
              type="email" 
              value = {email}
              onChange = {emailHandler}
              placeholder = "abc@xyz.com"
              borderColor={isFormValid ? "black" : "red"}
              />
               {!isFormValid && <Text color="red">Incorrect Email</Text>}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color={isFormValid ? "black" : "red"}>Password</FormLabel>
                <Input 
                type = "password"
                value = {password}
                onChange = {passwordHandler}
                placeholder = "******"
                borderColor={isFormValid ? "black" : "red"}
                />
                 {!isFormValid && <Text color="red">Incorrect Password</Text>}
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg={"pink.400"}
                color={"white"}
                onClick = {submitFormHandler}
              >
               Log In
              </Button>
            </Stack>
            <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginOtherColleges;
