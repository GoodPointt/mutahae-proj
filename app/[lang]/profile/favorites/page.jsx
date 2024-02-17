import { cookies } from 'next/headers';

import { FavoritesContent } from '../../../ui/profile/favoritesContent/FavoritesContent';

import { getDictionary } from '../../../lib/locales/dictionary';

const Favorites = async ({ params: { lang } }) => {
	//const favorites = await fetchFavorites();
	const dictionary = await getDictionary(lang);
	const userId = cookies().get('userId')?.value;

	return (
		<FavoritesContent dictionary={dictionary} lang={lang} isAuth={!!userId} />
	);
};

export default Favorites;
