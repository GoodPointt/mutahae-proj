import { Box } from '@chakra-ui/react';
import Hero from '@/app/ui/hero/Hero';
import CatalogSlider from '@/app/ui/catalogSlider/CatalogSlider';

import Contact from '@/app/ui/contact/Contact';
import About from '@/app/ui/about/About';
import { getDictionary } from '@/app/lib/locales/dictionary';
import { fetchContacts, fetchProducts } from '../lib/api/instance';
// import { i18n } from '@/i18n.config';

// export const generateStaticParams = async () => {
//   return i18n.locales;
// };

const Homepage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  // const products = await fetchProducts(lang);
  // const contacts = await fetchContacts(lang);

  // eslint-disable-next-line no-undef
  const [products, contacts] = await Promise.all([
    fetchProducts(lang),
    fetchContacts(lang),
  ]);

  return (
    <Box>
      <Hero dictionary={dictionary} lang={lang} />
      <CatalogSlider
        products={products}
        lang={lang}
        heading={dictionary.header.navItems[1].title}
      />
      <About dictionary={dictionary} contacts={contacts} />
      <Contact lang={lang} dictionary={dictionary} contacts={contacts} />
    </Box>
  );
};

export default Homepage;
