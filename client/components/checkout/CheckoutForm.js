import {
  Box,
  Text,
  useToast,
  Input,
  Flex,
  HStack,
  Checkbox,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio();
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
          boxShadow: "outline",
        }}
        px={5}
        py={3}
        fontWeight="bold"
        w={{ base: "20vw", lg: "auto" }}
        fontSize={{ base: "13pt", md: "14pt" }}
        transition={"all 0.2s ease"}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export default function CheckoutForm({}) {
  const [checked, setChecked] = useState(false);
  const donateOptions = ["10", "20", "30", "Other"];
  const [donation, setDonation] = useState("10");

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "donation",
    defaultValue: "10",
    onChange: (e) => {
      console.log(value);
      setDonation(e.target.value);
    },
  });
  const group = getRootProps();

  return (
    <Flex w="90%" h="95%" p="15px" flexDir={"column"} gridGap={"3"}>
      <Text fontSize={"16pt"}>
        <b>Total events:</b> 3
      </Text>
      <Text fontSize={"16pt"}>
        <b>Total price:</b> $100
      </Text>
      <Text fontSize={"16pt"}>Would you like to donate for this event?</Text>
      <Checkbox
        size="lg"
        m="10px"
        colorScheme={"pink"}
        _focus={{ outline: "none!important" }}
        isChecked={checked}
        onChange={() => setChecked(!checked)}
      >
        Yes
      </Checkbox>
      {checked && (
        <HStack {...group}>
          {donateOptions.map((value) => {
            const radio = getRadioProps({ value: value });
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            );
          })}
        </HStack>
      )}
      {checked && donation === "Other" && <Input />}
    </Flex>
  );
}
