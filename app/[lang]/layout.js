import { Montserrat } from 'next/font/google';
import '@/app/ui/globals.css';
import { i18n } from 'i18n.config';

import Providers from './providers';
import { Box } from '@chakra-ui/react';
import Header from '@/app/ui/header/Header';
import Footer from '@/app/ui/footer/Footer';
import AnimatedMain from '../ui/AnimatedMain';
import { getDictionary } from '../lib/locales/dictionary';
import SocialLinks from '../ui/socialLinks/SocialLinks';
import { metaKeywords } from '../lib/data';
import { fetchContacts } from '../lib/api/instance';

const inter = Montserrat({ subsets: ['latin'] });

export const generateMetadata = async ({ params: { lang } }) => {
  return {
    keywords: metaKeywords,
    title: {
      default: lang === 'en' ? 'Mutag Haetz' : 'מותג העץ',
      template: `%s - ${lang === 'en' ? 'Mutag Haetz' : 'מותג העץ'}`,
    },
    description:
      lang === 'en'
        ? 'Wood bringing nature to your home – quality and admiration in every board and beam!'
        : 'עץ שמביא את הטבע לביתך – איכות ואדמירציה בכל לוח וקורה',
    twitter: {
      card: 'summary_large_image',
    },
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
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({ children, params: { lang } }) {
  const dictionary = await getDictionary(lang);
  const contacts = await fetchContacts(lang);

  return (
    <html lang={lang} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <Box
        as="body"
        bg={'#181617'}
        color={'white'}
        className={inter.className}
        fontSize={18}
      >
        <Providers>
          <Header lang={lang} dictionary={dictionary} contacts={contacts} />
          <AnimatedMain>{children}</AnimatedMain>
          <SocialLinks lang={lang} contacts={contacts} />
          <Footer lang={lang} dictionary={dictionary} contacts={contacts} />
        </Providers>
      </Box>
    </html>
  );
}
