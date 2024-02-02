'use client';

import { useState } from 'react';

import ContactInfo from '../contactInfo/ContactInfo';

const Wrapper = ({ authToken, dictionary, lang, arrayCities, userData }) => {
	const [selectedCity, setSelectedCity] = useState('');

	const handleValueChange = city => {
		setSelectedCity(city);
	};

	return (
		<ContactInfo
			arrayCities={arrayCities}
			dictionary={dictionary}
			onValueChange={handleValueChange}
			lang={lang}
			authToken={authToken}
			selectedCity={selectedCity}
			userData={userData}
		/>
	);
};

export default Wrapper;
