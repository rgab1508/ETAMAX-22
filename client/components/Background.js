import { Image } from "@chakra-ui/react";

export default function Background() {
  // Current idea is to include parallax effect in the background and have it move with the scroll
  // Minified version of the events will be displayed later
  return (
    <Image
      src={"assets/festImageTest.jpeg"}
      alt={"festImageTest"}
      position="absolute"
      zIndex="-1"
      top="0"
      left="0"
      right="0"
      bottom="0"
      objectFit="cover"
      objectPosition="center"
      w="100%"
      h="100vh"
    />
  );
}
