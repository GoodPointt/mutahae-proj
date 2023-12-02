import { Box, Flex, Text } from "@chakra-ui/react";
import SectionWrapper from "../sectionWrapper/SectionWrapper";
import GoogleMap from "../googleMap/GoogleMap";
import ContactForm from "../contactForm/ContactForm";

const Contact = () => {
  return (
    <Box>
      <GoogleMap />
      <ContactForm />
    </Box>
  );
};

export default Contact;
