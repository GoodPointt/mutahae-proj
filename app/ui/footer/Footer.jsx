import { fetchListCategoriesAndSubCategories } from '@/app/lib/api/instance';

import FooterWrapper from './footerWrapper/FooterWrapper';

const Footer = async ({ lang, dictionary, contacts }) => {
	const productsList = await fetchListCategoriesAndSubCategories(lang);

	return (
		<FooterWrapper
			dictionary={dictionary}
			lang={lang}
			contacts={contacts}
			products={productsList}
		/>
	);
};

export default Footer;
