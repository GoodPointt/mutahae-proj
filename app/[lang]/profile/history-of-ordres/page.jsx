import { OrderHistory } from '../../../ui/profile/orderHistory/OrderHistory';

import { Heading } from '@chakra-ui/react';

import { fetchOrders } from '../../../lib/api/profileInstance';
import { getDictionary } from '../../../lib/locales/dictionary';

const HistoryOfOrders = async ({ params: { lang } }) => {
	const orders = await fetchOrders();

	const dictionary = await getDictionary(lang);
	const {
		historyOfOrders: { title },
	} = dictionary.profile;

	return (
		<>
			<Heading
				as="h2"
				mb={{ base: 6, lg: 8 }}
				fontSize={{ base: '2xl', lg: '4xl' }}
			>
				{title}
			</Heading>
			<OrderHistory lang={lang} orders={orders} />
		</>
	);
};
export default HistoryOfOrders;
