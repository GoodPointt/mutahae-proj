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

const inter = Montserrat({ subsets: ['latin'] });

export const metadata = {
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
  keywords: [
    'лестницы',
    'stairs',
    'סולמות',
    'деревянные изделия',
    'solid wood panels',
    'wooden products',
    'מוצרים מעץ',
    'щиты из цельного дерева',
    'לוחות עץ',
    'полки',
    'shelves',
    'מדפים',
    'столешницы',
    'countertops',
    'דודים',
    'деревянные полы',
    'wooden floors',
    'רצפות עץ',
    'дуб',
    'oak',
    'אלון',
  ],
  title: {
    default: 'MUTAG Haetz',
    template: '%s - MUTAG Haetz',
  },
  description:
    'Nature in Every Detail: Beauty and Warmth of Wood in Every Product!',
  twitter: {
    card: 'summary_large_image',
  },
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({ children, params: { lang } }) {
  const dictionary = await getDictionary(lang);

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
          <Header lang={lang} dictionary={dictionary} />
          <AnimatedMain>{children}</AnimatedMain>
          <SocialLinks lang={lang} />
          <Footer lang={lang} dictionary={dictionary} />
        </Providers>
      </Box>
    </html>
  );
}
