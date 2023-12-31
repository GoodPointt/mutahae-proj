import { fetchContacts, fetchMembers } from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';
import About from '@/app/ui/about/About';
import Contact from '@/app/ui/contact/Contact';
import Features from '@/app/ui/features/Features';
import Team from '@/app/ui/team/Team';
import { Suspense } from 'react';

export const metadata = {
  title: 'About',
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      he: '/he',
    },
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
  openGraph: {
    images: '/opengraph-image.png',
  },
};

const AboutPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);
  const contacts = await fetchContacts(lang);

  const members = await fetchMembers(lang);

  return (
    <>
      <About dictionary={dictionary} contacts={contacts} />
      <Features dictionary={dictionary.aboutUs.features} />
      <Suspense>
        <Team dictionary={dictionary.aboutUs.team} members={members} />
      </Suspense>
      <Contact dictionary={dictionary} lang={lang} />
    </>
  );
};

export default AboutPage;
