'use client';

import { Box, Container, Heading } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

const SectionWrapper = ({
  children,
  bg = 'transparent',
  isHeading = false,
  as = 'section',
}) => {
  const pathname = usePathname();
  return (
    <Box
      as={as}
      bg={bg}
      py={{ base: '30px', lg: '50px', xl: '70px' }}
      pt={'75px'}
    >
      <Container maxW={{ base: '744px', lg: '1000px', xl: '1176px' }} px="12px">
        {isHeading && (
          <Heading
            textTransform={'capitalize'}
            fontSize={'3xl'}
            fontWeight={900}
          >
            {pathname.split('/').pop()}
          </Heading>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default SectionWrapper;
