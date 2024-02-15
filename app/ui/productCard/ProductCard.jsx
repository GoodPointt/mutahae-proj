'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { Box, Button, Flex, Grid, Heading, List, Text } from '@chakra-ui/react';

import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import Counter from '../singleProduct/Counter/Counter';
import TotalBagPrice from '../singleProduct/TotalBagPrice/TotalBagPrice';
import DeleteIcon from '../svg/DeleteIcon';

import axios from 'axios';

const ProductCard = ({
	good,
	hasToken,
	setGoods,
	productCount,
	bagPrice,
	dictionary,
	goods,
	bagId,
}) => {
	const [count, setCount] = useState(productCount);
	// const [, formAction] = useFormState(deleteProductFromBag);
	const [isExist, setIsExist] = useState(true);
	const {
		uid,
		img,
		descShort,
		title,
		thickness,
		length,
		width,
		type,
		price,
		localizations,
		locale,
	} = good;

	const { lang } = useParams();

	const { refresh } = useRouter();

	const sizes = useMemo(() => {
		const sizesArray =
			(locale === 'he' && lang === 'he') || (locale === 'en' && lang === 'en')
				? [
						localizations[0]?.thickness,
						localizations[0]?.length,
						localizations[0]?.width,
				  ]
				: [thickness, length, width];

		return sizesArray.filter(value => value && value !== '').join('x');
	}, [lang, length, locale, localizations, thickness, width]);

	const removeItemFromLocal = goodId => {
		setGoods(() => {
			const localGoods = JSON.parse(localStorage.getItem('localBag'));

			return localGoods.filter(({ good }) => good.attributes.uid !== goodId);
		});
		window.dispatchEvent(new Event('storage'));
	};

	const handleCounterChange = newCount => {
		setCount(newCount);

		setGoods(prevGoods => {
			return prevGoods.map(item => {
				const flattenGood = flattenAttributes(item.good);

				return flattenGood.uid === uid ? { ...item, count: newCount } : item;
			});
		});
	};

	const deleteGoodFromServerBag = async () => {
		const goodsWithoutDeleted = goods.filter(
			({ good }) => good.data.attributes.uid !== uid
		);
		try {
			setIsExist(false);
			const url =
				process.env.NEXT_PUBLIC_STRAPI_API_URL +
				`/api/bags/${bagId}?populate=goods`;

			const response = await axios.put(
				url,
				{ data: { goods: goodsWithoutDeleted, bagPrice: bagPrice } },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response?.status !== 200) {
				setIsExist(true);
			}
		} catch (error) {
			console.error(error);
		}

		refresh();
	};

	return (
		<Grid
			style={{ filter: !isExist ? 'grayscale(1)' : null }}
			transition={'filter 1s ease'}
			templateColumns={{ base: '1fr', md: '1.2fr 1fr' }}
			alignItems={'center'}
			flexDir={{ base: 'column', md: 'row' }}
		>
			<Flex alignItems={'center'} gap={{ base: '10px', lg: '30px' }}>
				<Box w={'115px'} h={'100px'} pos={'relative'}>
					<Image
						src={
							(img && img.data && img.data[0].attributes.url) ||
							(img && img[0].url) ||
							'/img/product.png'
						}
						alt={descShort || ''}
						fill
					/>
				</Box>
				<List>
					<Heading as={'h4'} fontSize={'20px'}>
						{(locale === 'he' && lang === 'he') ||
						(locale === 'en' && lang === 'en')
							? title
							: localizations[0]?.title}
					</Heading>
					{price && <Text>{price} ₪</Text>}
					{sizes && (
						<Text textColor={'#808080'}>
							{dictionary.bag.sizes} {sizes}
						</Text>
					)}
					<Text textTransform={'capitalize'} textColor={'#808080'}>
						{(locale === 'he' && lang === 'he') ||
						(locale === 'en' && lang === 'en')
							? type
							: localizations[0]?.type}
					</Text>
				</List>
			</Flex>
			<Grid
				mt={{ base: '50px', md: '0px' }}
				templateColumns={{ base: 'repeat(2, 1fr)' }}
				w={'100%'}
				justifyContent={'center'}
			>
				<Box pos={'relative'}>
					<Counter
						count={count}
						setCount={handleCounterChange}
						isExist={isExist}
					/>
					<TotalBagPrice
						count={count}
						dictionary={dictionary}
						totalPrice={price * count}
						isCentered={true}
					/>
				</Box>
				<Flex justifyContent={'center'}>
					{hasToken ? (
						<Button
							variant="unstyled"
							bgColor="transparent"
							onClick={deleteGoodFromServerBag}
							_hover={{ bgColor: 'transparent', stroke: '#EE4B2B' }}
							display={'flex'}
							justifyContent={'center'}
							stroke={'#fff'}
							isLoading={!isExist}
							maxW="360px"
						>
							<DeleteIcon />
						</Button>
					) : (
						<Button
							variant="unstyled"
							bgColor="transparent"
							_hover={{ bgColor: 'transparent' }}
							display={'flex'}
							justifyContent={'center'}
							stroke={'#fff'}
							onClick={() => removeItemFromLocal(uid)}
						>
							<DeleteIcon />
						</Button>
					)}
				</Flex>
			</Grid>
		</Grid>
	);
};

export default ProductCard;
