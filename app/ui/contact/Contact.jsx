import {
  Box,
  Flex,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import GoogleMap from '../googleMap/GoogleMap';
import ContactForm from '../contactForm/ContactForm';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { fetchContacts } from '../../lib/api/instance';

const Contact = async ({ lang, dictionary }) => {
  const {
    data: [{ attributes: contacts }],
  } = await fetchContacts(lang);

  return (
    <SectionWrapper bg="#282828">
      <Flex gap={30} flexDirection={{ base: 'column', lg: 'row' }}>
        <Box w="100%" maxW={{ base: '100%', lg: '300px' }}>
          <Heading textTransform="uppercase" mb="15px">
            {dictionary.formContact.sectionTitle}
          </Heading>
          <List mb="15px">
            <ListItem display="flex" gap="8px" alignItems="center">
              <MdLocationOn color="#a28445" size="20px" />
              <Text>{contacts.address}</Text>
            </ListItem>

            <ListItem display="flex" gap="8px" alignItems="center" mt="10px">
              <MdPhone color="#a28445" size="20px" />
              <Link
                href={`tel:${contacts.phone}`}
                display="flex"
                flexDir={lang === 'he' ? 'row-reverse' : 'row'}
              >
                <Box as="span">+</Box>
                {contacts.phone}
              </Link>
            </ListItem>
            <ListItem display="flex" gap="8px" alignItems="center" mt="10px">
              <MdEmail color="#a28445" size="20px" />
              <Link href={`mailto:${contacts.mail}`}>{contacts.email}</Link>
            </ListItem>
          </List>
          <ContactForm dictionary={dictionary} />
        </Box>
        <Box flex={1}>
          <GoogleMap />
        </Box>
      </Flex>
    </SectionWrapper>
  );
};

export default Contact;
