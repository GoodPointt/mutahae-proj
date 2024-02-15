'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Box, Button, Flex, Heading, List, Text } from '@chakra-ui/react';

import { updateAllGoodsInBag } from '@/app/lib/actions';
import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import ProductCard from '../productCard/ProductCard';
import SubmitButton from '../submitButton/SubmitButton';
import ArrowLeft from '../svg/ArrowLeft';
import ArrowRight from '../svg/ArrowRight';

const Bag = ({ bagData, hasToken, onClose, dictionary }) => {
	const [goodsToMap, setGoodsToMap] = useState([]);
	const [localGoods, setLocalGoods] = useLocalBag('localBag', []);

	const initialState = {
		message: '',
	};

	const [state, formAction] = useFormState(updateAllGoodsInBag, initialState);

	const router = useRouter();
	const [discount, setDiscount] = useState(false);

	const totalPrice = goodsToMap.reduce((acc, { count, good }) => {
		const flattenGood = flattenAttributes(good);

		return acc + flattenGood.price * count;
	}, 0);

	// useEffect(() => {
	// 	const isDifferentCount =
	// 		hasToken &&
	// 		goodsToMap.some((good, index) => {
	// 			return bagData && bagData.goods[index].count !== good.count;
	// 		});
	// }, [bagData, goodsToMap, hasToken]);

	const { lang } = useParams();

	const discountedPrice = useMemo(() => {
		if (totalPrice > 5000) {
			setDiscount(true);

			return Math.floor(totalPrice - totalPrice * 0.05);
		}
		if (totalPrice > 10000) {
			setDiscount(true);

			return Math.floor(totalPrice - totalPrice * 0.08);
		}

		setDiscount(false);

		return null;
	}, [totalPrice]);

	useEffect(() => {
		if (state?.status === 200) {
			router.push(`/${lang}/order`);
			onClose();
		}
		if (state?.message) {
			router.push(`/${lang}/not-found`);
		}
	}, [lang, onClose, router, state]);

	useEffect(() => {
		if (!hasToken) {
			setGoodsToMap(localGoods || []);
		} else {
			const { goods } = bagData || {};
			setGoodsToMap(goods || []);
		}
	}, [hasToken, bagData, localGoods, setLocalGoods]);

	return (
		<Flex flexDir={'column'}>
			<Heading as={'h2'}>{dictionary.bag.title}</Heading>
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
									dictionary={dictionary}
									goods={goodsToMap}
									bagId={hasToken && bagData.id}
									good={flattenAttributes(good)}
									setGoods={hasToken ? setGoodsToMap : setLocalGoods}
									bagPrice={totalPrice}
								/>
							</Box>
						))}
					</List>
					<Flex mt={'30px'} maxW={'100%'} flexDir={'column'} gap={'30px'}>
						<Text>{dictionary.bag.shipping}</Text>
						<Flex justifyContent={'space-between'}>
							<Text>{dictionary.bag.subtotal}</Text>
							<Box display={'flex'} flexDir={'column'}>
								<Text
									as={'span'}
									textDecoration={discount ? 'line-through' : 'none'}
									color={discount ? '#808080' : '#fff'}
								>
									{totalPrice} ₪
								</Text>
								{discount && (
									<Text
										as="span"
										fontSize={'16px'}
										color={'#f84147'}
										textAlign={'end'}
									>
										{discount && discountedPrice}
									</Text>
								)}
							</Box>
						</Flex>
						{hasToken ? (
							<form
								action={() => {
									formAction({ goods: goodsToMap, bagPrice: totalPrice, lang });
								}}
							>
								<SubmitButton
									maxW={{ base: '100%', md: '360px' }}
									bgColor={'#A28445'}
									textColor={'#fff'}
									borderRadius={'0px'}
									_hover={{ bgColor: '#81672e' }}
									message={dictionary.buttons.loaders.order}
								>
									{dictionary.buttons.order} {totalPrice} ₪
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
										gap: '5px',
										height: '100%',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Text as={'span'}>{dictionary.buttons.order}</Text>
									<Text as={'span'}>{totalPrice} ₪</Text>
								</Link>
							</Button>
						)}
					</Flex>
				</>
			) : (
				<Flex
					flexDir={'column'}
					gap={'30px'}
					justifyContent={'center'}
					alignItems={'center'}
					p={'30px'}
					pb={0}
				>
					<Text textAlign={'center'} py={'40px'}>
						{dictionary.bag.emptyBag}
					</Text>
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
						onClick={onClose}
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
			)}
		</Flex>
	);
};

export default Bag;
