import { Box } from '@chakra-ui/react';
import Hero from '@/app/ui/hero/Hero';
import CatalogSlider from '@/app/ui/catalogSlider/CatalogSlider';

import Contact from '@/app/ui/contact/Contact';
import About from '@/app/ui/about/About';
import { getDictionary } from '@/app/lib/locales/dictionary';
import { fetchContacts, fetchProducts } from '../lib/api/instance';
import { i18n } from '@/i18n.config';

export const generateStaticParams = async () => {
  return i18n.locales;
};

const Homepage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const { data } = await fetchProducts(lang);
  const {
    data: [{ attributes: contacts }],
  } = await fetchContacts(lang);

  return (
    <Box>
      <Hero dictionary={dictionary} lang={lang} />
      <CatalogSlider
        products={data}
        lang={lang}
        heading={dictionary.header.navItems[1].title}
      />
      <About dictionary={dictionary} contacts={contacts} />
      <Contact lang={lang} dictionary={dictionary} />
    </Box>
  );
};

export default Homepage;
