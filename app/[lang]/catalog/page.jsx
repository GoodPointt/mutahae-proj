import Contact from '@/app/ui/contact/Contact';
import ProductsGrid from '@/app/ui/productsGrid/ProductsGrid';

import {
	fetchContacts,
	fetchListCategoriesAndSubCategories,
} from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';

export const metadata = {
	title: 'Catalog',
	alternates: {
		canonical: '/catalog',
		languages: {
			en: '/en/catalog',
			he: '/he/catalog',
		},
	},
};

const CatalogPage = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);
	const data = await fetchListCategoriesAndSubCategories(lang);

	const {
		header: { navItems },
	} = dictionary;

	const contacts = await fetchContacts(lang);

	return (
		<>
			<ProductsGrid
				lang={lang}
				heading={navItems[1].title}
				data={data}
				dictionary={dictionary}
			/>
			<Contact lang={lang} dictionary={dictionary} contacts={contacts} />
		</>
	);
};

export default CatalogPage;
