import { fetchProducts } from '@/app/lib/api/instance';
import FooterWrapper from './footerWrapper/FooterWrapper';

const Footer = async ({ lang, dictionary, contacts }) => {
  const products = await fetchProducts(lang);

  return (
    <FooterWrapper
      dictionary={dictionary}
      lang={lang}
      contacts={contacts}
      products={products}
    />
  );
};

export default Footer;
