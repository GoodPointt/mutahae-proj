import React from 'react';

import { AddressSection } from '../../ui/profile/AddressSection';
import { AddressForm } from '../../ui/profile/forms/AddressForm';
import { UserDetailsForm } from '../../ui/profile/forms/UserDetailsForm';

import { Heading } from '@chakra-ui/react';

import { fetchUserData } from '../../lib/api/profileInstance';

const Profile = async ({ params: { lang } }) => {
	const { data: userData } = await fetchUserData();

	return (
		<>
			<Heading
				as="h2"
				mb={{ base: '20px', lg: '40px' }}
				fontSize={{ base: '2xl', lg: '4xl' }}
			>
				Contact Information
			</Heading>
			<UserDetailsForm userData={userData} lang={lang} />
			<AddressSection />
			<AddressForm />
		</>
	);
};

export default Profile;
