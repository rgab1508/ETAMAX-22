// import { Flex, Text } from "@chakra-ui/react";

// export default function Footer() {
//   return (
//     <Flex
//       position="relative"
//       bottom="0"
//       w="100%"
//       h="50px"
//       justifyContent="center"
//       bg="pink.100"
//     >
//       <Text fontSize="xl" color="pink.400">
//         FCRIT
//       </Text>
//     </Flex>
//   );
// }

import { Flex, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      //bgGradient="linear(to-r,rgb(69, 39, 160,0.75),rgb(69, 40, 160,0.75),rgb(69, 49, 160,0.75),rgb(0, 121, 107,0.75))"
      // bg="rgb(69, 39, 160,0.75)"
      bg="pink.100"
      w="100%"
      h={{ md: "9vh" }}
      // px={{ base: "20px", md: "50px" }}
      // py={{ md: "20px" }}
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
          <Link target="_blank" href="https://github.com/">
            Anushka
          </Link>{" "}
          &{" "}
          <Link target="_blank" href="https://github.com/">
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
