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

  const { addressUrl, address, phone, email } = contacts;

  return (
    <SectionWrapper bg="#282828">
      <Flex gap={30} flexDirection={{ base: 'column', lg: 'row' }}>
        <Box w="100%" maxW={{ base: '100%', lg: '300px' }}>
          <Heading textTransform="uppercase" mb="15px">
            {dictionary.formContact.sectionTitle}
          </Heading>
          <List mb="15px">
            {address && (
              <ListItem
                display="flex"
                gap="8px"
                alignItems="center"
                _hover={{
                  cursor: 'pointer',
                  color: '#b1b0b0',
                }}
                transition={'all 0.3s'}
              >
                <MdLocationOn color="#a28445" size="20px" />
                {addressUrl && address && (
                  <Link
                    _hover={{ textDecoration: 'none' }}
                    isExternal
                    href={addressUrl}
                    rel={'noopener noreferrer nofollow'}
                  >
                    <Text>{address}</Text>
                  </Link>
                )}
                {!addressUrl && address && <Text>{address}</Text>}
              </ListItem>
            )}
            <ListItem
              display="flex"
              gap="8px"
              alignItems="center"
              mt="10px"
              _hover={{
                cursor: 'pointer',
                color: '#b1b0b0',
              }}
              transition={'all 0.3s'}
            >
              <MdPhone color="#a28445" size="20px" />
              {phone && (
                <Link
                  _hover={{ textDecoration: 'none' }}
                  href={`tel:+${phone}`}
                  display="flex"
                  flexDir={lang === 'he' ? 'row-reverse' : 'row'}
                >
                  <Box as="span">+</Box>
                  {phone}
                </Link>
              )}
            </ListItem>
            <ListItem
              display="flex"
              gap="8px"
              alignItems="center"
              mt="10px"
              _hover={{
                cursor: 'pointer',
                color: '#b1b0b0',
              }}
              transition={'all 0.3s'}
            >
              <MdEmail color="#a28445" size="20px" />
              {email && (
                <Link
                  _hover={{ textDecoration: 'none' }}
                  href={`mailto:${email}`}
                >
                  {email}
                </Link>
              )}
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
