import React, { Suspense } from 'react';

import SsrUserDetailsForm from '../../ui/profile/forms/SsrUserDetailsForm';
import SkeletonUserDetails from '../../ui/skeletons/SkeletonUserDetails';

import { Box, Heading } from '@chakra-ui/react';

import { getDictionary } from '../../lib/locales/dictionary';

const Profile = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	return (
		<Box
			borderRight={{ base: 'none', lg: '1px solid #3B3D46' }}
			paddingRight={{ base: 0, lg: '60px' }}
		>
			<Heading
				as="h2"
				mb={{ base: '20px', lg: '40px' }}
				fontSize={{ base: '2xl', lg: '4xl' }}
			>
				{dictionary.profile.contactInformation.title}
			</Heading>

			<Suspense fallback={<SkeletonUserDetails />}>
				<SsrUserDetailsForm lang={lang} dictionary={dictionary} />
			</Suspense>
		</Box>
	);
};

export default Profile;
