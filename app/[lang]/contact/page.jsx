import { getDictionary } from '@/app/lib/locales/dictionary';
import Contact from '@/app/ui/contact/Contact';

const ContactPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);

  return <Contact lang={lang} dictionary={dictionary} />;
};

export default ContactPage;
