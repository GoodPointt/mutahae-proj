import React from 'react';

import {
	fetchUserAddress,
	fetchUserData,
} from '../../../lib/api/profileInstance';

import { AddressSection } from '../AddressSection';

import { AddressForm } from './AddressForm';
import { RessetPasswordForm } from './RessetPasswordForm';
import { UserDetailsForm } from './UserDetailsForm';

const SsrUserDetailsForm = async ({ lang, dictionary }) => {
	const { data: userData } = await fetchUserData();
	const { data: userAddress } = await fetchUserAddress();

	const {
		contactInformation,
		ressetPasswordForm,
		addAddressForm,
		addressSection,
	} = dictionary.profile;

	return (
		<>
			<UserDetailsForm
				userData={userData}
				lang={lang}
				userDetailsDictionary={contactInformation}
			/>
			<AddressSection userAddress={userAddress} dictionary={addressSection} />
			<AddressForm dictionary={addAddressForm} lang={lang} />
			{userData?.provider === 'local' && (
				<RessetPasswordForm ressetPassDictionary={ressetPasswordForm} />
			)}
		</>
	);
};

export default SsrUserDetailsForm;
