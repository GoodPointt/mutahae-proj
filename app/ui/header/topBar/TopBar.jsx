import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { FaLocationDot, FaPhone, FaEnvelope } from 'react-icons/fa6';
import LocaleSwitcher from '../localeSwitcher/LocaleSwitcher';

const TopBar = ({ flexDir = 'row', gap = '0', contacts, lang }) => {
  const iconData = [
    {
      icon: <FaLocationDot size="22" />,
      text: contacts.address,
      href: contacts.addressUrl,
    },
    {
      icon: <FaPhone size="22" />,
      text: `+${contacts.phone}`,
      href: `tel:+${contacts.phone}`,
    },
    {
      icon: <FaEnvelope size="22" />,
      text: contacts.email,
      href: `mailto:${contacts.email}`,
    },
  ];

  const renderIconLink = ({ icon, text, href }) => (
    <Box as="li" key={href}>
      <Link
        key={text}
        href={href || '/'}
        rel="noopener noreferrer nofollow"
        target={!href.includes('tel') ? '_blank' : null}
        display="flex"
        alignItems="center"
        color="#a28445"
        transition={'all 0.3s'}
        _hover={{ color: '#81672e' }}
      >
        {icon}
        <Box as="div" mx={2}>
          <Text
            fontSize={{ base: '12px', lg: '14px', xl: '15px' }}
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
      gap={gap}
      alignItems="center"
      flexDirection={flexDir}
    >
      <Box
        as="ul"
        display="flex"
        flexDirection={{ base: 'column', lg: 'row', xl: 'row' }}
        alignItems="flex-start"
        py={{ base: '12px' }}
        gap={{ base: '18px', lg: '14px', xl: '16px' }}
      >
        {iconData.map(renderIconLink)}
      </Box>

      <LocaleSwitcher />
    </Flex>
  );
};

export default TopBar;
