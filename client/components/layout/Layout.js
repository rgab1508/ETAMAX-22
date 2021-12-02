import Navbar from "./Navbar";
import Footer from "./Footer";
import { Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Flex bg="transparent" flexDirection="column" h="auto" w="100vw">
        {children}
      </Flex>
      <Footer />
    </>
  );
}
