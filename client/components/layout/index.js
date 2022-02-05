import Navbar from "./Navbar";
import Footer from "./Footer";
import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { API_BASE_URL } from "../../config";

export default function Layout({ children }) {
  useEffect(() => {
    window.addEventListener("scroll", () => {
      const dist = window.scrollY;
      document.getElementById(
        "blossom-container"
      ).style.transform = `-translateY(${dist * 1}px)`;
    });
  }, []);

  useEffect(() => {
    let userJSON = localStorage.getItem("eta_user");
    if (userJSON) {
      let user = JSON.parse(userJSON);
      fetch(`${API_BASE_URL}/u/me/`, {
        headers: {
          Authorization: "Token " + user.token,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          let eta_user = {
            token: user.token,
            user: res.user,
          };
          localStorage.setItem("eta_user", JSON.stringify(eta_user));
        })
        .catch((e) => console.error(e));
    }
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
