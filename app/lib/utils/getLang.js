import { cookies } from 'next/headers';
const getLang = () => {
	return cookies().get('lang')?.value;
};

export default getLang;
