import { Box } from '@chakra-ui/react';
import Hero from '@/app/ui/hero/Hero';
import CatalogSlider from '@/app/ui/catalogSlider/CatalogSlider';

import Contact from '@/app/ui/contact/Contact';
import About from '@/app/ui/about/About';
import { getDictionary } from '@/app/lib/locales/dictionary';
import { fetchProducts } from '../lib/api/instance';

const Homepage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const { data } = await fetchProducts(lang);

  return (
    <Box>
      <Hero />
      <CatalogSlider
        products={data}
        lang={lang}
        heading={dictionary.header.navItems[0].title}
      />
      <About dictionary={dictionary} />
      <Contact />
    </Box>
  );
};

export default Homepage;
