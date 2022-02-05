import {
  Box,
  Center,
  Heading,
  Button,
  Flex,
  Collapse,
  SlideFade,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import LinkButtons from "./LinkButtons";
import { useState, useEffect, useRef } from "react";
import { API_BASE_URL } from "../../config";
import router from "next/router";

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3.5"
    stroke="#eb94a4"
    strokeLinecap="round"
    {...props}
  />
);

const MotionFlex = motion(Flex);

function Logo({ visible, ...rest }) {
  return (
    <Center {...rest}>
      <Heading
        fontSize={{ base: "2xl", md: "25pt" }}
        fontWeight="bolder"
        color="white"
      >
        {visible ? "ETAMAX - 22" : ""}
      </Heading>
    </Center>
  );
}

function MenuToggle({ toggle }) {
  return (
    <Button
      bg="transparent"
      variant="ghost"
      color="white"
      display={{ md: "none", base: "block" }}
      onClick={toggle}
      _focus={{ outline: "none!important", bg: "pink.100" }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </svg>
    </Button>
  );
}

function MenuItems({ children, to, color }) {
  return (
    <LinkButtons color={color} to={to}>
      {children}
    </LinkButtons>
  );
}

function DrawerNavbar({ isOpen }) {
  const [color, setColor] = useState("pink.400");
  const [loggedIn, setLoggedIn] = useState(false);
  const step2 = useColorModeValue("300", "200");
  const toast = useToast();
  const successToast = useToast({
    position: "top-right",
    duration: 3000,
    status: "success",
    isClosable: true,
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 450) {
        setColor("white");
      } else {
        setColor("pink.400");
      }
    });

    const user = localStorage.getItem("eta_user");
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  async function handleLogout() {
    let user = JSON.parse(localStorage.getItem("eta_user"));
    if (user) {
      const res = await fetch(`${API_BASE_URL}/u/auth/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${user.token}`,
        },
        redirect: "follow",
        referrer: "no-referrer",
      }).catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      });
      if (res.status == 200) {
        localStorage.removeItem("eta_user");
        setLoggedIn(false);
        successToast({
          title: "Success",
          description: "Logged out successfully",
        });
        router.push("/");
      }
    }
  }

  return (
    <Box
      bg="transparent"
      display={{ base: "block", md: "block" }}
      opacity={isOpen ? 1 : 0}
      transition="all 0.22s ease-in-out"
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Collapse in={isOpen} animateOpacity>
        <Box
          flexBasis={{ base: "100%", md: "auto" }}
          background={{ base: "pink.100", md: "transparent" }}
          p={{ base: "20px", md: "0px" }}
          borderRadius="15px"
        >
          <SlideFade in={isOpen}>
            <Stack
              justify={["center", "space-between", "flex-end", "flex-end"]}
              direction={["column", "row", "row", "row"]}
              pt={[4, 4, 0, 0]}
            >
              <MenuItems color={color} to="/">
                Home
              </MenuItems>
              <MenuItems color={color} to="/events">
                Events
              </MenuItems>
              {!loggedIn && (
                <MenuItems color={color} to="/login">
                  Login
                </MenuItems>
              )}
              {loggedIn && (
                <MenuItems color={color} to="/profile">
                  Profile
                </MenuItems>
              )}
              {loggedIn && (
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
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              )}
            </Stack>
          </SlideFade>
        </Box>
      </Collapse>
    </Box>
  );
}

function NavbarContainer({ setVisible, children, ...rest }) {
  const [background, setBackground] = useState("transparent");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 450) {
        setBackground("#fcc0cb");
      } else {
        setBackground("transparent");
      }
    });
  }, []);

  return (
    <MotionFlex
      justifyContent={{ base: "space-between", md: "space-between" }}
      initial={false}
      background={background}
      justify="space-between"
      wrap="wrap"
      p="20px"
      w="100%"
      sx={{ transition: "all 0.2s ease-in-out" }}
      position="fixed"
      zIndex="3"
      boxShadow={
        background != "transparent"
          ? "0px 1px 10px 0px rgb(255 0 200 / 25%)"
          : "none"
      }
      {...rest}
    >
      {children}
    </MotionFlex>
  );
}

export default function Navbar(props) {
  const [isOpen, toggleOpen] = useState(true);
  const [visible, setVisible] = useState(0);
  const toggle = () => toggleOpen(!isOpen);
  const containerRef = useRef(null);

  useEffect(() => {
    window.onresize = () => {
      if (window.innerWidth >= 768) {
        toggleOpen(true);
      } else {
        toggleOpen(false);
      }
    };
    window.innerWidth >= 768 ? toggleOpen(true) : toggleOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 450) {
        setVisible(1);
      } else {
        setVisible(0);
      }
    });
  }, []);

  return (
    <NavbarContainer
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      {...props}
    >
      <Logo visible={visible} />
      <MenuToggle toggle={toggle} />
      <DrawerNavbar isOpen={isOpen} />
    </NavbarContainer>
  );
}
