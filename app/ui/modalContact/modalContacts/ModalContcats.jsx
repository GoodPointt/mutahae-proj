import {
  Box,
  Heading,
  Text,
  IconButton,
  VStack,
  HStack,
  Link,
} from '@chakra-ui/react';
import { MdPhone, MdEmail, MdLocationOn } from 'react-icons/md';
import {
  BsWhatsapp,
  BsFacebook,
  BsInstagram,
  BsTelegram,
} from 'react-icons/bs';

const ModalContacts = ({ contacts, dictionary, lang }) => {
  return (
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
            href={`tel:+${contacts.phone}`}
            size="md"
            minH="48px"
            max-width="200px"
            color="#DCE2FF"
            transition="all 300ms ease"
            _hover={{
              color: '#a68640',
              transform: 'translateX(3px)',
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
              transform: 'translateX(3px)',
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
              transform: 'translateX(3px)',
            }}
            style={{ whiteSpace: 'break-spaces' }}
          >
            <MdLocationOn color="#a28445" size="40px" />
            <Text>{contacts.address}</Text>
          </Link>
        </VStack>
      </Box>
      <HStack spacing={3} px={0} alignItems="flex-start" p={3}>
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
          _hover={{
            bg: '#333331',
            transform: 'translateY(-3px) translateX(3px)',
          }}
          transition="all 500ms ease"
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
          _hover={{
            bg: '#333331',
            transform: 'translateY(-3px) translateX(3px)',
          }}
          transition="all 500ms ease"
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
          _hover={{
            bg: '#333331',
            transform: 'translateY(-3px) translateX(3px)',
          }}
          transition="all 500ms ease"
        />
        <IconButton
          isExternal
          as={'a'}
          rel={'noopener noreferrer nofollow'}
          aria-label="whatsapp"
          icon={<BsTelegram size="28px" />}
          href={contacts.tg}
          target="_blank"
          color={'#a28445'}
          variant="ghost"
          size="lg"
          isRound={true}
          _hover={{
            bg: '#333331',
            transform: 'translateY(-3px) translateX(5px)',
          }}
          transition="all 500ms ease"
        />
      </HStack>
    </Box>
  );
};

export default ModalContacts;
