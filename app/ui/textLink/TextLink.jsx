import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const TextLink = ({ children, href }) => {
  return (
    <Box
      as={Link}
      mx={'5px'}
      href={href}
      color={'#a28445'}
      fontSize={'20px'}
      fontWeight={'600'}
      transition={'all 0.3s'}
      _hover={{ color: '#81672e' }}
    >
      {children}
    </Box>
  );
};

export default TextLink;
