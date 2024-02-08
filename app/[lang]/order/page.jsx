import { cookies } from 'next/headers';

import Wrapper from '../../ui/order/wrapper/Wrapper';
import SectionWrapper from '../../ui/sectionWrapper/SectionWrapper';

import { Heading } from '@chakra-ui/react';

import { fetchCities } from '@/app/lib/api/instance';
import {
	fetchBagByUserId,
	fetchUserDataForOrder,
} from '@/app/lib/api/profileInstance';
import { getDictionary } from '@/app/lib/locales/dictionary';

const Order = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);
	const arrCities = await fetchCities();
	const { data } = await fetchUserDataForOrder();
	const userId = cookies().get('userId')?.value;

	let orderData = [];

	if (userId) {
		orderData = await fetchBagByUserId(userId);
	}

	const arrayCities = arrCities.map(({ attributes }) => ({
		cityName: attributes.cityName,
		zone: attributes.zone,
	}));

	const getToken = cookies().get('jwt')?.value;
	const authToken = getToken === undefined ? false : true;

	return (
		<SectionWrapper>
			<Heading
				as={'h2'}
				fontSize={{ base: '27px', lg: '40.5' }}
				fontFamily={700}
				mb={'35px'}
			>
				{dictionary.order.title}
			</Heading>
			<Heading
				as={'h3'}
				fontSize={'20px'}
				fontFamily={600}
				marginBottom={'30px'}
			>
				{dictionary.order.subtitle}
			</Heading>

			<Wrapper
				authToken={authToken}
				arrayCities={arrayCities}
				dictionary={dictionary}
				lang={lang}
				userData={data}
				orderData={orderData[0]}
				userId={userId}
			/>
		</SectionWrapper>
	);
};

export default Order;
