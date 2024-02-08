'use client';

import { Flex, Link, Text } from '@chakra-ui/react';

import ProviderButton from '../../providerButton/ProviderButton';

const IsAccount = ({ dictionary, lang }) => {
	return (
		<>
			<Text
				fontSize={{ base: '12px', sm: '16px' }}
				fontWeight={{ base: '400', sm: '500' }}
				mb={'17px'}
			>
				{dictionary.order.accountQuestion}{' '}
				<Link
					href={`/${lang}/auth/login`}
					borderBottom={'1px solid white'}
					paddingBottom={'2px'}
					_hover={'none'}
				>
					{dictionary.order.login}
				</Link>{' '}
				or{' '}
				<Link
					href={`/${lang}/auth/register`}
					borderBottom={'1px solid white'}
					paddingBottom={'2px'}
					_hover={'none'}
				>
					{dictionary.order.register}
				</Link>
			</Text>
			<Flex width={'100%'} flexDir={'column'} gap={'10px'}>
				<ProviderButton
					style={{ mb: '25px' }}
					variant={'google'}
					dictionary={dictionary.formContact.signInProvider}
				/>
				<ProviderButton
					style={{ mb: '25px' }}
					variant={'facebook'}
					dictionary={dictionary.formContact.signInProvider}
				/>
			</Flex>
		</>
	);
};

export default IsAccount;
