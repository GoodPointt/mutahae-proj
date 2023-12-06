'use client';

import {
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import { MdPhone, MdOutlineEmail } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import sendEmail from '@/app/lib/utils/sendEmail';
import { submitData } from '@/app/lib/actions';
import SubmitButton from '@/app/ui/submitButton/SubmitButton';
import ReactInputMask from 'react-input-mask';

const ModalForm = ({ onClose, dictionary, lang }) => {
  const [state, dispatch] = useFormState(submitData, undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      if (state?.message === 'succsess') {
        try {
          setIsSubmitting(true);
          const res = await sendEmail(state);
          if (res.status === 200) {
            toast({
              status: 'success',
              title: dictionary.formContact.toasts.form.success,
            });
            onClose();
          }
        } catch (error) {
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const toast = useToast();

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
  return (
    <Box bgColor={'#cfd0d5'} borderRadius="lg">
      <Box as="form" action={dispatch} p={4} color="#0B0E3F">
        <VStack spacing={5}>
          <FormControl id="name">
            <FormLabel>{dictionary.formContact.nameLabel}</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              {lang === 'he' ? (
                <InputRightElement pointerEvents="none">
                  <BsPerson color="gray.800" />
                </InputRightElement>
              ) : (
                <InputLeftElement pointerEvents="none">
                  <BsPerson color="gray.800" />
                </InputLeftElement>
              )}
              <Input
                focusBorderColor="#a28445"
                style={
                  lang === 'he'
                    ? { direction: 'ltr', textAlign: 'right' }
                    : null
                }
                type="text"
                size="md"
                bgColor={'white'}
                name="name"
                px={10}
                isInvalid={nameError}
                errorBorderColor="crimson"
              />

              {nameError && (
                <FormHelperText
                  fontSize={'13px'}
                  display={'block'}
                  color={'crimson'}
                  pos={'absolute'}
                  bottom={'-20px'}
                >
                  {nameError === 'required'
                    ? dictionary.formContact.errors.name.required
                    : dictionary.formContact.errors.name.invalid}
                </FormHelperText>
              )}
            </InputGroup>
          </FormControl>
          <FormControl id="name">
            <FormLabel>{dictionary.formContact.mailLabel}</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              {lang === 'he' ? (
                <InputRightElement pointerEvents="none">
                  <MdOutlineEmail color="gray.800" />
                </InputRightElement>
              ) : (
                <InputLeftElement pointerEvents="none">
                  <MdOutlineEmail color="gray.800" />
                </InputLeftElement>
              )}
              <Input
                focusBorderColor="#a28445"
                type="email"
                size="md"
                bgColor={'white'}
                name="email"
                px={10}
                isInvalid={emailError}
                errorBorderColor="crimson"
                style={
                  lang === 'he'
                    ? { direction: 'ltr', textAlign: 'right' }
                    : null
                }
              />
              {emailError && (
                <FormHelperText
                  fontSize={'13px'}
                  display={'block'}
                  color={'crimson'}
                  pos={'absolute'}
                  bottom={'-20px'}
                >
                  {emailError === 'required'
                    ? dictionary.formContact.errors.email.required
                    : dictionary.formContact.errors.email.invalid}
                </FormHelperText>
              )}
            </InputGroup>
          </FormControl>
          <FormControl id="name">
            <FormLabel>{dictionary.formContact.phoneLabel}</FormLabel>
            <InputGroup borderColor="#E0E1E7">
              {lang === 'he' ? (
                <InputRightElement pointerEvents="none">
                  <MdPhone color="gray.800" />
                </InputRightElement>
              ) : (
                <InputLeftElement pointerEvents="none">
                  <MdPhone color="gray.800" />
                </InputLeftElement>
              )}
              <Input
                focusBorderColor="#a28445"
                as={ReactInputMask}
                type="tel"
                name="phone"
                border={'1px solid transparent'}
                bgColor={'white'}
                size="md"
                mask={'+\\972-**-***-****'}
                px={10}
                isInvalid={phoneError}
                errorBorderColor="crimson"
                style={
                  lang === 'he'
                    ? { direction: 'ltr', textAlign: 'right' }
                    : null
                }
              />
              {phoneError && (
                <FormHelperText
                  fontSize={'13px'}
                  display={'block'}
                  color={'crimson'}
                  pos={'absolute'}
                  bottom={'-20px'}
                >
                  {phoneError === 'required'
                    ? dictionary.formContact.errors.phone.required
                    : dictionary.formContact.errors.phone.invalid}
                </FormHelperText>
              )}
            </InputGroup>
          </FormControl>
          <SubmitButton isSubmitting={isSubmitting}>
            {dictionary.buttons.send}
          </SubmitButton>
        </VStack>
      </Box>
    </Box>
  );
};

export default ModalForm;
