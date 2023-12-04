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
  title: 'MUTAG Haetz',
  description: 'MUTAG Haetz',
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }));
}

export default async function RootLayout({ children, params: { lang } }) {
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang} dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <link
        rel="icon"
        href="/icon?<generated>"
        type="image/<generated>"
        sizes="<generated>"
      />

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
