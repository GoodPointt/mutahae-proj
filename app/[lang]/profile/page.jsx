import React from 'react';
import { redirect } from 'next/navigation';

import { AddressSection } from '../../ui/profile/AddressSection';
import { AddressForm } from '../../ui/profile/forms/AddressForm';
import { RessetPasswordForm } from '../../ui/profile/forms/RessetPasswordForm';
import { UserDetailsForm } from '../../ui/profile/forms/UserDetailsForm';

import { Heading } from '@chakra-ui/react';

import { fetchUserAddress, fetchUserData } from '../../lib/api/profileInstance';
import { getDictionary } from '../../lib/locales/dictionary';

const Profile = async ({ params: { lang } }) => {
	const { data: userData } = await fetchUserData();
	let userAddress;
	try {
		const { data } = await fetchUserAddress();
		userAddress = data;
	} catch (error) {
		if (error.response.status === 401) {
			return redirect('/expired?expired=true');
		} else return { error: 'Server error please try again later.' };
	}
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
