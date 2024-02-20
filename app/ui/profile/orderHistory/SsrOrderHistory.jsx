import React from 'react';
import Link from 'next/link';

import { fetchOrders } from '../../../lib/api/profileInstance';

import { OrderHistory } from './OrderHistory';

const SsrOrderHistory = async ({ lang, dictionary }) => {
	const orders = await fetchOrders();

	return orders.length > 0 ? (
		<OrderHistory lang={lang} orders={orders} dictionary={dictionary} />
	) : (
		<Link href={`/catalog`}>{dictionary.header.navItems[1].title}</Link>
	);
};

export default SsrOrderHistory;
