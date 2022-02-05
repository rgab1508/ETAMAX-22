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
import { API_BASE_URL } from "../config";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [values, setValues] = useState({
    roll_no: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
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
        successToast({
          title: "Successfully Logged In!",
          description: `Welcome ${res.user.roll_no}!`,
        });
        localStorage.setItem("eta_user", JSON.stringify(res));
        router.push("/");
      })
      .catch((err) => {
        errorToast({
          title: "Someting went Wrong!",
        });
        console.error(err);
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
    >
      <Stack w="100%" spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"}>Credentials sent in email</Heading>
          <Text>*check spam folder</Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
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
                onClick={handleSubmit}
              >
                Log In
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginForm;
