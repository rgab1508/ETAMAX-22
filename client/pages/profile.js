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
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Layout from "../components/layout/Layout";
import Head from "next/head";
import Background from "../components/Background";
import ProfileCard from "../components/cards/ProfileCard";

export default function Home() {
  const [profile, setProfile] = useState({});

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
      .signInWithPhoneNumber(phone, recaptchaVerifier)
      .then((_verify) => (window.verify = _verify))
      .catch(console.log);
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
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input type="password" />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input type="password" />
                    </InputGroup>
                  </FormControl>
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
                <ProfileCard randomAvatar={randomAvatar} />
              </Flex>
            </Flex>
          </Stack>
        </Flex>
      </Layout>
    </>
  );
}
