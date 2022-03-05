import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";

export default function PaymentModal({ payment }) {
  return (
    <AlertDialog
      isOpen={payment.isOpen}
      onClose={payment.onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <AlertDialogOverlay />
      <AlertDialogContent
        margin="15px"
        bg="linear-gradient(143deg, #ff7bcc 50%, #ffffff 99%)"
      >
        <AlertDialogHeader color="gray.600" fontSize="2xl" fontWeight="bold">
          Account details
        </AlertDialogHeader>
        <AlertDialogBody color="white" gridGap="3">
          <Text color="gray.600" fontSize="lg">
            ACCEPTED PAYMENT METHODS:
            <Box as="span" fontWeight={"bold"}>
              NEFT
            </Box>
          </Text>
          <Text color="gray.600" fontSize="lg">
            A/c Name-
            <Box as="span" fontWeight={"bold"}>
              Fr.C.Rodrigues Institute of Technology
            </Box>
          </Text>
          <Text color="gray.600" fontSize="lg">
            BANK -
            <Box as="span" fontWeight={"bold"}>
              INDIAN OVERSEAS BANK BRANCH- VASHI (0596)
            </Box>
          </Text>
          <Text color="gray.600" fontSize="lg">
            A/C NO-{" "}
            <Box as="span" fontWeight={"bold"}>
              059601000007942
            </Box>
          </Text>
          <Text color="gray.600" fontSize="lg">
            IFSC Code -
            <Box as="span" fontWeight={"bold"}>
              IOBA0000596
            </Box>
          </Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            bg="pink.300"
            color="white"
            _hover={{ opacity: 0.7 }}
            onClick={payment.onClose}
          >
            Close
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
