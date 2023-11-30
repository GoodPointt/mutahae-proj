import { Box, Container, Heading } from '@chakra-ui/react';

const SectionWrapper = ({
  children,
  bg = 'transparent',
  as = 'section',
  heading = '',
}) => {
  return (
    <Box
      as={as}
      bg={bg}
      py={{ base: '30px', lg: '50px', xl: '70px' }}
      pt={'75px'}
      bgRepeat={'no-repeat'}
      bgPos={'center'}
      bgSize={'cover'}
    >
      <Container maxW={{ base: '744px', lg: '1000px', xl: '1176px' }} px="12px">
        {heading && (
          <Heading
            as={'h2'}
            // color={'#bca26a'}
            mb={{ base: 6, lg: 8 }}
            fontWeight={900}
            fontSize={{ base: '2xl', lg: '4xl' }}
          >
            {heading}
          </Heading>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default SectionWrapper;
