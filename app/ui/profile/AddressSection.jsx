import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

import { AddressList } from './AddressList';

export const AddressSection = () => {
	return (
		<Box>
			<Heading as="h4" fontSize="20px" fontWeight="600" mb="30px">
				My Аddress
			</Heading>

			<AddressList />
		</Box>
	);
};
