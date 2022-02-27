import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      as="footer"
      bg="pink.100"
      w="100%"
      h={{ md: "7vh" }}
      py="20px"
      gridGap="2"
      align="center"
    >
      <Flex
        width="90%"
        mx="auto"
        flexDir={["column-reverse", "row", "row", "row"]}
        align="center"
      >
        <Text
          textAlign={["center", "unset", "unset", "unset"]}
          noOfLines={2}
          flex={2}
          color="pink.400"
        >
          Developed by{" "}
          <Link target="_blank" href="https://github.com/theabbie">
            Abhishek
          </Link>
          ,{" "}
          <Link target="_blank" href="https://www.adiunni.tech/">
            Aditya
          </Link>
          ,{" "}
          <Link target="_blank" href="https://github.com/rgab1508">
            Gabriel
          </Link>
          ,{" "}
          <Link target="_blank" href="https://github.com/dcostat04">
            Trevor
          </Link>
          ,{" "}
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/anushka-amte-210253195/"
          >
            Anushka
          </Link>{" "}
          &{" "}
          <Link target="_blank" href="https://www.linkedin.com/in/elishagras/">
            Elisha
          </Link>
        </Text>
        <Text
          flex={1}
          as="a"
          href={"https://fcrit.ac.in"}
          color="pink.500"
          textAlign={["center", "end", "end", "end"]}
        >
          F.C.R.I.T
        </Text>
      </Flex>
    </Flex>
  );
}
