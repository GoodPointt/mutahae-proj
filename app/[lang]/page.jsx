import About from '@/app/ui/about/About';
import CatalogSlider from '@/app/ui/catalogSlider/CatalogSlider';
import Contact from '@/app/ui/contact/Contact';
import Hero from '@/app/ui/hero/Hero';
import Benefits from '../ui/benefits/Benefits';

import { Box } from '@chakra-ui/react';

import { getDictionary } from '@/app/lib/locales/dictionary';
import { fetchContacts, fetchProducts } from '../lib/api/instance';

const Homepage = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	// eslint-disable-next-line no-undef
	const products = await fetchProducts(lang);
	const contacts = await fetchContacts(lang);

	return (
		<Box>
			<Hero dictionary={dictionary} lang={lang} />

			<CatalogSlider
				products={products}
				lang={lang}
				dictionary={dictionary}
				heading={dictionary.header.navItems[1].title}
			/>
			<Benefits dictionary={dictionary} />
			<About dictionary={dictionary} contacts={contacts} lang={lang} />
			<Contact lang={lang} dictionary={dictionary} contacts={contacts} />
		</Box>
	);
};

export default Homepage;
