import React from "react";
import { Button, Stack, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Component({ children, to }) {
  const scheme = "yellow";
  const step1 = useColorModeValue("600", "300");
  const step2 = useColorModeValue("500", "400");
  const step3 = useColorModeValue("300", "500");
  const router = useRouter();

  const sizes = ["lg"];
  return (
    <Button
      //bgColor={`${scheme}.${step1}`}
      bg="transparent"
      color="white"
      fontWeight="medium"
      // rounded="2xl"
      // shadow="xl"
      size={"lg"}
      _focus={{
        outline: "none",
      }}
      transition="background 0.5s"
      backgroundPosition="center"
      _hover={{
        bgColor: `pink.200`,
        bgGradient: `radial(circle, transparent 1%, gray.${step2} 1%)`,
        bgPos: "center",
        backgroundSize: "15000%",
      }}
      _active={{
        bgColor: `pink.200`,
        backgroundSize: "100%",
        transition: "background 0s",
        color: "black",
      }}
      onClick={() => {
        router.push(to);
      }}
    >
      {children}
    </Button>
  );
}
