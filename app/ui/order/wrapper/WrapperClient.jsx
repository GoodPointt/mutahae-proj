'use client';

import { useState } from 'react';

import ContactInfo from '../contactInfo/ContactInfo';

const WrapperClient = ({
	authToken,
	dictionary,
	lang,
	arrayCities,
	userData,
	orderData,
	userId,
	userAddress,
}) => {
	const [selectedCity, setSelectedCity] = useState('');

	return (
		<ContactInfo
			arrayCities={arrayCities}
			dictionary={dictionary}
			setSelectedCity={setSelectedCity}
			lang={lang}
			authToken={authToken}
			selectedCity={selectedCity}
			userData={userData}
			orderData={orderData}
			userId={userId}
			userAddress={userAddress}
		/>
	);
};

export default WrapperClient;
