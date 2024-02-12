import { FavoritesContent } from '../../../ui/profile/favoritesContent/FavoritesContent';

import { fetchFavorites } from '../../../lib/api/profileInstance';
import { getDictionary } from '../../../lib/locales/dictionary';

const Favorites = async ({ params: { lang } }) => {
	const favorites = await fetchFavorites();
	const dictionary = await getDictionary(lang);

	return (
		<FavoritesContent
			favorites={favorites[0].goods}
			dictionary={dictionary}
			lang={lang}
		/>
	);
};

export default Favorites;
