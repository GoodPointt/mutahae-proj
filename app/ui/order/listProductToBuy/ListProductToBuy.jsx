import React, { useEffect, useState } from 'react';

import { Divider, Flex } from '@chakra-ui/react';

import { instance } from '@/app/lib/api/instance';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import ProductCard from '../../productCard/ProductCard';

const ListProductToBuy = ({
	goodsToMap,
	setLocalGoods,
	authToken,
	dictionary,
	orderData,
}) => {
	const [isDeleted, setIsDeleted] = useState(null);

	useEffect(() => {
		const flatten = goodsToMap.map(({ count, good: { data } }) => ({
			good: data,
			count,
		}));

		const deleteGoodFromServerBag = async () => {
			try {
				const url =
					process.env.NEXT_PUBLIC_STRAPI_API_URL +
					`/api/bags/${orderData.id}?populate=goods`;
				await instance.put(
					url,
					{ data: { goods: flatten } },
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);
			} catch (error) {
				console.error('deleteGoodFromServerBag', error);
			}
		};
		if (isDeleted && authToken) {
			deleteGoodFromServerBag();
			setIsDeleted(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authToken, isDeleted, goodsToMap]);

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
				goodsToMap.map(({ good, count }, index) => {
					return (
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
									setGoods={setLocalGoods}
									hasToken={authToken}
									productCount={count}
									good={flattenAttributes(good)}
									setIsDeleted={setIsDeleted}
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
					);
				})}
		</Flex>
	);
};

export default ListProductToBuy;
