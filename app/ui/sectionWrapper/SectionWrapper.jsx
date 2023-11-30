import { Box, Container } from '@chakra-ui/react';

const SectionWrapper = ({ children, bg = 'transparent', as = 'section' }) => {
  return (
    <Box
      as={as}
      bg={bg}
      py={{ base: '30px', lg: '50px', xl: '70px' }}
      pt={'75px'}
    >
      <Container maxW={{ base: '744px', lg: '1000px', xl: '1176px' }} px="12px">
        {children}
      </Container>
    </Box>
  );
};

export default SectionWrapper;
