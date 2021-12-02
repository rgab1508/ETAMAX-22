import { Box } from "@chakra-ui/react";

export default function Background() {
  // Current idea is to include parallax effect in the background and have it move with the scroll
  // Minified version of the events will be displayed later
  return (
    <Box
      as="img"
      src={"assets/background.svg"}
      alt={"Background test"}
      position="fixed"
      zIndex="-2"
      objectFit="cover"
      backgroundPosition="center"
      backgroundSize="cover"
      h="100vh"
      w="100%"
    />
  );
}
