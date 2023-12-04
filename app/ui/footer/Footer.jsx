import { fetchContacts } from '@/app/lib/api/instance';
import FooterWrapper from './footerWrapper/FooterWrapper';

const Footer = async ({ lang, dictionary }) => {
  const {
    data: [{ attributes }],
  } = await fetchContacts(lang);

  return (
    <FooterWrapper dictionary={dictionary} lang={lang} contacts={attributes} />
  );
};

export default Footer;
