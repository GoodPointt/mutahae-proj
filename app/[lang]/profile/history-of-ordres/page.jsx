import { OrderHistory } from '../../../ui/profile/orderHistory/OrderHistory';

import { Heading } from '@chakra-ui/react';

const HistoryOfOrders = ({ params: { lang } }) => {
	return (
		<>
			<Heading
				as="h2"
				mb={{ base: 6, lg: 8 }}
				fontSize={{ base: '2xl', lg: '4xl' }}
			>
				History of orders
			</Heading>
			<OrderHistory lang={lang} />
		</>
	);
};
export default HistoryOfOrders;
