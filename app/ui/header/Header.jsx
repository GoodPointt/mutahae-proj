import { fetchContacts } from '@/app/lib/api/instance';
import HeaderWrapper from './headerWrapper/HeaderWrapper';

const Header = async ({ lang, dictionary }) => {
  const contacts = await fetchContacts(lang);

  return (
    <HeaderWrapper dictionary={dictionary} lang={lang} contacts={contacts} />
  );
};

export default Header;
