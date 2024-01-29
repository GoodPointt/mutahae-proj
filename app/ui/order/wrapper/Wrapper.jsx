'use client';

import { useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import ContactInfo from '../contactInfo/ContactInfo';
import FinalAmount from '../finalAmount/FinalAmount';
import IsAccount from '../isAccount/IsAccount';
import Shipping from '../shipping/Shipping';

const Wrapper = ({ authToken, dictionary, lang, arrayCities }) => {
	const [selectedCity, setSelectedCity] = useState('');

	const handleValueChange = city => {
		setSelectedCity(city);
	};

	return (
		<Flex
			flexDirection={{ base: 'column', lg: 'row' }}
			gap={'50px'}
			alignItems={'start'}
		>
			<Box w={{ base: '100%', lg: '651px', xl: '751px' }}>
				<ContactInfo dictionary={dictionary} lang={lang} />
				{!authToken && <IsAccount dictionary={dictionary} lang={lang} />}
				<Shipping
					arrayCities={arrayCities}
					dictionary={dictionary}
					onValueChange={handleValueChange}
				/>
			</Box>
			<FinalAmount
				dictionary={dictionary}
				selectedCity={selectedCity}
				arrayCities={arrayCities}
			/>
		</Flex>
	);
};

export default Wrapper;
