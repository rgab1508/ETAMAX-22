import {
  Box,
  Center,
  Heading,
  Button,
  Flex,
  Collapse,
  SlideFade,
  Stack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import LinkButtons from "./LinkButtons";
import { useState, useEffect, useRef } from "react";

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
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setColor("white");
      } else {
        setColor("pink.400");
      }
    });
  }, []);

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
              <MenuItems color={color} to="/login">
                Login
              </MenuItems>
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
      if (window.scrollY > 500) {
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
      if (window.scrollY > 500) {
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
