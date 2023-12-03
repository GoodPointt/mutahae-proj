'use client';

import {
  Flex,
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
} from '@chakra-ui/react';
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from 'react-icons/md';
import { BsGithub, BsDiscord, BsPerson } from 'react-icons/bs';
import SubmitButton from '../submitButton/SubmitButton';
import { useFormState } from 'react-dom';
import { submitData } from '../../lib/actions';
import sendEmail from '../../lib/utils/sendEmail';
import ReactInputMask from 'react-input-mask';
import useLang from '@/app/lib/hooks/useLang';
import { useEffect } from 'react';

const ModalContact = ({ dictionary, contacts }) => {
  const [state, dispatch] = useFormState(submitData, undefined);

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
  const lang = useLang();

  return (
    <Flex>
      <Box>
        <Wrap spacing={{ base: 20, sm: 3, md: 4, lg: 20 }}>
          <WrapItem>
            <Box>
              <Heading>{dictionary.formContact.title}</Heading>
              <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                {dictionary.formContact.text}
              </Text>
              <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                <VStack pl={0} spacing={3} alignItems="flex-start">
                  <Box
                    display={'flex'}
                    gap={2}
                    borderRadius={'5px'}
                    p={2}
                    as="a"
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
                    <Text>{contacts.phone}</Text>
                  </Box>

                  <Box
                    display={'flex'}
                    gap={2}
                    borderRadius={'5px'}
                    p={2}
                    as="a"
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
                  </Box>

                  <Box
                    display={'flex'}
                    gap={2}
                    borderRadius={'5px'}
                    p={2}
                    as="a"
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
                  </Box>
                </VStack>
              </Box>
              <HStack
                mt={{ lg: 10, md: 10 }}
                spacing={5}
                px={5}
                alignItems="flex-start"
              >
                <IconButton
                  aria-label="facebook"
                  color={'#a28445'}
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#333331', transform: 'scale(1.1)' }}
                  transition="all 300ms ease"
                  icon={<MdFacebook size="28px" />}
                />
                <IconButton
                  aria-label="github"
                  color={'#a28445'}
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#333331', transform: 'scale(1.1)' }}
                  transition="all 300ms ease"
                  icon={<BsGithub size="28px" />}
                />
                <IconButton
                  aria-label="discord"
                  color={'#a28445'}
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#333331', transform: 'scale(1.1)' }}
                  transition="all 300ms ease"
                  icon={<BsDiscord size="28px" />}
                />
              </HStack>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box bgColor={'#cfd0d5'} borderRadius="lg">
              <Box as="form" action={dispatch} m={8} color="#0B0E3F">
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
                        isInvalid={state?.errors?.name}
                        errorBorderColor="crimson"
                      />

                      {nameError && (
                        <FormHelperText
                          display={'block'}
                          color={'crimson'}
                          pos={'absolute'}
                          bottom={'-20px'}
                        >
                          {nameError}
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
                        isInvalid={state?.errors?.email}
                        errorBorderColor="crimson"
                        style={
                          lang === 'he'
                            ? { direction: 'ltr', textAlign: 'right' }
                            : null
                        }
                      />
                      {emailError && (
                        <FormHelperText
                          display={'block'}
                          color={'crimson'}
                          pos={'absolute'}
                          bottom={'-20px'}
                        >
                          {emailError}
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
                        isInvalid={state?.errors?.phone}
                        errorBorderColor="crimson"
                        style={
                          lang === 'he'
                            ? { direction: 'ltr', textAlign: 'right' }
                            : null
                        }
                      />
                      {phoneError && (
                        <FormHelperText
                          display={'block'}
                          color={'crimson'}
                          pos={'absolute'}
                          bottom={'-20px'}
                        >
                          Invalid phone number
                        </FormHelperText>
                      )}
                    </InputGroup>
                  </FormControl>
                  <SubmitButton>{dictionary.buttons.send}</SubmitButton>
                </VStack>
              </Box>
            </Box>
          </WrapItem>
        </Wrap>
      </Box>
    </Flex>
  );
};

export default ModalContact;
