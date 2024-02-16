'use client';

import Link from 'next/link';

import { Flex, Heading, Text } from '@chakra-ui/react';

import Btn from '../../button/Btn';

const OrderReject = ({ dictionary, lang }) => {
	return (
		<Flex
			flexDir={'column'}
			alignItems={'center'}
			pt={'80px'}
			pb={'80px'}
			textAlign={'center'}
		>
			<Heading fontSize={'23px'} fontWeight={'700'} mb={'20px'}>
				{dictionary.orderReject.title}
			</Heading>
			<Text fontSize={'16px'} fontWeight={'500'} mb={'30px'}>
				{dictionary.orderReject.message}
			</Text>
			<Btn as={Link} href={`/${lang}/contact`}>
				{dictionary.orderReject.button}
			</Btn>
		</Flex>
	);
};

export default OrderReject;
