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
  HStack,
  Select,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const LoginOtherColleges = () => {
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [isFormValid, setFormValid] = useState(true);
  const [values, setValues] = useState({
    email: "",
    name: "",
    college: "",
    department: "COMP",
    semester: "",
    phone_no: "",
  });

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

  const handleChange = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => console.log(values), [values]);

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
            *Only for Non-FCRIT Students
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </FormControl>
            </Box>

            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="abc@xyz.com"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Semester</FormLabel>

              <Input
                type="number"
                max="8"
                min="1"
                value={values.semester}
                name="semester"
                onChange={handleChange}
                placeholder="5"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Branch</FormLabel>
              <Select
                placeholder="Select branch"
                value={values.department}
                name="department"
                onChange={handleChange}
              >
                <option value={"COMP"}>Computer</option>
                <option value={"IT"}>IT</option>
                <option value={"EXTC"}>EXTC</option>
                <option value={"ELEC"}>Electrical</option>
                <option value={"MECH"}>Mechanical</option>
                <option value={"OTHERS"}>Other</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>College</FormLabel>
              <Input
                type="text"
                value={values.college}
                name="college"
                onChange={handleChange}
                placeholder="XYZ College"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+91" />
                {/* <Input type='tel' placeholder='phone number' /> */}
                <Input
                  type="number"
                  value={values.phone_no}
                  name="phone_no"
                  onChange={handleChange}
                  placeholder="1234567890"
                />
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg={"pink.400"}
                color={"white"}
                onClick={submitFormHandler}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginOtherColleges;
