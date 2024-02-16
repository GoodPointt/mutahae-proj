import { FavoritesContent } from '../../../ui/profile/favoritesContent/FavoritesContent';

import { getDictionary } from '../../../lib/locales/dictionary';

const Favorites = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	return <FavoritesContent dictionary={dictionary} lang={lang} />;
};

export default Favorites;
