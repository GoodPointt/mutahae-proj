import About from '@/app/ui/about/About';
import CatalogSlider from '@/app/ui/catalogSlider/CatalogSlider';
import Contact from '@/app/ui/contact/Contact';
import Hero from '@/app/ui/hero/Hero';

import { Box } from '@chakra-ui/react';

import { getDictionary } from '@/app/lib/locales/dictionary';
import { fetchContacts, fetchProducts } from '../lib/api/instance';

const Homepage = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	// eslint-disable-next-line no-undef
	const [products, contacts] = await Promise.all([
		fetchProducts(lang),
		fetchContacts(lang),
	]);

	return (
		<Box>
			<Hero dictionary={dictionary} lang={lang} />
			<CatalogSlider
				products={products}
				lang={lang}
				dictionary={dictionary}
				heading={dictionary.header.navItems[1].title}
			/>
			<About dictionary={dictionary} contacts={contacts} lang={lang} />
			<Contact lang={lang} dictionary={dictionary} contacts={contacts} />
		</Box>
	);
};

export default Homepage;
