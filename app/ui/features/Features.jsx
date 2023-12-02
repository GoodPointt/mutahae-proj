import { Box, List, ListItem, Text } from "@chakra-ui/react";
import SectionWrapper from "../sectionWrapper/SectionWrapper";

const Features = ({ dictionary }) => {
  return (
    <SectionWrapper bg="#000">
      <Box>
        <List
          display={"grid"}
          gridTemplateColumns={["1fr", "repeat(3, 1fr)"]}
          gap={16}
        >
          {dictionary.map((el) => (
            <ListItem
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              key={el.feat}
              textAlign={"center"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                border={"1px #a28445 solid"}
                borderRight={"none"}
                w={"100px"}
                h={"100px"}
                transform={"rotate(45deg)"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Text
                  transform={"rotate(-45deg)"}
                  color={"#a28445"}
                  fontWeight={600}
                  fontSize={"24px"}
                >
                  {el.feat}
                </Text>
              </Box>
              <Text mt={"44px"}>{el.title}</Text>
            </ListItem>
          ))}
        </List>
      </Box>
    </SectionWrapper>
  );
};

export default Features;
