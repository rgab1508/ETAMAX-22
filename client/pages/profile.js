import {
  Box,
  Center,
  Heading,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  HStack,
  InputGroup,
  Stack,
  Link,
  Select,
  Button,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Layout from "../components/layout";
import Head from "next/head";
import Background from "../components/Background";
import ProfileCard from "../components/cards/ProfileCard";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../config";
import * as cookie from "cookie";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "pink.400",
          color: "white",
          borderColor: "pink.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
        m={1}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function Profile(props) {
  const [profile, setProfile] = useState(props.profile);
  const [OTP, setOTP] = useState("");
  const [OTPSent, setOTPSent] = useState(false);
  const [phoneSet, setPhoneSet] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  function randomAvatar() {
    var randomAvatar = `https://avatars.dicebear.com/api/human/${Math.random()
      .toString(36)
      .substring(2, 5)}.svg`;
    setProfile({ ...profile, avatar: randomAvatar });
  }

  if (!firebase.apps.length) {
    firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE));
  } else {
    firebase.app();
  }

  const departments = ["COMP", "IT", "EXTC", "MECH", "ELEC", "OTHER"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "department",
    value: profile.department,
  });

  const group = getRootProps();

  function login() {
    var recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: () => setOTPSent(true),
      }
    );
    firebase
      .auth()
      .signInWithPhoneNumber(profile.phone_no, recaptchaVerifier)
      .then((_verify) => (window.verify = _verify))
      .catch(console.log);
  }

  function verifyOTP() {
    window.verify
      .confirm(OTP)
      .then((stuff) => {
        console.log(stuff);
        setPhoneSet(true);
        toast({
          title: "Phone verification succesful",
          position: "top-right",
          duration: 3000,
          status: "success",
        });
        setEditPhone(false);
        firebase
          .auth()
          .currentUser.getIdToken(true)
          .then(async (user) => {
            await axios({
              url: `${API_BASE_URL}/submit_phone`,
              method: "POST",
              data: { user, token: profile.token },
            });
          });
      })
      .catch((stuff) => {
        toast({
          title: "OTP Wrong, I guess",
          position: "top-right",
          duration: 3000,
          status: "error",
        });
      });
  }

  async function updateProfile() {
    await axios({
      url: `${API_BASE_URL}/u/avatar/update/`,
      method: "POST",
      data: {
        avatar: profile.avatar,
      },
      headers: {
        Authorization:
          "Token " + JSON.parse(localStorage.getItem("eta_user")).token,
      },
    }).catch(console.log);
    await axios({
      url: `${API_BASE_URL}/u/update/`,
      method: "POST",
      data: {
        name: profile.name,
        department: profile.department,
        semester: profile.semester,
      },
      headers: {
        Authorization:
          "Token " + JSON.parse(localStorage.getItem("eta_user")).token,
      },
    });
    toast({
      title: "Profile updated succesfully",
      position: "top-right",
      duration: 3000,
      status: "success",
    });
  }

  return (
    <>
      <Head>
        <title>ETAMAX-22 | Profile</title>
      </Head>
      <Layout>
        <Background pageName={"Home"} />
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Edit Profile
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                to participate in all events ✌️
              </Text>
            </Stack>
            <Flex
              align="center"
              w={{ base: "auto", md: "80vh" }}
              direction={{ base: "column", md: "row" }}
            >
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
                        <Input type="text" />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id="lastName">
                        <FormLabel>Last Name</FormLabel>
                        <Input type="text" />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Department</FormLabel>
                    <Flex wrap="wrap">
                      {departments.map((value) => {
                        const radio = getRadioProps({ value });
                        return (
                          <RadioCard key={value} {...radio}>
                            {value}
                          </RadioCard>
                        );
                      })}
                    </Flex>
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Semester</FormLabel>
                    <Select placeholder="Select Semester">
                      {[1, 2, 3, 4, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl m={1}>
                    <FormLabel>Phone</FormLabel>
                    <InputGroup>
                      <InputLeftElement background="transparent">
                        +91
                      </InputLeftElement>
                      <Input
                        name="phone"
                        defaultValue={
                          profile.phone_no && profile.phone_no.substring(3)
                        }
                        id="phone"
                        readOnly={!editPhone}
                        maxLength={10}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            phone_no: "+91" + e.target.value,
                          })
                        }
                      />
                      <InputRightElement>
                        {editPhone || (
                          <EditIcon
                            onClick={() => setEditPhone(true)}
                            display="inline"
                            cursor="pointer"
                          />
                        )}
                      </InputRightElement>
                    </InputGroup>
                    {editPhone && (
                      <Button bg="pink.400" onClick={login} m={2} color="white">
                        Verify OTP
                      </Button>
                    )}
                    <Flex
                      id="recaptcha-container"
                      pl={3}
                      display={OTPSent && "none"}
                    />
                  </FormControl>
                  {!phoneSet && OTPSent && (
                    <FormControl m={1}>
                      <FormLabel>OTP</FormLabel>
                      <Input
                        id="otp"
                        onChange={(e) => setOTP(e.target.value)}
                        variant="filled"
                        color="white"
                        bg="black"
                      />
                      <Button
                        bg="linear-gradient(147deg, #000000 0%,rgb(17, 82, 45) 74%)"
                        onClick={verifyOTP}
                        m={3}
                        color="white"
                      >
                        Submit OTP
                      </Button>
                    </FormControl>
                  )}
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"pink.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Save Profile
                    </Button>
                  </Stack>
                </Stack>
              </Box>
              <Flex p={4}>
                <ProfileCard profile={profile} randomAvatar={randomAvatar} />
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  var token = cookie.parse(req.headers.cookie || "")["token"];
  if (!token) {
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
  try {
    var profile = await axios({
      url: `${API_BASE_URL}/u/me`,
      headers: {
        Authorization: "Token " + token,
      },
    });
    console.log(profile.data.user);
    return {
      props: {
        profile: profile.data.user,
      },
    };
  } catch (e) {
    console.log(e);
    res.writeHead(302, { Location: "/" });
    res.end();
    return { props: {} };
  }
}
