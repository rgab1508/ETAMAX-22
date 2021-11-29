import { useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Center,
  Button,
} from "@chakra-ui/react";

const LoginForm = () => {
  var [rollNo, setRoll] = useState("");
  var [password, setPassword] = useState("");
  var [isFormValid, setFormValid] = useState(true);

  const rollNoHandler = (event) => {
    setRoll(event.target.value);
  };
  const passwordNoHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (rollNo == '' || password.trim() == "") {
      setFormValid(false);
      return;
    }
    setFormValid(true);
    console.log({ rollNo, password });
  };
  return (
    <>
      <FormControl id="rollno">
        <FormLabel>Roll Number</FormLabel>
        <Input
          placeholder="Roll no."
          type="number"
          value={rollNo}
          onChange={rollNoHandler}
        />
        {!isFormValid && <FormErrorMessage>Incorrect Roll No</FormErrorMessage>}
      </FormControl>
      <FormControl id="passowrd">
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordNoHandler}
        />
        {!isFormValid && (
          <FormErrorMessage>Incorrect Password</FormErrorMessage>
        )}
      </FormControl>
      <Button onClick={submitFormHandler} variant="solid">
        Login
      </Button>
    </>
  );
};

export default LoginForm;
