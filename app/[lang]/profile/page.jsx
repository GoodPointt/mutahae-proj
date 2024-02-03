import React from 'react';

import { AddressSection } from '../../ui/profile/AddressSection';
import { AddressForm } from '../../ui/profile/forms/AddressForm';
import { RessetPasswordForm } from '../../ui/profile/forms/RessetPasswordForm';
import { UserDetailsForm } from '../../ui/profile/forms/UserDetailsForm';

import { Heading } from '@chakra-ui/react';

import { fetchUserData } from '../../lib/api/profileInstance';
import { getDictionary } from '../../lib/locales/dictionary';

const Profile = async ({ params: { lang } }) => {
	const { data: userData } = await fetchUserData();
	const dictionary = await getDictionary(lang);
	const { contactInformation, ressetPasswordForm } = dictionary.profile;

	return (
		<>
			<Heading
				as="h2"
				mb={{ base: '20px', lg: '40px' }}
				fontSize={{ base: '2xl', lg: '4xl' }}
			>
				{contactInformation.title}
			</Heading>
			<UserDetailsForm
				userData={userData}
				lang={lang}
				userDetailsDictionary={contactInformation}
			/>
			<AddressSection />
			<AddressForm />
			<RessetPasswordForm ressetPassDictionary={ressetPasswordForm} />
		</>
	);
};

export default Profile;
