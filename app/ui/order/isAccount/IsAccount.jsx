'use client';

import { usePathname } from 'next/navigation';

import { Flex, Link, Text } from '@chakra-ui/react';

import ProviderButton from '../../providerButton/ProviderButton';

const IsAccount = ({ dictionary, lang }) => {
	const pathname = usePathname();

	return (
		<>
			<Text
				fontSize={{ base: '12px', sm: '16px' }}
				fontWeight={{ base: '400', sm: '500' }}
				mb={'17px'}
			>
				{dictionary.order.accountQuestion}{' '}
				<Link
					onClick={() => {
						localStorage.setItem('callbackPath', JSON.stringify(pathname));
					}}
					href={`/${lang}/auth/login`}
					borderBottom={'1px solid white'}
					paddingBottom={'2px'}
					_hover={{ color: '#ccc' }}
				>
					{dictionary.order.login}
				</Link>{' '}
				or{' '}
				<Link
					onClick={() => {
						localStorage.setItem('callbackPath', JSON.stringify(pathname));
					}}
					href={`/${lang}/auth/register`}
					borderBottom={'1px solid white'}
					paddingBottom={'2px'}
					_hover={{ color: '#ccc' }}
				>
					{dictionary.order.register}
				</Link>
			</Text>
			<Flex width={'100%'} flexDir={{ base: 'column', sm: 'row' }} gap={'15px'}>
				<ProviderButton
					style={{
						mb: '25px',
						width: '100%',

						'@media (minWidth: 481px)': {
							width: '50%',
						},
					}}
					variant={'google'}
					dictionary={dictionary.formContact.signInProvider}
				/>
				{/* <ProviderButton
					style={{
						mb: '25px',
						width: '100%',

						'@media (minWidth: 481px)': {
							width: '50%',
						},
					}}
					variant={'facebook'}
					dictionary={dictionary.formContact.signInProvider}
				/> */}
			</Flex>
		</>
	);
};

export default IsAccount;
