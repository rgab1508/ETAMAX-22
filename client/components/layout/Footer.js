import { Flex, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      position="relative"
      bottom="0"
      w="100%"
      h="10vh"
      justifyContent="center"
      bg="black"
    >
      <Text fontSize="xl" color="white">
        Footer here
      </Text>
    </Flex>
  );
}
