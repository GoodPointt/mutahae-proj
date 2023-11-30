import { Box, Button, Heading, List, ListItem, Text } from "@chakra-ui/react";
import SectionWrapper from "../sectionWrapper/SectionWrapper";
import { getDictionary } from "@/app/lib/locales/dictionary";
import getLang from "@/app/lib/utils/getLang";

const About = async () => {
  const lang = getLang();
  const {
    aboutUs: { main },
  } = await getDictionary(lang);
  return (
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
          {main.map((el) => (
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
        >
          Contact Us
        </Button>
      </Box>
    </SectionWrapper>
  );
};

export default About;
