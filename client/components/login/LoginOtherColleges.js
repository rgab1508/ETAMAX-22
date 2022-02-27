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
  HStack,
  Select,
  InputLeftAddon,
  InputGroup,
  useToast,
  toast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import Success from "../alerts/Success";
import * as ga from "../../libs/ga";
import NextLink from "next/link";

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
  const errorToast = useToast({
    position: "top-right",
    duration: 3000,
    status: "error",
    isClosable: true,
  });
  const successToast = useToast({
    position: "top-right",
    duration: 3000,
    render: () => <Success message={"Successfully registered"} />,
    isClosable: true,
  });

  const router = useRouter();

  const validateInput = () => {
    const departments = ["COMP", "IT", "EXTC", "ELEC", "MECH", "OTHERS"];
    const {
      name,
      email,
      college,
      department,
      semester: s,
      phone_no: p,
    } = values;
    let semester = parseInt(s);
    let phone_no = parseInt(p);
    if (name.trim() == "") {
      errorToast({ title: "Name is required!" });
      return false;
    }
    if (college.trim() == "") {
      errorToast({ title: "College is required!" });
      return false;
    }
    if (!departments.includes(department.trim())) {
      errorToast({ title: "Department is required!" });
      return false;
    }
    if (Number.isNaN(semester) || semester < 1 || semester > 8) {
      errorToast({ title: "Semester should be between 1 and 8!" });
      return false;
    }
    if (Number.isNaN(phone_no) || p.trim().length < 10) {
      errorToast({ title: "Enter a valid Phone Number!" });
      return false;
    }
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      errorToast({
        title: "Enter a valid Email!",
      });
      return false;
    }
    return true;
  };

  const isRegistered = async (email, phone_no) => {
    let body;
    if (email) {
      body = { email };
    } else {
      body = { phone_no };
    }
    fetch(`${API_BASE_URL}/u/exists/`, {
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
        if (res.success) {
          return res.exists;
        }
      })
      .catch((res) => {
        errorToast({ title: "Something went wrong!" });
      });
    return false;
  };

  const handleSubmit = async (e) => {
    // validate input
    if (!validateInput()) return;

    const {
      name,
      email,
      college,
      department,
      semester: s,
      phone_no: p,
    } = values;
    let semester = Number.parseInt(s);

    // check if email is already registered
    if (await isRegistered(email, null)) {
      errorToast({ title: "Email is already registered!" });
      return;
    }
    // check if phone number is already registered
    if (await isRegistered(null, "+91" + p)) {
      errorToast({ title: "Phone Number is already registered!" });
      return;
    }
    // resgister user
    try {
      const res = await fetch(`${API_BASE_URL}/u/request/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({
          name,
          email,
          college,
          department,
          semester,
          phone_no: "+91" + p,
        }),
      });
      const data = await res.json();
      if (data.success) {
        ga.event({
          action: "User Request",
          params: {
            college,
            department,
            semester,
          },
        });
        successToast({
          title: "Request sent successfully!",
          description: "You will recieve an email when approved",
        });
        router.push("/");
      } else {
        console.log(data);
        for (let x in data.errors) {
          errorToast({ title: data.errors[x] });
        }
      }
    } catch (err) {
      errorToast({ title: "Something went wrong!" });
    }
  };

  const handleChange = (e) => {
    setValues((prevValues) => {
      return {
        ...prevValues,
        [e.target.name]: e.target.value,
      };
    });
  };

  // useEffect(() => console.log(values), [values]);

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("pink.100", "pink.800")}
      borderRadius={"10px"}
      flexDir={"column"}
    >
      <Stack w="100%" spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"2xl"} color="pink.600" textAlign={"center"}>
            *Only for Non-FCRIT Students
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("pink.50", "gray.700")}
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
                  placeholder="Enter your full name here"
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
            </Box>

            <FormControl isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email address"
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
              <FormLabel>Semester</FormLabel>

              <Input
                type="number"
                max="8"
                min="1"
                value={values.semester}
                name="semester"
                onChange={handleChange}
                placeholder="5"
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
              <FormLabel>Branch</FormLabel>
              <Select
                placeholder="Select branch"
                value={values.department}
                name="department"
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
                placeholder="Enter your college name and location"
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
              <FormLabel>Phone Number</FormLabel>
              <InputGroup>
                <InputLeftAddon children="+91" />
                {/* <Input type='tel' placeholder='phone number' /> */}
                <Input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  value={values.phone_no}
                  name="phone_no"
                  onChange={handleChange}
                  placeholder="Your phone no."
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
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg={"pink.400"}
                color={"white"}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      <Text pb="30px" color="pink.500">
        Need help with registration ?{" "}
        <b>
          <NextLink href="/contact-council">Click here</NextLink>
        </b>
      </Text>
    </Flex>
  );
};

export default LoginOtherColleges;
