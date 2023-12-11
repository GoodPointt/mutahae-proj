import { getDictionary } from '@/app/lib/locales/dictionary';
import Contact from '@/app/ui/contact/Contact';

export const metadata = {
  title: 'Contact',
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

const ContactPage = async ({ params: { lang } }) => {
  const dictionary = await getDictionary(lang);

  return <Contact lang={lang} dictionary={dictionary} />;
};

export default ContactPage;
