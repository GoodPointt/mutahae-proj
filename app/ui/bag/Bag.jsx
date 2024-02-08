'use client';

import React, { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import { Box, Button, Flex, Heading, List, Text } from '@chakra-ui/react';

import { updateAllGoodsInBag } from '@/app/lib/actions';
import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import ProductCard from '../productCard/ProductCard';
import SubmitButton from '../submitButton/SubmitButton';

const Bag = ({ bagData, hasToken, onClose }) => {
	const [goodsToMap, setGoodsToMap] = useState([]);
	const [localGoods, setLocalGoods] = useLocalBag('localBag', []);
	const [state, formAction] = useFormState(updateAllGoodsInBag);

	const totalPrice = goodsToMap.reduce((acc, { count, good }) => {
		const flattenGood = flattenAttributes(good);

		return acc + flattenGood.price * count;
	}, 0);

	const totalPriceString = totalPrice + '€';

	const { lang } = useParams();
	const { replace } = useRouter();

	useEffect(() => {
		if (state?.status && state?.status === 200) {
			onClose();
			replace(`/${lang}/order`);
		}
	}, [lang, onClose, replace, state?.status]);

	useEffect(() => {
		if (!hasToken) {
			setGoodsToMap(localGoods || []);
		} else {
			const { goods } = bagData || {};
			setGoodsToMap(goods || []);
		}
	}, [hasToken, bagData, localGoods]);

	return (
		<Flex flexDir={'column'}>
			<Heading as={'h2'}>Bag</Heading>
			{goodsToMap.length !== 0 ? (
				<>
					<List>
						{goodsToMap.map(({ good, count }) => (
							<Box
								as="li"
								key={good.data ? good.data.attributes.uid : good.attributes.uid}
								py={'30px'}
								borderBottom={'1px #A28445 solid'}
							>
								<ProductCard
									hasToken={hasToken}
									productCount={count}
									good={flattenAttributes(good)}
									setGoods={hasToken ? setGoodsToMap : setLocalGoods}
								/>
							</Box>
						))}
					</List>
					<Flex mt={'30px'} maxW={'100%'} flexDir={'column'} gap={'30px'}>
						<Text>*Shipping calculated at checkout</Text>
						<Flex justifyContent={'space-between'}>
							<Text>Subtotal:</Text>
							<Text as={'span'}>{totalPriceString}</Text>
						</Flex>
						{hasToken ? (
							<form
								action={() =>
									formAction({ goods: goodsToMap, bagPrice: totalPrice, lang })
								}
							>
								<SubmitButton
									maxW={{ base: '100%', md: '360px' }}
									bgColor={'#A28445'}
									textColor={'#fff'}
									borderRadius={'0px'}
									_hover={{ bgColor: '#81672e' }}
								>
									Order {totalPriceString}
								</SubmitButton>
							</form>
						) : (
							<Button
								variant={'unstyled'}
								maxW={{ base: '100%', lg: '360px' }}
								bgColor={'#A28445'}
								textColor={'#fff'}
								borderRadius={'0px'}
								_hover={{ bgColor: '#81672e' }}
								onClick={onClose}
							>
								<Link
									href={`/${lang}/order`}
									style={{
										display: 'flex',
										width: '100%',
										height: '100%',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									Order {totalPriceString}
								</Link>
							</Button>
						)}
					</Flex>
				</>
			) : (
				<Text textAlign={'center'} py={'50px'}>
					Nothing in the bag
				</Text>
			)}
		</Flex>
	);
};

export default Bag;
