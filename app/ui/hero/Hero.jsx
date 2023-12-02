import { Box } from '@chakra-ui/react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';

const Hero = async ({ dictionary }) => {
  return (
    <Box
      bg={'url("/hero-bg.jpg")'}
      bgRepeat={'no-repeat'}
      bgPos={'center'}
      bgSize={'cover'}
      width={'100%'}
      height={{ base: '400px', lg: '600px' }}
    >
      <SectionWrapper heading={dictionary.hero.title}></SectionWrapper>
    </Box>
  );
};

export default Hero;
