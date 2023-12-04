'use client';

import { Box, FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import SubmitButton from '../submitButton/SubmitButton';
import { useFormState } from 'react-dom';
import { submitData } from '../../lib/actions';
import sendEmail from '../../lib/utils/sendEmail';
import useLang from '../../lib/hooks/useLang';
import ReactInputMask from 'react-input-mask';

const ContactForm = ({ dictionary }) => {
  const [state, dispatch] = useFormState(submitData, undefined);
  const lang = useLang();

  const nameError =
    state?.errors?.name && state?.errors?.name.length > 0
      ? state.errors.name[0]
      : null;

  const emailError =
    state?.errors?.email && state?.errors?.email.length > 0
      ? state.errors.email[0]
      : null;

  const phoneError =
    state?.errors?.phone && state?.errors?.phone.length > 0
      ? state.errors.phone[0]
      : null;

  useEffect(() => {
    (() => {
      if (state?.message === 'succsess') {
        sendEmail(state);
      }
    })();
  }, [state]);

  const { name, email, phone } = dictionary.formContact.errors;

  return (
    <Box as="form" action={dispatch} autoComplete="off">
      <FormControl isInvalid={nameError} pb="25px">
        <Input
          name="name"
          type="text"
          bgColor="#3b3d46"
          placeholder={dictionary.formContact.nameLabel}
          style={
            lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
          }
          focusBorderColor="#a28445"
          border={'1px solid transparent'}
        />
        <FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
          {nameError === 'required' ? name.required : name.invalid}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={phoneError} pb="25px">
        <Input
          name="phone"
          as={ReactInputMask}
          type="tel"
          focusBorderColor="#a28445"
          border={'1px solid transparent'}
          bgColor="#3b3d46"
          placeholder={dictionary.formContact.phoneLabel}
          mask={'+\\972-**-***-****'}
          errorBorderColor="crimson"
          textAlign={lang === 'he' ? 'right' : 'left'}
        />
        <FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
          {phoneError === 'required' ? phone.required : phone.invalid}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={emailError} pb="25px">
        <Input
          name="email"
          type="email"
          bgColor="#3b3d46"
          placeholder={dictionary.formContact.mailLabel}
          style={
            lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
          }
          focusBorderColor="#a28445"
          border={'1px solid transparent'}
        />
        <FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
          {emailError === 'required' ? email.required : email.invalid}
        </FormErrorMessage>
      </FormControl>
      <SubmitButton>{dictionary.buttons.send}</SubmitButton>
    </Box>
  );
};

export default ContactForm;
