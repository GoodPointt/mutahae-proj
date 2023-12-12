import { fetchContacts, fetchMembers } from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';
import About from '@/app/ui/about/About';
import Contact from '@/app/ui/contact/Contact';
import Features from '@/app/ui/features/Features';
import Team from '@/app/ui/team/Team';
import { Suspense } from 'react';

export const metadata = {
  title: 'About',
};

const AboutPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  // const contacts = await fetchContacts(lang);
  // const members = await fetchMembers(lang);

  //eslint-disable-next-line no-undef
  const [contacts, members] = await Promise.all([
    fetchContacts(lang),
    fetchMembers(lang),
  ]);

  return (
    <>
      <About dictionary={dictionary} contacts={contacts} />
      <Features dictionary={dictionary.aboutUs.features} />
      <Suspense>
        <Team dictionary={dictionary.aboutUs.team} members={members} />
      </Suspense>
      <Contact dictionary={dictionary} lang={lang} contacts={contacts} />
    </>
  );
};

export default AboutPage;
