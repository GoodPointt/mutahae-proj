import { Montserrat } from 'next/font/google';
import Script from 'next/script';

import Footer from '@/app/ui/footer/Footer';
import Header from '@/app/ui/header/Header.jsx';
import AnimatedMain from '../ui/AnimatedMain';
import SocialLinks from '../ui/socialLinks/SocialLinks';

// import { SpeedInsights } from '@vercel/speed-insights/next';
import { Box } from '@chakra-ui/react';

import { fetchContacts } from '../lib/api/instance';
import { metaKeywords } from '../lib/data';
import { getDictionary } from '../lib/locales/dictionary';
import { i18n } from '../lib/locales/i18n.config';

import Providers from './providers';

import '@/app/ui/globals.css';

const inter = Montserrat({ subsets: ['latin'] });

export const generateMetadata = async ({ params: { lang } }) => {
	return {
		keywords: metaKeywords,
		title: {
			default:
				lang === 'en'
					? 'Mutag Haetz - Oak Board | Oak Timber | Oak Finger Joint | Oak Stairs | Oak Board BIO | Oak Vario'
					: "עץ אלון | לאמי אלון |  אלון ואריו |  בוצ'ר אלון | מדרגות אלון - מותג העץ",
			template: `%s - ${lang === 'en' ? 'Mutag Haetz' : 'מותג העץ'}`,
		},
		description:
			lang === 'en'
				? 'High-quality wood products: Oak stairs, beech, and oak BIO boards. Crafted with care, bringing the warmth and beauty of wood to Israel. Expertise and quality in every project, capturing the authentic feel of oak wood.'
				: 'מוצרי עץ באיכות גבוהה: מדרגות אלון, בוצ’ר, ולוחות ואריו. אנו יוצרים בקפידה ומביאים לישראל את חמימות ויופי העץ. איכות והתמחות בכל פרוייקט, מהתחושה האותנטית של עץ אלון.',
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
			<link
				rel="icon"
				href={`${process.env.NEXT_PUBLIC_URL}/favicon.ico`}
				type="image/x-icon"
				sizes="48x48"
			/>
			{/* <!-- Google tag (gtag.js) --> */}
			<Script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
			/>
			<Script id="google-analytics">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
        `}
			</Script>

			<Box
				as="body"
				bg="#181617"
				color="white"
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
