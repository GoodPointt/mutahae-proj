import { fetchContacts } from '@/app/lib/api/instance';
import HeaderWrapper from './headerWrapper/HeaderWrapper';

const Header = async ({ lang, dictionary }) => {
  const {
    data: [{ attributes }],
  } = await fetchContacts(lang);

  console.log('ATT', attributes);
  // const { attributes } = data[0];
  return (
    <HeaderWrapper dictionary={dictionary} lang={lang} contacts={attributes} />
  );
};

export default Header;
