import React from 'react';

import { List, ListItem } from '@chakra-ui/react';

export const AddressList = () => {
	return (
		<List>
			<ListItem fontSize="16px" mb="20px">
				Name
			</ListItem>
			<ListItem fontSize="16px">87144,</ListItem>
			<ListItem fontSize="16px">3 st. Amsterdam,</ListItem>
			<ListItem fontSize="16px"> Sderot Israel</ListItem>
		</List>
	);
};
