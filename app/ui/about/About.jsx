"use client";

import {
  Box,
  Button,
  Heading,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import SectionWrapper from "../sectionWrapper/SectionWrapper";
import ModalWindow from "../modalWindow/ModalWindow";
import FormContact from "../formContact/FormContact";

const About = ({ dictionary }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <SectionWrapper bg="url('/about-background.jpg')">
        <Heading as={"h2"} textTransform={"uppercase"} mb={"44px"}>
          <Text as={"span"} color="#a28445" mr={"8px"}>
            Mutag
          </Text>
          Company
        </Heading>
        <Box
          position={"relative"}
          py={"16px"}
          px={"24px"}
          _rtl={{
            _after: {
              right: 0,
            },
          }}
          _after={{
            display: "block",
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            h: "100%",
            w: "1px",
            bgColor: "#a28445",
          }}
          ml={"24px"}
          w={"55%"}
        >
          <List display={"flex"} flexDirection={"column"} gap={"24px"}>
            {dictionary.map((el) => (
              <ListItem key={el.text}>
                <Text>{el.text}</Text>
              </ListItem>
            ))}
          </List>
          <Button
            bgColor={"#a28445"}
            color={"#fff"}
            _hover={{ bgColor: "#81672e" }}
            mt={"24px"}
            onClick={onOpen}
          >
            Contact Us
          </Button>
        </Box>
      </SectionWrapper>
      <ModalWindow onClose={onClose} isOpen={isOpen}>
        <FormContact />
      </ModalWindow>
    </>
  );
};

export default About;
