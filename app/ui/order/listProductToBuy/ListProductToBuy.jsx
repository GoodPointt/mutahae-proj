'use client';

import React, { useEffect, useState } from 'react';

import { Box, Divider, Flex } from '@chakra-ui/react';

import useLocalStorage from '@/app/lib/hooks/useLocalStorage';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import ProductCard from '../../productCard/ProductCard';

const ListProductToBuy = ({ orderData, authToken }) => {
	const [goodsToMap, setGoodsToMap] = useState([]);
	const [localGoods, setLocalGoods] = useLocalStorage('localBag', []);
	const [bagId, setBagId] = useState(null);

	useEffect(() => {
		if (!authToken) {
			setGoodsToMap(localGoods || []);
		} else {
			const { goods, id } = orderData || {};
			setBagId(id);
			setGoodsToMap(goods || []);
		}
	}, [authToken, orderData, localGoods]);

	return (
		<Box as="ul" mt={'60px'} border={'1px solid #3B3D46'} padding={'30px'}>
			{goodsToMap.map(({ id, good, count }, index) => (
				<React.Fragment key={id}>
					<Flex
						as="li"
						justifyContent={'space-between'}
						rowGap={{ base: '30px', md: '0px' }}
						alignItems={{ base: 'start', md: 'center' }}
						flexDir={{ base: 'column', md: 'row' }}
					>
						<ProductCard
							hasToken={authToken}
							productCount={count}
							id={bagId}
							good={flattenAttributes(good)}
							goodId={id}
							setGoods={setLocalGoods}
							goods={goodsToMap}
						/>
					</Flex>
					{goodsToMap.length - 1 !== index && (
						<Divider
							borderColor={'#A28445'}
							mb={'30px'}
							mt={'30px'}
							opacity={1}
						/>
					)}
				</React.Fragment>
			))}
		</Box>
	);
};

export default ListProductToBuy;
