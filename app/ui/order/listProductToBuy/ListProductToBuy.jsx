import React from 'react';

import { Divider, Flex } from '@chakra-ui/react';

import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import ProductCard from '../../productCard/ProductCard';

const ListProductToBuy = ({
	goodsToMap,
	setGoodsToMap,
	setLocalGoods,
	authToken,
	dictionary,
}) => {
	return (
		<Flex
			flexDir={'column'}
			as="ul"
			mb={'60px'}
			border={'1px solid #3B3D46'}
			width={{ base: '100%', lg: '651px', xl: '751px' }}
			p={'30px'}
		>
			{goodsToMap.length > 0 &&
				goodsToMap.map(({ good, count }, index) => (
					<React.Fragment key={good?.data?.id || good.id}>
						<Flex
							as="li"
							justifyContent={'space-between'}
							rowGap={{ base: '30px', md: '0px' }}
							alignItems={{ base: 'start', md: 'center' }}
							flexDir={{ base: 'column', md: 'row' }}
						>
							<ProductCard
								dictionary={dictionary}
								setGoods={authToken ? setGoodsToMap : setLocalGoods}
								hasToken={authToken}
								productCount={count}
								good={flattenAttributes(good)}
							/>
						</Flex>
						{index !== goodsToMap.length - 1 && (
							<Divider
								borderColor={'#A28445'}
								mb={'30px'}
								mt={'30px'}
								opacity={1}
							/>
						)}
					</React.Fragment>
				))}
		</Flex>
	);
};

export default ListProductToBuy;
