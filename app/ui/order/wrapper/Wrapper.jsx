import { cookies } from 'next/headers';

import { fetchCities } from '@/app/lib/api/instance';
import {
	fetchBagByUserId,
	fetchUserAddressForOrder,
	fetchUserDataForOrder,
} from '@/app/lib/api/profileInstance';

import WrapperClient from './WrapperClient';

const Wrapper = async ({ lang, dictionary }) => {
	const arrCities = await fetchCities();
	const data = await fetchUserDataForOrder();
	const response = await fetchUserAddressForOrder();
	const userId = cookies().get('userId')?.value;
	const getToken = cookies().get('jwt')?.value;
	const authToken = getToken === undefined ? false : true;

	let orderData = [];
	if (userId) {
		orderData = await fetchBagByUserId(userId);
	}

	const arrayCities = arrCities.map(({ attributes, id }) => {
		if (lang === 'he') {
			return {
				cityName: attributes.localizations?.data[0]?.attributes.cityName,
				zone: attributes.zone,
				id,
			};
		} else {
			return {
				cityName: attributes?.cityName,
				zone: attributes?.zone,
				id,
			};
		}
	});

	return (
		<WrapperClient
			authToken={authToken}
			arrayCities={arrayCities}
			dictionary={dictionary}
			lang={lang}
			userData={data?.data}
			orderData={orderData[0]}
			userId={userId}
			userAddress={response?.data}
		/>
	);
};

export default Wrapper;
