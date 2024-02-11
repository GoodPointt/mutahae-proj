import { cookies } from 'next/headers';

import {
	fetchBagByUserId,
	fetchFavorites,
} from '@/app/lib/api/profileInstance';

import HeaderWrapper from './headerWrapper/HeaderWrapper';

const Header = async ({ lang, dictionary, contacts }) => {
	const getToken = cookies().get('jwt')?.value ?? '';

	const userId = cookies().get('userId')?.value;

	let bagData = [];
	let favorites = [];

	if (userId) {
		bagData = await fetchBagByUserId(userId);
		favorites = await fetchFavorites(userId);
	}

	return (
		<HeaderWrapper
			bagData={bagData[0]}
			favorites={favorites}
			dictionary={dictionary}
			isAuth={!!getToken}
			lang={lang}
			contacts={contacts}
		/>
	);
};

export default Header;
