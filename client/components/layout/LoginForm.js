import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";

const LoginForm = () => {
  var [rollNo, setRoll] = useState("");
  var [password, setPassword] = useState("");
  var [isFormValid, setFormValid] = useState(true);

  const rollNoHandler = (event) => {
    setRoll(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (rollNo == "" && password.trim() == "") {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    console.log({ rollNo, password });
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
          <Heading fontSize={"2xl"}>Sign In for FCRIT Students</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="rollno" isRequired>
              <FormLabel color={isFormValid ? "black" : "red"}>
                Roll Number
              </FormLabel>
              <Input
                placeholder="1019104"
                type="number"
                value={rollNo}
                onChange={rollNoHandler}
                borderColor={isFormValid ? "black" : "red"}
              />
              {!isFormValid && <Text color="red">Incorrect Roll No</Text>}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel color={isFormValid ? "black" : "red"}>
                Password
              </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={passwordHandler}
                placeholder="*******"
                borderColor={isFormValid ? "grey" : "red"}
              />
              {!isFormValid && <Text color="red">Incorrect Password</Text>}
            </FormControl>
            <Stack spacing={10}>
              <Button
                size="lg"
                bg={"pink.400"}
                color={"white"}
                _hover={{
                  bg: "pink.500",
                }}
                onClick={submitFormHandler}
              >
                Log In
              </Button>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
