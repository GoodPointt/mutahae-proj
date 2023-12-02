'use client';

import {
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
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
import ReactInputMask from 'react-input-mask';

const FormContact = ({
  dictionary,
  // contacts
}) => {
  return (
    <Flex>
      <Box p={4}>
        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
          <WrapItem>
            <Box>
              <Heading>{dictionary.formContact.title}</Heading>
              <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                {dictionary.formContact.text}
              </Text>
              <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                <VStack pl={0} spacing={3} alignItems="flex-start">
                  {/* <a href=`tel:${contacts.phone}`> */}
                  <a href="tel:+491570156">
                    <Button
                      size="md"
                      height="48px"
                      width="200px"
                      variant="ghost"
                      color="#DCE2FF"
                      _hover={{ border: '2px solid #a28445' }}
                      leftIcon={<MdPhone color="#a28445" size="20px" />}
                    >
                      +91-988888888
                      {/* {contacts.phone} */}
                    </Button>
                  </a>
                  {/* <a href=`mailto:${contacts.mail}`> */}
                  <a href="mailto:nowhere@mozilla.org">
                    <Button
                      size="md"
                      height="48px"
                      width="200px"
                      variant="ghost"
                      color="#DCE2FF"
                      _hover={{ border: '2px solid #a28445' }}
                      leftIcon={<MdEmail color="#a28445" size="20px" />}
                    >
                      {/* {contacts.mail} */}
                      hello@abc.com
                    </Button>
                  </a>
                  <Button
                    size="md"
                    height="48px"
                    width="200px"
                    variant="ghost"
                    color="#DCE2FF"
                    _hover={{ border: '2px solid #a28445' }}
                    leftIcon={<MdLocationOn color="#a28445" size="20px" />}
                  >
                    {/* {contacts.address} */}
                    Karnavati, Israel
                  </Button>
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
                  _hover={{ bg: '#333331' }}
                  icon={<MdFacebook size="28px" />}
                />
                <IconButton
                  aria-label="github"
                  color={'#a28445'}
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#333331' }}
                  icon={<BsGithub size="28px" />}
                />
                <IconButton
                  aria-label="discord"
                  color={'#a28445'}
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: '#333331' }}
                  icon={<BsDiscord size="28px" />}
                />
              </HStack>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box bgColor={'#cfd0d5'} borderRadius="lg">
              <Box as="form" action={''} m={8} color="#0B0E3F">
                <VStack spacing={5}>
                  <FormControl id="name">
                    <FormLabel>{dictionary.formContact.nameLabel}</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <BsPerson color="gray.800" />
                      </InputLeftElement>
                      <Input
                        autoFocus
                        type="text"
                        size="md"
                        bgColor={'white'}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="name">
                    <FormLabel>{dictionary.formContact.mailLabel}</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <MdOutlineEmail color="gray.800" />
                      </InputLeftElement>
                      <Input type="text" size="md" bgColor={'white'} />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="name">
                    <FormLabel>{dictionary.formContact.phoneLabel}</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <MdPhone color="gray.800" />
                      </InputLeftElement>
                      <Input
                        as={ReactInputMask}
                        type="tel"
                        name="phone"
                        border={'none'}
                        bgColor={'white'}
                        size="md"
                        mask={'+\\972-***-**-**'}
                      />
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

export default FormContact;
