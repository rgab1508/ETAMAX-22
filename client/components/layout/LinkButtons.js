import React from "react";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Component({
  children,
  to,
  color,
  nextLink,
  isDisabled,
}) {
  const step2 = useColorModeValue("300", "200");
  const router = useRouter();

  return (
    <Button
      bg="transparent"
      color={color}
      fontWeight="medium"
      size={"lg"}
      _focus={{
        outline: "none",
      }}
      transition="all 0.3s"
      backgroundPosition="center"
      _hover={{
        bgColor: `pink.100`,
        bgGradient: `radial(circle, transparent 1%, pink.${step2} 1%)`,
        bgPos: "center",
        backgroundSize: "15000%",
        color: "pink.300",
        outline: "none",
      }}
      _active={{
        bgColor: `pink.200`,
        backgroundSize: "100%",
        transition: "background 0s",
        color: "pink.500",
        outline: "none",
      }}
      onClick={() => {
        if (nextLink) {
          router.push(to);
        } else {
          window.location.replace(to);
        }
      }}
      isDisabled={isDisabled}
    >
      {children}
    </Button>
  );
}
