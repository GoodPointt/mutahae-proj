'use client';

import React, { useEffect, useState } from 'react';

import { Box, Button, Flex, Heading, List, Text } from '@chakra-ui/react';

import useLocalStorage from '@/app/lib/hooks/useLocalStorage';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import ProductCard from '../productCard/ProductCard';

const Bag = ({ bagData, authToken }) => {
	const [goodsToMap, setGoodsToMap] = useState([]);
	const [localGoods, setLocalGoods] = useLocalStorage('localBag', []);
	const [bagId, setBagId] = useState(null);

	useEffect(() => {
		if (!authToken) {
			setGoodsToMap(localGoods || []);
		} else {
			const { goods, id } = bagData || {};
			setBagId(id);
			setGoodsToMap(goods || []);
		}
	}, [authToken, bagData, localGoods]);

	return (
		<div>
			<Heading as={'h2'}>Bag</Heading>
			{goodsToMap.length !== 0 ? (
				<>
					<List>
						{goodsToMap.map(({ id, good, count }) => (
							<Box
								as="li"
								key={id}
								py={'30px'}
								borderBottom={'1px #A28445 solid'}
							>
								<ProductCard
									authToken={authToken}
									productCount={count}
									id={bagId}
									good={flattenAttributes(good)}
									goodId={id}
									goods={goodsToMap}
									setGoods={setLocalGoods}
								/>
							</Box>
						))}
					</List>
					<Flex mt={'30px'} maxW={'100%'} flexDir={'column'} gap={'30px'}>
						<Text>*Shipping calculated at checkout</Text>
						<Flex justifyContent={'space-between'}>
							<Text>Subtotal:</Text>
							<Text as={'span'}>€160</Text>
						</Flex>
						<Button
							variant={'unstyled'}
							maxW={{ base: '100%', lg: '360px' }}
							bgColor={'#A28445'}
							textColor={'#fff'}
							borderRadius={'0px'}
							_hover={{ bgColor: '#81672e' }}
						>
							Order €160
						</Button>
					</Flex>
				</>
			) : (
				<Text p={'100px'}>Nothing in the bag</Text>
			)}
		</div>
	);
};

export default Bag;
