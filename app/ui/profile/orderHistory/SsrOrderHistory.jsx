import React from 'react';
import Link from 'next/link';

import { Button, Flex, Text } from '@chakra-ui/react';

import { fetchOrders } from '../../../lib/api/profileInstance';

import ArrowLeft from '../../svg/ArrowLeft';
import ArrowRight from '../../svg/ArrowRight';

import { OrderHistory } from './OrderHistory';

const SsrOrderHistory = async ({ lang, dictionary }) => {
	const orders = await fetchOrders();

	return orders.length > 0 ? (
		<OrderHistory lang={lang} orders={orders} dictionary={dictionary} />
	) : (
		<Flex
			flexDir={{ base: 'column', md: 'row' }}
			gap={'30px'}
			justifyContent={{ base: 'center', md: 'start' }}
			alignItems={'center'}
			pb={0}
		>
			<Text textAlign={'center'}>{dictionary.profile.favorites.empty}</Text>
			<Button
				pos={'relative'}
				variant={'link'}
				textColor={'#fff'}
				borderRadius={'0px'}
				_after={{
					content: '""',
					pos: 'absolute',
					bottom: '-5px',
					left: 0,
					display: 'block',
					h: '1px',
					w: '100%',
					bgColor: '#81672e',
					opacity: 0,
				}}
				stroke={'#fff'}
				rightIcon={lang === 'en' ? <ArrowRight /> : <ArrowLeft />}
				_hover={{
					color: '#81672e',
					stroke: '#81672e',
					_after: { opacity: 1 },
				}}
			>
				<Link
					href={`/${lang}/catalog`}
					style={{
						display: 'flex',
						width: '100%',
						height: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					{dictionary.buttons.emptyBagLink}
				</Link>
			</Button>
		</Flex>
	);
};

export default SsrOrderHistory;
