'use client';

import SubmitButton from '../../../ui/submitButton/SubmitButton';

import { Box, Flex, Heading } from '@chakra-ui/react';

const FinalAmount = ({ dictionary, arrayCities, selectedCity }) => {
	const cityDetails = arrayCities.find(item => item.cityName === selectedCity);
	const price = cityDetails?.zone.data.attributes.price;

	return (
		<Box
			borderRadius={'2px'}
			border={'1px solid #3B3D46'}
			padding={'30px'}
			alignItems={'start'}
			flex={1}
			w={{ base: '100%', sm: '340px' }}
		>
			<Heading as={'h2'} fontSize={'20px'} fontFamily={600} mb={'30px'}>
				{dictionary.order.orderTitle}
			</Heading>
			<Flex color={'#808080'} fontSize={'14px'} flexDir={'column'} gap={'10px'}>
				<Flex justifyContent={'space-between'}>
					<Box as="span">{dictionary.order.subtotal}</Box>
					<Box as="span">€160</Box>
				</Flex>
				<Flex
					justifyContent={'space-between'}
					paddingBottom={'20px'}
					borderBottom={'1px solid #3B3D46'}
				>
					<Box as="span">{dictionary.order.shippingPrice}</Box>
					<Box as="span">{`€${price ? price : 0}`}</Box>
				</Flex>
				<Flex
					justifyContent={'space-between'}
					color={'#ffffff'}
					paddingBottom={'10px'}
				>
					<Box as="span">{dictionary.order.total}</Box>
					<Box as="span">€200</Box>
				</Flex>
				<SubmitButton>{dictionary.order.button}</SubmitButton>
			</Flex>
		</Box>
	);
};

export default FinalAmount;
