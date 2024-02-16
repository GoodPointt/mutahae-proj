'use client';

import Link from 'next/link';

import { Center, Flex, Heading, Text } from '@chakra-ui/react';

import Btn from '../../button/Btn';
import SuccessIcon from '../../svg/SuccessIcon';

const OrderThankYou = ({ dictionary, lang }) => {
	return (
		<Flex
			flexDir={'column'}
			alignItems={'center'}
			pt={'40px'}
			pb={'80px'}
			textAlign={'center'}
		>
			<Center mb={'30px'}>
				<SuccessIcon />
			</Center>
			<Heading fontSize={'27px'} fontWeight={'700'} mb={'20px'}>
				{dictionary.orderThankYou.title}
			</Heading>
			<Text fontSize={'16px'} fontWeight={'500'} mb={'30px'}>
				{dictionary.orderThankYou.message}
			</Text>
			<Btn as={Link} href={`/${lang}/catalog`}>
				{dictionary.orderThankYou.button}
			</Btn>
		</Flex>
	);
};

export default OrderThankYou;
