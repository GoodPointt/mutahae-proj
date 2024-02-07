import React from 'react';

import LoginForm from '@/app/ui/auth/LoginForm';
import ProviderButton from '@/app/ui/providerButton/ProviderButton';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';

import { Box, Flex } from '@chakra-ui/react';

import { getDictionary } from '@/app/lib/locales/dictionary';

const LoginPage = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	return (
		<SectionWrapper heading={dictionary.formContact.login}>
			<Flex
				flexDir={{ base: 'column', lg: 'row' }}
				gap={{ base: '30px', lg: '20px' }}
				justify={{ lg: 'space-between' }}
			>
				<LoginForm lang={lang} dictionary={dictionary} />
				<Box bgColor={'#3B3D46'} w={'1px'}></Box>
				<Flex width={'100%'} flexDir={'column'} gap={'25px'}>
					<ProviderButton style={{ mb: '25px' }} variant={'google'} />
					<ProviderButton style={{ mb: '25px' }} variant={'facebook'} />
				</Flex>
			</Flex>
		</SectionWrapper>
	);
};

export default LoginPage;
