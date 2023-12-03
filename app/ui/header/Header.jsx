import { fetchContacts } from '@/app/lib/api/instance';
import HeaderWrapper from './headerWrapper/HeaderWrapper';

const Header = async ({ lang, dictionary }) => {
  const { data } = await fetchContacts(lang);
  const { attributes } = data[0];
  return (
    <HeaderWrapper
      dictionary={dictionary}
      lang={lang}
      attributes={attributes}
    />
  );
};

export default Header;
