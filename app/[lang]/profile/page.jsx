import React from 'react';

import { AddressSection } from '../../ui/profile/AddressSection';
import { AddressForm } from '../../ui/profile/forms/AddressForm';
import { UserDetailsForm } from '../../ui/profile/forms/UserDetailsForm';

import { Heading } from '@chakra-ui/react';

const Profile = () => {
	return (
		<>
			<Heading
				as="h2"
				mb={{ base: '20px', lg: '40px' }}
				fontSize={{ base: '2xl', lg: '4xl' }}
			>
				Contact Information
			</Heading>
			<UserDetailsForm />
			<AddressSection />
			<AddressForm />
		</>
	);
};

export default Profile;
