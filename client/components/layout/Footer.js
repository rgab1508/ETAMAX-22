import { Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      position="relative"
      bottom="0"
      w="100%"
      h="50px"
      justifyContent="center"
      bg="pink.100"
    >
      <Text fontSize="xl" color="white">
        FCRIT
      </Text>
    </Flex>
  );
}
