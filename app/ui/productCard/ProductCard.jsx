'use client';
import React, { useCallback, useState } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { Box, Button, Flex, Grid, Heading, List, Text } from '@chakra-ui/react';

import { deleteProductFromBag } from '@/app/lib/actions';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import Counter from '../singleProduct/Counter/Counter';
import TotalBagPrice from '../singleProduct/TotalBagPrice/TotalBagPrice';
import SubmitButton from '../submitButton/SubmitButton';
import DeleteIcon from '../svg/DeleteIcon';

const ProductCard = ({ good, hasToken, setGoods, productCount, bagPrice }) => {
	const [count, setCount] = useState(productCount);
	const [, formAction] = useFormState(deleteProductFromBag);
	const {
		id,
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

	const sizes = useCallback(() => {
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

	return (
		<Grid
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
					<Heading as={'h4'} fontSize={'24px'}>
						{(locale === 'he' && lang === 'he') ||
						(locale === 'en' && lang === 'en')
							? title
							: localizations[0]?.title}
					</Heading>
					{price && <Text>{price}₪</Text>}
					{sizes() && <Text textColor={'#808080'}>Sizes: {sizes()}</Text>}
					<Text textTransform={'capitalize'} textColor={'#808080'}>
						{(locale === 'he' && lang === 'he') ||
						(locale === 'en' && lang === 'en')
							? type
							: localizations[0]?.type}
					</Text>
				</List>
			</Flex>
			<Grid
				mt={{ base: '30px', md: '0px' }}
				templateColumns={{ base: 'repeat(2, 1fr)' }}
				w={'100%'}
				justifyContent={'center'}
			>
				<Box pos={'relative'}>
					<Counter count={count} setCount={handleCounterChange} />
					<TotalBagPrice
						count={count}
						totalPrice={price * count}
						isCentered={true}
					/>
				</Box>
				<Flex justifyContent={'center'}>
					{hasToken ? (
						<form
							action={() =>
								formAction({ goodId: id, bagPrice: bagPrice - price * count })
							}
						>
							<SubmitButton
								variant="unstyled"
								bgColor="transparent"
								hover="transparent"
								strokeHover={'#EE4B2B'}
								display={'flex'}
								justifyContent={'center'}
								stroke={'#fff'}
								maxW="360px"
							>
								<DeleteIcon />
							</SubmitButton>
						</form>
					) : (
						<Button
							variant="unstyled"
							bgColor="transparent"
							hover="transparent"
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
