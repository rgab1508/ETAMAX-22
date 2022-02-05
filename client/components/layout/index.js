import Navbar from "./Navbar";
import Footer from "./Footer";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Layout({ children }) {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const dist = window.scrollY;
      document.getElementById(
        "blossom-container"
      ).style.transform = `-translateY(${dist * 1}px)`;
    });
  }, []);

  return (
    <>
      <Navbar />
      <Flex
        id="blossom-container"
        bg="transparent"
        flexDirection="column"
        h="auto"
        w="100vw"
      >
        {children}
      </Flex>
      <Footer />
    </>
  );
}
