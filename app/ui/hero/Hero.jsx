import { Box, Text } from '@chakra-ui/react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import Btn from '../button/Btn';
import Link from 'next/link';
import { fetchHero } from '@/app/lib/api/instance';

const Hero = async ({ dictionary, lang }) => {
  const heroFields = await fetchHero(lang);
  return (
    <SectionWrapper
      heading={heroFields.title || dictionary.hero.title}
      headingAs={'h1'}
      bg={'url("/hero-bg.jpg")'}
    >
      <Text
        fontSize={{ base: '16px', lg: '20px' }}
        maxW={'800px'}
        my={{ base: '45px', lg: '110px' }}
      >
        {heroFields.desc || dictionary.hero.desc}
      </Text>
      <Box display={'flex'} gap={'32px'}>
        <Btn as={Link} href={`/${lang}/catalog`}>
          {dictionary.hero.btnCatalog}
        </Btn>
        <Btn as={Link} href={`/${lang}/contact`}>
          {dictionary.hero.btnContactUs}
        </Btn>
      </Box>
    </SectionWrapper>
  );
};

export default Hero;
