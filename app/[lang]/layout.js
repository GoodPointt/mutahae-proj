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
import { fetchHero } from '../lib/api/instance';

const inter = Montserrat({ subsets: ['latin'] });

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export const generateMetadata = async ({ params: { lang } }) => {
  const heroFields = await fetchHero(lang);

  return {
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
      'Фанера',
      'Plywood',
      'פליט',
      'МДФ',
      'MDF',
      'Medium Density Fiberboard',
      'Фанерно-деревянная плита средней плотности',
      'Фанерные двери',
      'Plywood doors',
      'דלתות מפליט',
      'Деревянные балки',
      'Wooden beams',
      'קרורות עץ',
      'Деревянные окна',
      'Wooden windows',
      'חלונות עץ',
      'Мебель из дуба',
      'Oak furniture',
      'רהיטים מאלון',
      'Деревянные рамы',
      'Wooden frames',
      'מסגרות עץ',
      'Деревянные перила',
      'Wooden railings',
      'סולמות עץ',
      'Деревянные детали',
      'Wooden details',
      'פרטי עץ',
      'Фанерные стены',
      'Plywood walls',
      'קירות מפליט',
      'Дубовые двери',
      'Oak doors',
      'דלתות אלון',
      'Дубовые полы',
      'Oak floors',
      'רצפות אלון',
      'Дубовая мебель',
      'Oak furniture',
      'רהיטים מאלון',
      'Дубовые бруски',
      'Oak beams',
      'בלוקי אלון',
      'Дубовые лестницы',
      'Oak staircases',
      'סולמות אלון',
    ],
    title: {
      default: 'MUTAG Haetz',
      template: '%s - MUTAG Haetz',
    },
    description: heroFields.title,
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
    twitter: {
      card: 'summary_large_image',
    },
  };
};

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
