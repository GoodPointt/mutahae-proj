'use client';

import {
  Box,
  Heading,
  Text,
  IconButton,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  FormHelperText,
  Link,
} from '@chakra-ui/react';
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from 'react-icons/md';

import { BsWhatsapp, BsFacebook, BsInstagram } from 'react-icons/bs';

import { BsPerson } from 'react-icons/bs';
import SubmitButton from '../submitButton/SubmitButton';
import { useFormState } from 'react-dom';
import { submitData } from '../../lib/actions';
import sendEmail from '../../lib/utils/sendEmail';
import ReactInputMask from 'react-input-mask';
import useLang from '@/app/lib/hooks/useLang';
import { useEffect, useState } from 'react';

const ModalContact = ({ dictionary, contacts, onClose }) => {
  const [state, dispatch] = useFormState(submitData, undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    (async () => {
      if (state?.message === 'succsess') {
        try {
          setIsSubmitting(true);
          const res = await sendEmail(state);
          if (res.status === 200) {
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
  const lang = useLang();

  return (
    <Wrap
      flexDirection={'row-reverse'}
      flexWrap={'wrap'}
      justify={'space-between'}
      fontSize={{ base: 'sm', lg: 'md' }}
      align={'center'}
    >
      <WrapItem>
        <Box>
          <Heading as={'h4'}>{dictionary.formContact.title}</Heading>
          <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
            {dictionary.formContact.text}
          </Text>
          <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
            <VStack pl={0} spacing={0} alignItems="flex-start">
              <Link
                display={'flex'}
                gap={2}
                borderRadius={'5px'}
                p={2}
                href={`tel:${contacts.phone}`}
                size="md"
                minH="48px"
                max-width="200px"
                color="#DCE2FF"
                transition="all 300ms ease"
                _hover={{
                  color: '#a68640',
                  transform: 'translateX(10px)',
                }}
              >
                <MdPhone color="#a28445" size="20px" />
                <Text
                  display="flex"
                  flexDir={lang === 'he' ? 'row-reverse' : 'row'}
                >
                  <Box as="span">+</Box>
                  <Box as="span">{contacts.phone}</Box>
                </Text>
              </Link>

              <Link
                display={'flex'}
                gap={2}
                borderRadius={'5px'}
                p={2}
                href={`mailto:${contacts.mail}`}
                size="md"
                minH="48px"
                width="fit-content"
                color="#DCE2FF"
                transition="all 300ms ease"
                _hover={{
                  color: '#a68640',
                  transform: 'translateX(10px)',
                }}
              >
                <MdEmail color="#a28445" size="20px" />
                <Text>{contacts.email}</Text>
              </Link>

              <Link
                isExternal
                href={contacts.addressUrl}
                rel={'noopener noreferrer nofollow'}
                display={'flex'}
                gap={2}
                borderRadius={'5px'}
                p={2}
                size="md"
                minH="48px"
                width="200px"
                color="#DCE2FF"
                transition="all 300ms ease"
                _hover={{
                  color: '#a68640',
                  transform: 'translateX(5px)',
                }}
                style={{ whiteSpace: 'break-spaces' }}
              >
                <MdLocationOn color="#a28445" size="40px" />
                <Text>{contacts.address}</Text>
              </Link>
            </VStack>
          </Box>
          <HStack spacing={1} px={5} alignItems="flex-start">
            <IconButton
              isExternal
              as={'a'}
              rel={'noopener noreferrer nofollow'}
              aria-label="facebook"
              icon={<BsFacebook size="28px" />}
              href={contacts.fb}
              target="_blank"
              color={'#a28445'}
              variant="ghost"
              size="lg"
              isRound={true}
              _hover={{ bg: '#333331', transform: 'scale(1.1)' }}
              transition="all 300ms ease"
            />
            <IconButton
              isExternal
              as={'a'}
              rel={'noopener noreferrer nofollow'}
              aria-label="instagram"
              target="_blank"
              icon={<BsInstagram size="28px" />}
              href={contacts.insta}
              color={'#a28445'}
              variant="ghost"
              size="lg"
              isRound={true}
              _hover={{ bg: '#333331', transform: 'scale(1.1)' }}
              transition="all 300ms ease"
            />
            <IconButton
              isExternal
              as={'a'}
              rel={'noopener noreferrer nofollow'}
              aria-label="whatsapp"
              icon={<BsWhatsapp size="28px" />}
              href={contacts.watsapp}
              target="_blank"
              color={'#a28445'}
              variant="ghost"
              size="lg"
              isRound={true}
              _hover={{ bg: '#333331', transform: 'scale(1.1)' }}
              transition="all 300ms ease"
            />
          </HStack>
        </Box>
      </WrapItem>
      <WrapItem w={{ base: '100%', md: '380px' }}>
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
      </WrapItem>
    </Wrap>
  );
};

export default ModalContact;
