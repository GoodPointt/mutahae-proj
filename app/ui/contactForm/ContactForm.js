"use client";

import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { useEffect } from "react";
import SubmitButton from "../submitButton/SubmitButton";
import { useFormState } from "react-dom";
import { submitData } from "../../lib/actions";
import sendEmail from "../../lib/utils/sendEmail";

const ContactForm = () => {
  const [state, dispatch] = useFormState(submitData, undefined);
  console.log(state);

  useEffect(() => {
    (() => {
      if (state?.message === "succsess") {
        sendEmail(state);
      }
    })();
  }, [state]);

  return (
    <Box as="form" action={dispatch} autoComplete="off">
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input name="name" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Phone</FormLabel>
        <Input name="phone" type="tel" />
      </FormControl>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input name="email" type="email" />
      </FormControl>
      <SubmitButton>Submit</SubmitButton>
    </Box>
  );
};

export default ContactForm;
