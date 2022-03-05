import { useState, useEffect } from "react";
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
  InputGroup,
  InputRightAddon,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { API_BASE_URL } from "../../config";
import { useRouter } from "next/router";
import * as cookie from "cookie";
import * as ga from "../../libs/ga";
import NextLink from "next/link";

const LoginForm = () => {
  const [values, setValues] = useState({
    roll_no: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const errorToast = useToast({
    position: "top-right",
    duration: 3000,
    status: "error",
    isClosable: true,
  });

  const successToast = useToast({
    position: "top-right",
    duration: 3000,
    status: "success",
    isClosable: true,
  });

  const router = useRouter();
  useEffect(() => {
    let userJSON = localStorage.getItem("eta_user");
    if (userJSON && JSON.parse(userJSON).token) {
      router.replace("/");
    }
  }, []);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = () => {
    const { roll_no: r, password } = values;
    let roll_no = Number.parseInt(r);
    if (Number.isNaN(roll_no)) {
      errorToast({
        title: "Please enter a valid Roll Number",
      });
      return false;
    }

    if (password.trim().length <= 0) {
      errorToast({
        title: "Please enter a valid password",
      });
      return false;
    }
    return true;
  };

  useEffect(() => console.log(isLoading), [isLoading]);

  const handleSubmit = (e) => {
    setIsLoading(true);

    if (!validateInput()) {
      return;
    }
    const { roll_no: r, password } = values;
    let username = Number.parseInt(r);
    let body = {
      username,
      password,
    };

    fetch(`${API_BASE_URL}/u/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        ga.event({
          action: "Login",
          params: {
            roll_no: username,
            semester: res.user.semester,
            department: res.user.department,
          },
        });
        successToast({
          title: "Successfully Logged In!",
          description: `Welcome ${res.user.roll_no}!`,
        });
        localStorage.setItem("eta_user", JSON.stringify(res));
        window.document.cookie = cookie.serialize("eta_token", res.token);
        router.push("/");
        setIsLoading(false);
      })
      .catch((err) => {
        errorToast({
          title: "Someting went Wrong!",
        });
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("pink.100", "pink.800")}
      w="100%"
      borderRadius={"10px"}
      flexDir="column"
    >
      <Stack w="100%" spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading color="pink.600" fontSize={"3xl"}>
            Credentials are sent via email
          </Heading>
          <Text color={"pink.500"} fontSize={"xl"}>
            *check spam folder if not in inbox
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("pink.50", "gray.700")}
          boxShadow={"lg"}
          p={8}
          w="100%"
        >
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Roll Number</FormLabel>
              <Input
                placeholder="Enter roll number/ registration number"
                type="number"
                name="roll_no"
                value={values.roll_no}
                onChange={handleChange}
                _focus={{
                  outline: "none",
                  borderColor: "pink.400",
                  borderWidth: "2px",
                }}
                _hover={{
                  borderColor: "pink.300",
                  borderWidth: "2px",
                }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                  placeholder="Enter your password"
                  _focus={{
                    outline: "none",
                    borderColor: "pink.400",
                    borderWidth: "2px",
                  }}
                  _hover={{
                    borderColor: "pink.300",
                    borderWidth: "2px",
                  }}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Button
                size="lg"
                bg={"pink.400"}
                color={"white"}
                _hover={{
                  bg: "pink.500",
                }}
                isLoading={isLoading}
                isDisabled={isLoading}
                onClick={handleSubmit}
              >
                Log In
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Text color="pink.500">
        Need help with login ?{" "}
        <b>
          <NextLink href="/contact-council">Click here</NextLink>
        </b>
      </Text>
    </Flex>
  );
};

export default LoginForm;
