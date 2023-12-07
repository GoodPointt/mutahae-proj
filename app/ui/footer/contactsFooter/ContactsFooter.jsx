import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';

const ContactsFooter = ({ contacts, lang, dictionary }) => {
  const iconData = [
    {
      icon: <FaLocationDot size="24" />,
      text: contacts.address,
      href: contacts.addressUrl,
    },
    {
      icon: <FaPhone size="24" />,
      text: `+${contacts.phone}`,
      href: `tel:+${contacts.phone}`,
    },
    {
      icon: <FaEnvelope size="24" />,
      text: contacts.email,
      href: `mailto:${contacts.email}`,
    },
  ];

  const renderIconLink = ({ icon, text, href }) => (
    <Box as="li" key={href}>
      <Link
        key={text}
        href={href || '/'}
        target={!href.includes('tel') ? '_blank' : null}
        rel="noopener noreferrer nofollow"
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
            dir={text === contacts.address && lang === 'he' ? 'rtl' : 'ltr'}
          >
            {text || ''}
          </Text>
        </Box>
      </Link>
    </Box>
  );

  return (
    <Flex
      justifyContent="space-between"
      alignItems="flex-start"
      flexDirection="column"
      gap="20px"
    >
      <Text>{dictionary.footer.contacts}</Text>
      <Box
        as="ul"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        py={{ base: '12px' }}
        gap={{ base: '18px', lg: '14px', xl: '16px' }}
      >
        {iconData.map(renderIconLink)}
      </Box>
    </Flex>
  );
};

export default ContactsFooter;
