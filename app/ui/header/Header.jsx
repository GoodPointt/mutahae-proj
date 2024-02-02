import { cookies } from 'next/headers';

import { fetchBagByUserId } from '@/app/lib/api/profileInstance';

import HeaderWrapper from './headerWrapper/HeaderWrapper';

const Header = async ({ lang, dictionary, contacts }) => {
	const getToken = cookies().get('jwt')?.value;

	const authToken = getToken === undefined ? false : true;
	const userId = cookies().get('userId')?.value;

	let data = [];

	if (userId) {
		data = await fetchBagByUserId(userId);
	}

	return (
		<HeaderWrapper
			bagData={data[0]}
			dictionary={dictionary}
			lang={lang}
			contacts={contacts}
			authToken={authToken}
		/>
	);
};

export default Header;
