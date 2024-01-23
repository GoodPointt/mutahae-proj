import HeaderWrapper from './headerWrapper/HeaderWrapper';

const Header = async ({ lang, dictionary, contacts }) => {
  return (
    <HeaderWrapper dictionary={dictionary} lang={lang} contacts={contacts} />
  );
};

export default Header;
