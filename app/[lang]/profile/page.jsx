import React from 'react';

import { AddressSection } from '../../ui/profile/AddressSection';
import { AddressForm } from '../../ui/profile/forms/AddressForm';
import { RessetPasswordForm } from '../../ui/profile/forms/RessetPasswordForm';
import { UserDetailsForm } from '../../ui/profile/forms/UserDetailsForm';

import { Heading } from '@chakra-ui/react';

import { fetchUserAddress, fetchUserData } from '../../lib/api/profileInstance';
import { getDictionary } from '../../lib/locales/dictionary';

const Profile = async ({ params: { lang } }) => {
	const { data: userData } = await fetchUserData();
	const { data: userAddress } = await fetchUserAddress();

	const dictionary = await getDictionary(lang);
	const {
		contactInformation,
		ressetPasswordForm,
		addAddressForm,
		addressSection,
	} = dictionary.profile;

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
			<AddressSection userAddress={userAddress} dictionary={addressSection} />
			<AddressForm dictionary={addAddressForm} />
			{userData?.provider === 'local' && (
				<RessetPasswordForm ressetPassDictionary={ressetPasswordForm} />
			)}
		</>
	);
};

export default Profile;
