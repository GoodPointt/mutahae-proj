import { Suspense } from 'react';

import About from '@/app/ui/about/About';
import Contact from '@/app/ui/contact/Contact';
import Features from '@/app/ui/features/Features';
import Team from '@/app/ui/team/Team';

import { fetchContacts, fetchMembers } from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';

export const metadata = {
	title: 'About',
	alternates: {
		canonical: '/about',
		languages: {
			en: '/en/about',
			he: '/he/about',
		},
	},
};

const AboutPage = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	//eslint-disable-next-line no-undef
	const [contacts, members] = await Promise.all([
		fetchContacts(lang),
		fetchMembers(lang),
	]);

	return (
		<>
			<About dictionary={dictionary} contacts={contacts} lang={lang} />
			<Features dictionary={dictionary.aboutUs.features} lang={lang} />
			<Suspense>
				<Team dictionary={dictionary.aboutUs.team} members={members} />
			</Suspense>
			<Contact dictionary={dictionary} lang={lang} contacts={contacts} />
		</>
	);
};

export default AboutPage;
