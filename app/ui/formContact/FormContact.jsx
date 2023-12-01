"use client";

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
} from "@chakra-ui/react";
import {
  MdPhone,
  MdEmail,
  MdLocationOn,
  MdFacebook,
  MdOutlineEmail,
} from "react-icons/md";
import { BsGithub, BsDiscord, BsPerson } from "react-icons/bs";
import SubmitButton from "../submitButton/SubmitButton";
import ReactInputMask from "react-input-mask";

const telMask = `+972********`;

const FormContact = () => {
  return (
    <Flex>
      <Box p={4}>
        <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
          <WrapItem>
            <Box>
              <Heading>Contact</Heading>
              <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                Fill up the form below to contact
              </Text>
              <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                <VStack pl={0} spacing={3} alignItems="flex-start">
                  <Button
                    size="md"
                    height="48px"
                    width="200px"
                    variant="ghost"
                    color="#DCE2FF"
                    _hover={{ border: "2px solid #a28445" }}
                    leftIcon={<MdPhone color="#a28445" size="20px" />}
                  >
                    +91-988888888
                  </Button>
                  <Button
                    size="md"
                    height="48px"
                    width="200px"
                    variant="ghost"
                    color="#DCE2FF"
                    _hover={{ border: "2px solid #a28445" }}
                    leftIcon={<MdEmail color="#a28445" size="20px" />}
                  >
                    hello@abc.com
                  </Button>
                  <Button
                    size="md"
                    height="48px"
                    width="200px"
                    variant="ghost"
                    color="#DCE2FF"
                    _hover={{ border: "2px solid #a28445" }}
                    leftIcon={<MdLocationOn color="#a28445" size="20px" />}
                  >
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
                  color={"#a28445"}
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: "#333331" }}
                  icon={<MdFacebook size="28px" />}
                />
                <IconButton
                  aria-label="github"
                  color={"#a28445"}
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: "#333331" }}
                  icon={<BsGithub size="28px" />}
                />
                <IconButton
                  aria-label="discord"
                  color={"#a28445"}
                  variant="ghost"
                  size="lg"
                  isRound={true}
                  _hover={{ bg: "#333331" }}
                  icon={<BsDiscord size="28px" />}
                />
              </HStack>
            </Box>
          </WrapItem>
          <WrapItem>
            <Box bg="white" borderRadius="lg">
              <Box as="form" action={""} m={8} color="#0B0E3F">
                <VStack spacing={5}>
                  <FormControl id="name">
                    <FormLabel>Your Name</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <BsPerson color="gray.800" />
                      </InputLeftElement>
                      <Input autoFocus type="text" size="md" />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="name">
                    <FormLabel>Mail</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <MdOutlineEmail color="gray.800" />
                      </InputLeftElement>
                      <Input type="text" size="md" />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="name">
                    <FormLabel>Phone</FormLabel>
                    <InputGroup borderColor="#E0E1E7">
                      <InputLeftElement pointerEvents="none">
                        <MdPhone color="gray.800" />
                      </InputLeftElement>
                      <Input
                        as={ReactInputMask}
                        type="tel"
                        name="phone"
                        border={"none"}
                        bgColor={"blackAlpha.200"}
                        size="md"
                        mask={telMask}
                      />
                    </InputGroup>
                  </FormControl>
                  <SubmitButton>Send</SubmitButton>
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
