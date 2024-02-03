import { cookies } from 'next/headers';

import HeaderWrapper from './headerWrapper/HeaderWrapper';

const Header = async ({ lang, dictionary, contacts }) => {
	const getToken = cookies().get('jwt')?.value;

	const authToken = getToken === undefined ? false : true;

	return (
		<HeaderWrapper
			dictionary={dictionary}
			lang={lang}
			contacts={contacts}
			authToken={!authToken}
		/>
	);
};

export default Header;
