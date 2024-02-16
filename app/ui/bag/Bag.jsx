'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Box, Button, Flex, Heading, List, Text } from '@chakra-ui/react';

import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import ProductCard from '../productCard/ProductCard';
import SubmitButton from '../submitButton/SubmitButton';
import ArrowLeft from '../svg/ArrowLeft';
import ArrowRight from '../svg/ArrowRight';

import axios from 'axios';

const Bag = ({ bagData, hasToken, onClose, dictionary }) => {
	const [localGoods, setLocalGoods] = useLocalBag('localBag', []);
	const [isDeleted, setIsDeleted] = useState(null);

	const router = useRouter();

	const totalPrice = localGoods.reduce((acc, { count, good: { data } }) => {
		return acc + data.attributes.price * count;
	}, 0);

	const { lang } = useParams();

	const onOrderClick = () => {
		router.push(`/${lang}/order`);
		onClose();
	};

	const discountThreshold1 = 5000;
	const discountThreshold2 = 10000;
	const discount1 = 0.05;
	const discount2 = 0.08;

	let discount = 0;

	if (totalPrice > discountThreshold2) {
		discount = discount2;
	} else if (totalPrice > discountThreshold1) {
		discount = discount1;
	}

	const discountedBagPrice = Math.round(totalPrice * (1 - discount));

	useEffect(() => {
		const flatten = localGoods.map(({ count, good: { data } }) => ({
			good: data,
			count,
		}));

		const deleteGoodFromServerBag = async () => {
			try {
				const url =
					process.env.NEXT_PUBLIC_STRAPI_API_URL +
					`/api/bags/${bagData.id}?populate=goods`;
				await axios.put(
					url,
					{ data: { goods: flatten } },
					{
						headers: {
							'Content-Type': 'application/json',
						},
					}
				);
			} catch (error) {
				console.error(error);
			}
		};
		if (isDeleted && hasToken) {
			deleteGoodFromServerBag();
			setIsDeleted(false);
		}
	}, [hasToken, isDeleted, localGoods]);

	return (
		<Flex flexDir={'column'}>
			<Heading as={'h2'}>{dictionary.bag.title}</Heading>
			{localGoods.length !== 0 ? (
				<>
					<List>
						{localGoods.map(({ count, good }) => (
							<Box
								as="li"
								key={good.data.id}
								py={'30px'}
								borderBottom={'1px #A28445 solid'}
							>
								<ProductCard
									hasToken={hasToken}
									productCount={count}
									dictionary={dictionary}
									setIsDeleted={setIsDeleted}
									goods={localGoods}
									bagId={hasToken && bagData.id}
									good={flattenAttributes(good)}
									setGoods={setLocalGoods}
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
								{discount !== 0 && (
									<Text
										as="span"
										fontSize={'16px'}
										color={'#f84147'}
										textAlign={'end'}
									>
										{discountedBagPrice} ₪
									</Text>
								)}
							</Box>
						</Flex>

						<SubmitButton
							maxW={{ base: '100%', md: '360px' }}
							bgColor={'#A28445'}
							textColor={'#fff'}
							onClick={onOrderClick}
							borderRadius={'0px'}
							_hover={{ bgColor: '#81672e' }}
							message={dictionary.buttons.loaders.order}
						>
							{dictionary.buttons.order} {totalPrice} ₪
						</SubmitButton>
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
