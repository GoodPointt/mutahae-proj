import React from 'react';

import { List } from '@chakra-ui/react';

import { OrderHistoryItem } from './OrderHistoryItem';

export const OrderHistory = () => {
	return (
		<List>
			<OrderHistoryItem />
		</List>
	);
};
