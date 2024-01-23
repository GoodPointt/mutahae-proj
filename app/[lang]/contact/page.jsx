import { fetchContacts } from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';
import Contact from '@/app/ui/contact/Contact';
import ContactsDesc from '@/app/ui/contactsDesc/ContactsDesc';

export const metadata = {
  title: 'Contact',
  alternates: {
    canonical: '/contact',
    languages: {
      en: '/en/contact',
      he: '/he/contact',
    },
  },
};

const ContactPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const contacts = await fetchContacts(lang);

  return (
    <>
      <Contact lang={lang} dictionary={dictionary} contacts={contacts} />
      <ContactsDesc dictionary={dictionary} contacts={contacts} lang={lang} />
    </>
  );
};

export default ContactPage;
