import { Box } from "@chakra-ui/react";

export default function Background() {
  // Current idea is to include parallax effect in the background and have it move with the scroll
  // Minified version of the events will be displayed later
  return (
    <Box
      as="img"
      src={"assets/festImageTest.jpeg"}
      alt={"festImageTest"}
      position="fixed"
      zIndex="-1"
      objectFit="cover"
      backgroundAttachment="scroll"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      h="100vh"
      w="100%"
    />
  );
}
