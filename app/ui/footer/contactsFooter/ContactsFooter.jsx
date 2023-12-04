import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';

const ContactsFooter = ({ contacts: { address, phone, email }, lang }) => {
  const iconLink = (icon, text, href) => (
    <Link
      href={href}
      display="flex"
      alignItems="center"
      color="#a28445"
      transition={'all 0.3s'}
      _hover={{ color: '#81672e' }}
    >
      {icon}
      <Box as="div" mx={2}>
        <Text
          fontSize={{ base: '14px', lg: '16px', xl: '18px' }}
          dir={text === address && lang === 'he' ? 'rtl' : 'ltr'}
        >
          {text}
        </Text>
      </Box>
    </Link>
  );

  return (
    <Flex
      justifyContent="space-between"
      alignItems={'flex-start'}
      flexDirection={'column'}
      gap={'20px'}
    >
      <Text>Contacts and address</Text>
      <Box
        as="div"
        display="flex"
        flexDirection={'column'}
        alignItems={'flex-start'}
        py={{ base: '12px' }}
        gap={{ base: '18px', lg: '14px', xl: '16px' }}
      >
        {iconLink(<FaLocationDot size="24" />, address, address)}
        {iconLink(<FaPhone size="24" />, `+${phone}`, `tel:${phone}`)}
        {iconLink(<FaEnvelope size="24" />, email, `mailto:${email}`)}
      </Box>
    </Flex>
  );
};

export default ContactsFooter;
