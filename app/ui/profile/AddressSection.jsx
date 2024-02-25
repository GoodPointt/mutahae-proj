'use client';
import React from 'react';

import { Box, Heading } from '@chakra-ui/react';

import { AddressList } from './AddressList';

export const AddressSection = ({
	dictionary,
	userAddress,
	addressDictionary,
}) => {
	const { title } = dictionary;
	const addressList = userAddress?.data;

	return (
		<Box>
			<Heading as="h4" fontSize="20px" fontWeight="600" mb="30px">
				{title}
			</Heading>

			{addressList &&
				addressList.length > 0 &&
				addressList.map((address, i) => {
					const { id, attributes } = address;
					const { region, city, street, app, index } = attributes;

					return (
						<AddressList
							key={id}
							id={id}
							region={region}
							city={city}
							street={street}
							app={app}
							index={index}
							isBorder={i > 0}
							dictionary={dictionary}
							addressDictionary={addressDictionary}
						/>
					);
				})}
		</Box>
	);
};
