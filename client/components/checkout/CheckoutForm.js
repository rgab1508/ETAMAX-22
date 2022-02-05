import {
  Box,
  Text,
  useToast,
  Input,
  Flex,
  Switch,
  useRadio,
  useRadioGroup,
  Button,
  Spacer,
  SlideFade,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        bg="pink.100"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "linear-gradient(315deg, #e96196 0%, #ffffff 74%)",
          color: "pink.600",
        }}
        _focus={{
          outline: "none!important",
        }}
        px={4}
        py={2}
        fontWeight="bold"
        w={{ base: "auto", lg: "auto" }}
        fontSize={{ base: "13pt", md: "13pt" }}
        transition={"all 0.2s ease"}
        color="pink.400"
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function CheckoutForm({}) {
  const [checked, setChecked] = useState(false);
  const donateOptions = ["10 Rs", "20 Rs", "30 Rs", "40 Rs", "Custom Amount"];
  const [donation, setDonation] = useState(0);
  const [donationOther, setDonationOther] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "donation",
    onChange: (value) => {
      if (value === "10 Rs") {
        setDonation(10);
        setDonationOther(false);
      } else if (value === "20 Rs") {
        setDonation(20);
        setDonationOther(false);
      } else if (value === "30 Rs") {
        setDonation(30);
        setDonationOther(false);
      } else if (value === "40 Rs") {
        setDonation(40);
        setDonationOther(false);
      } else {
        setDonationOther(true);
      }
    },
  });
  const group = getRootProps();
  useEffect(() => {}, [donation]);

  return (
    <Flex
      w={{ base: "100%", lg: "90%" }}
      h="95%"
      p="15px"
      flexDir={"column"}
      gridGap={"3"}
    >
      <Text fontSize={{ base: "25pt", md: "35pt" }} color="gray.700">
        Checkout
      </Text>
      <Text color="gray.600" fontSize={{ base: "13pt", md: "16pt" }}>
        <b>Total events:</b> 3
      </Text>
      <Text color="gray.600" fontSize={{ base: "13pt", md: "16pt" }}>
        <b>Total price:</b> $100
      </Text>
      <Text color="gray.600" fontSize={{ base: "13pt", md: "16pt" }}>
        Would you like to donate for this event?
      </Text>
      <Flex flexDir={"row"} gridGap="4">
        <Switch
          size={"lg"}
          isChecked={checked}
          onChange={() => setChecked(!checked)}
          mt="1"
          colorScheme={"pink"}
        />
        <Text color="gray.600" fontSize={"16pt"}>
          Yes
        </Text>
      </Flex>
      <SlideFade in={checked} unmountOnExit>
        <Flex flexDir={"column"} gridGap="4">
          <Flex wrap="wrap" gridGap={2} {...group}>
            {donateOptions.map((value, index) => {
              const radio = getRadioProps({ value: value });
              return (
                <RadioCard c={false} key={index} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </Flex>
          <Input
            display={checked && donationOther ? "block" : "none"}
            transition={"all 0.2s ease"}
            variant="filled"
            placeholder="Enter custom amount"
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
            borderRadius="full"
            _focus={{
              bg: "pink.100",
              color: "pink.600",
            }}
          />
        </Flex>
      </SlideFade>
      {!checked && <Spacer h="5vh" />}
      <Text transition={"all 0.2s ease"} color="gray.600" fontSize={"16pt"}>
        Enter 12 digit transaction ID
      </Text>
      <Input
        variant={"filled"}
        name="transactionId"
        placeholder="Enter transaction Id"
        borderRadius="full"
        _focus={{
          bg: "pink.100",
          color: "pink.600",
        }}
        transition={"all 0.2s ease"}
        value={transactionId}
        onChange={(e) => setTransactionId(e.target.value)}
      />
      <Button
        transition={"all 0.2s ease"}
        position={"relative"}
        top="0"
        isFullWidth
      >
        Submit
      </Button>
    </Flex>
  );
}
