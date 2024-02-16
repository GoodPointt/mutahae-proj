import React from 'react';
import Link from 'next/link';

import RegisterForm from '@/app/ui/auth/RegisterForm';
import ProviderButton from '@/app/ui/providerButton/ProviderButton';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';

import { Box, Center, Flex, Link as ChackraLink } from '@chakra-ui/react';

import { getDictionary } from '@/app/lib/locales/dictionary';

const RegisterPage = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	return (
		<SectionWrapper heading={dictionary.formContact.register}>
			<Flex
				flexDir={{ base: 'column', lg: 'row' }}
				gap={{ base: '30px', lg: '20px' }}
				justify={{ lg: 'space-between' }}
			>
				<RegisterForm lang={lang} dictionary={dictionary} />

				<Box bgColor={'#3B3D46'} w={'1px'}></Box>
				<Flex
					flexDir={'column'}
					justifyContent={'space-between'}
					width={'100%'}
				>
					<Flex flexDir={'column'} gap={'25px'}>
						<ProviderButton
							style={{ mb: '25px' }}
							variant={'google'}
							dictionary={dictionary.formContact.signInProvider}
						/>
						{/* <ProviderButton
						style={{ mb: '25px' }}
						variant={'facebook'}
						dictionary={dictionary.formContact.signInProvider}
					/> */}
					</Flex>
					<Center mt={'20px'}>
						<ChackraLink
							as={Link}
							href={`/${lang}/auth/login`}
							fontSize={'14px'}
							fontWeight={500}
							lineHeight={1.5}
							borderBottomColor={'rgba(255, 255, 255, 1)'}
							borderBottomWidth={'1px'}
							_hover={{ bgColor: 'transparent', color: 'lightgray' }}
						>
							{dictionary.buttons.login}
						</ChackraLink>
					</Center>
				</Flex>
			</Flex>
		</SectionWrapper>
	);
};

export default RegisterPage;
