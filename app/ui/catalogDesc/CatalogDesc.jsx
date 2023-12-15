import { Box } from '@chakra-ui/react';
import React from 'react';

const CatalogDesc = ({ dictionary }) => {
  return (
    <Box
      fontSize={'small'}
      color={'#d7d5d5d1'}
      mb={{ base: '0', lg: '8' }}
      as="p"
      visibility={{ base: 'hidden', lg: 'visible' }}
      h={{ base: '0', lg: 'auto' }}
    >
      {dictionary.catalog.desc}
    </Box>
  );
};

export default CatalogDesc;
