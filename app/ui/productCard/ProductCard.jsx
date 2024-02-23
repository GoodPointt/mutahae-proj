'use client';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	List,
	Text,
	Tooltip,
} from '@chakra-ui/react';

import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import Counter from '../singleProduct/Counter/Counter';
import TotalBagPrice from '../singleProduct/TotalBagPrice/TotalBagPrice';
import DeleteIcon from '../svg/DeleteIcon';

const ProductCard = ({
	good,
	setGoods,
	productCount,
	setIsDeleted,
	dictionary,
	onClose,
}) => {
	const [count, setCount] = useState(productCount);

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
		setGoods(prev =>
			prev.filter(({ good }) => good.data.attributes.uid !== goodId)
		);
		setIsDeleted(true);
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
			transition={'filter 1s ease'}
			templateColumns={{ base: '1fr', md: '1.2fr 1fr' }}
			alignItems={'center'}
			flexDir={{ base: 'column', md: 'row' }}
		>
			<Tooltip
				label={dictionary.bag.tooltip}
				placement={lang === 'he' ? 'bottom-end' : 'bottom-start'}
				openDelay={300}
				left={lang === 'he' ? '10px' : '-10px'}
				fontSize={'12px'}
				bottom={'5px'}
				bgColor={'transparent'}
			>
				<Link href={`/${lang}/catalog/${uid}`} onClick={onClose}>
					<Flex
						alignItems={'center'}
						gap={{ base: '10px', lg: '30px' }}
						_hover={{ filter: 'brightness(0.8	)' }}
						transition={'filter 250ms ease'}
					>
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
							<Heading
								as={'h4'}
								fontSize={
									title.length || localizations[0]?.title.length > 30
										? '14px'
										: '20px'
								}
							>
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
				</Link>
			</Tooltip>
			<Grid
				mt={{ base: '50px', md: '0px' }}
				templateColumns={{ base: '3fr 1fr' }}
				w={'100%'}
				justifyContent={'center'}
			>
				<Box pos={'relative'}>
					<Counter
						count={count}
						setCount={handleCounterChange}
						dictionary={dictionary}
					/>
					<TotalBagPrice
						count={count}
						dictionary={dictionary}
						totalPrice={price * count}
						isCentered={true}
					/>
				</Box>
				<Flex justifyContent={'center'}>
					{
						<Button
							onClick={() => removeItemFromLocal(uid)}
							variant="unstyled"
							bgColor="transparent"
							_hover={{ bgColor: 'transparent', stroke: 'red' }}
							display={'flex'}
							justifyContent={'center'}
							stroke={'#fff'}
						>
							<DeleteIcon />
						</Button>
					}
				</Flex>
			</Grid>
		</Grid>
	);
};

export default ProductCard;
