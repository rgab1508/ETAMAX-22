import { Box, Text } from "@chakra-ui/react";
import React from "react";

const FooterOnTopOfFooter = () => {
  return (
    <Box
      display={"flex"}
      h="40px"
      w="100%"
      bg="pink.200"
      justifyContent={"center"}
      alignItems={"center"}
      gridGap="2"
    >
      <Text color="pink.500">In Loving Memories of __NAME__.</Text>
    </Box>
  );
};

export default FooterOnTopOfFooter;
