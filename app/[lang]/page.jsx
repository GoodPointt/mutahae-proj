import { Box } from '@chakra-ui/react';
import Hero from '@/app/ui/hero/Hero';
import CatalogSlider from '@/app/ui/catalogSlider/CatalogSlider';

import Contact from '@/app/ui/contact/Contact';
import About from '@/app/ui/about/About';
import { getDictionary } from '@/app/lib/locales/dictionary';

const Homepage = async ({ params: { lang } }) => {
  const { page } = await getDictionary(lang);

  return (
    <Box>
      <h1>{page.home.title}</h1>
      <Hero />
      <CatalogSlider />
      <About />
      <Contact />
    </Box>
  );
};

export default Homepage;
