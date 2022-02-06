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
  InputGroup,
  InputLeftAddon,
  Slide,
  InputRightElement,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config";
import * as ga from "../../libs/ga";

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

export default function CheckoutForm({ participations, user, setEvents }) {
  const donateOptions = ["10 Rs", "20 Rs", "30 Rs", "40 Rs", "Custom Amount"];
  const [donation, setDonation] = useState(0);
  const [donationOther, setDonationOther] = useState(false);
  const [donationOtherValue, setDonationOtherValue] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [eventAmount, setEventAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const toast = useToast();

  useEffect(() => {
    let newEventAmount = 0;
    for (let i = 0; i < participations.length; i++) {
      newEventAmount += participations[i].event.entry_fee;
    }
    setEventAmount(newEventAmount);
  }, []);

  useEffect(() => {
    if (!Number.isNaN(eventAmount) && !Number.isNaN(donation)) {
      setTotalAmount(eventAmount + donation);
    }
  }, [donation, eventAmount]);

  const handleCheckout = async () => {
    if (transactionId.trim().length < 5) {
      toast({
        title: "Please Enter a valid Transaction ID",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
      return;
    }

    if (participations.length === 0) {
      toast({
        title: "No events are Registered!",
        status: "error",
        duration: 3000,
        position: "top-right",
        isClosable: true,
      });
      return;
    }

    //! CHECK CRITERIA
    let criteriaJSON = user.user.criteria;
    console.log(criteriaJSON);
    let c = JSON.parse(criteriaJSON);
    if (c["C"] < 1 || c["T"] < 1) {
      toast({
        title:
          "Criteria Not Satisfied: Atleast 1 Cultural and 1 Technical Event",
        status: "error",
        duration: 3000,
        position: "top-right",
      });
      return;
    }

    let data = {
      upi_transaction_id: transactionId,
      participations: participations.map((p) => p.part_id),
      donation_amount: donation,
    };

    ga.event({
      action: "Checkout",
      params: {
        event_amount: eventAmount,
        donation_amount: donation,
        total_amount: totalAmount,
      },
    });

    fetch(`${API_BASE_URL}/u/checkout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + user.token,
      },
      body: JSON.stringify(data),
      redirect: "follow",
      referrerPolicy: "no-referrer",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          if (donation) {
            toast({
              status: "success",
              title: "Thankyou for Your Donation!",
              position: "top",
              duration: 3000,
            });
          }
          toast({
            status: "success",
            title: res.detail,
            position: "top-right",
          });
        }
        setEvents([]);
      })
      .catch((err) => console.log(err));
  };

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
        setDonationOther(!donationOther);
      }
    },
  });

  const group = getRootProps();

  return (
    <Flex
      w={{ base: "100%", lg: "90%" }}
      h="95%"
      p="15px"
      flexDir={"column"}
      gridGap={"1"}
    >
      <Text fontSize={{ base: "25pt", md: "35pt" }} color="gray.700">
        Checkout
      </Text>
      <Text color="gray.600" fontSize={{ base: "13pt", md: "16pt" }}>
        <b>Total events:</b> {participations.length}
      </Text>
      <Text color="gray.600" fontSize={{ base: "13pt", md: "16pt" }}>
        <b>Event Total:</b> Rs. {eventAmount}
      </Text>
      <Text color="gray.600" fontSize={{ base: "13pt", md: "16pt" }}>
        <b>Donation Amount:</b> Rs. {donation}
      </Text>
      <Text color="gray.600" fontSize={{ base: "13pt", md: "16pt" }}>
        <b>Total Amount:</b> Rs. {totalAmount}
      </Text>
      <Text color="gray.600" fontSize={{ base: "13pt", md: "16pt" }}>
        Would you like to donate for this event?
      </Text>
      <SlideFade in={true}>
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
          <SlideFade in={donationOther}>
            <InputGroup>
              <InputLeftAddon children="Rs. " />
              <Input
                pr="4.5rem"
                type="number"
                transition={"all 0.2s ease"}
                variant="filled"
                placeholder="Enter custom amount"
                value={donationOtherValue}
                onChange={(e) => setDonationOtherValue(e.target.value)}
                borderRadius="10px"
                _focus={{
                  bg: "pink.100",
                  color: "pink.600",
                }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => {
                    let d = parseInt(donationOtherValue);
                    if (Number.isNaN(d)) {
                      toast({
                        title: "Please enter a valid amount",
                        position: "top-right",
                        duration: 3000,
                        status: "info",
                        isClosable: true,
                      });
                      return;
                    }
                    setDonation(d);
                  }}
                >
                  Enter
                </Button>
              </InputRightElement>
            </InputGroup>
          </SlideFade>
        </Flex>
      </SlideFade>
      <Text transition={"all 0.2s ease"} color="gray.600" fontSize={"16pt"}>
        Enter Transaction ID
      </Text>
      <Input
        mb="2"
        variant={"filled"}
        name="transactionId"
        placeholder="Enter transaction Id"
        borderRadius="10px"
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
        onClick={handleCheckout}
        isFullWidth
      >
        Submit
      </Button>
    </Flex>
  );
}
