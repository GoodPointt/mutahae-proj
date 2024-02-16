'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';

import { Box, Button, Heading, Text, useMediaQuery } from '@chakra-ui/react';

import { submitGoodToFavorite } from '@/app/lib/actions';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import CallToAuth from '../callToAuth/CallToAuth';
import FavBtn from '../singleProduct/FavBtn/FavBtn';

import { parseAsFloat, useQueryState } from 'nuqs';

const ProductItem = ({ product, lang, favs, setFavs, isAuth = false }) => {
	const [isModileScreen] = useMediaQuery('(max-width: 1024px)');
	const [isFavorite, setIsFavorite] = useState(
		favs?.some(item => item.id === product.id)
	);

	const [, formAction] = useFormState(submitGoodToFavorite, null);

	const [, setFavorite] = useQueryState(
		'favs',
		parseAsFloat.withDefault(JSON.parse(localStorage.getItem('favs'))?.length)
	);

	const handleIsFavs = productId => {
		const isExisting = favs.some(item => item.id === productId);

		if (!isExisting) {
			setFavs(prev => [...prev, flattenAttributes(product)]);
			setFavorite(prev => prev + 1);
		} else {
			setFavs(favs.filter(({ id }) => id !== productId));
			setFavorite(prev => prev - 1);
		}
	};

	const [firstImageUrl] = (product?.img || [])
		.map(({ url }) => url)
		.filter(url => url);

	const [sumbnailImageUrl] = (product?.img || [])
		.map(({ formats }) => formats.thumbnail.url)
		.filter(url => url);

	return (
		<Box
			as={'li'}
			key={product.uid}
			shadow={'dark-lg'}
			position={'relative'}
			borderRadius={'2px'}
			overflow="hidden"
			css={{
				'&:hover .product_card': {
					transform: 'scale(1.03)',
					transition: 'all 500ms, filter 500ms ease-in-out',
					filter: 'brightness(100%)',
				},
			}}
		>
			<Link href={`/${lang}/catalog/${product.uid}`}>
				<article>
					<Box
						borderRadius={'2px'}
						className="product_card"
						filter={isModileScreen ? 'brightness(100%)' : 'brightness(80%)'}
						position="relative"
						z-index="2"
						width="100%"
						height="360px"
						transition="all 500ms cubic-bezier(0.4, 0, 0.2, 1)"
						bgImage={`url(${sumbnailImageUrl})` || 'url(/img/product.png)'}
						bgRepeat={'no-repeat'}
						bgPos={'center'}
						bgSize={'cover'}
						_hover={{
							cursor: 'pointer',
							transition: 'all 500ms ease-in-out',
						}}
						css={{
							'&::after': {
								content: "''",
								width: '100%',
								height: '100%',
								position: 'absolute',
								background:
									'linear-gradient(0deg, rgba(0,0,0,0.7) 15%, rgba(252,176,69,0) 50%, rgba(252,176,69,0) 70%, rgba(0,0,0,0.8) 100%)',
							},
						}}
					>
						<Image
							src={product.imgUrl || firstImageUrl || '/img/product.png'}
							alt={product.title + '' + product.descShort || 'product image'}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							style={{ objectFit: 'cover' }}
						/>
					</Box>
					<Box
						borderRadius={'2px'}
						position={'absolute'}
						top="0"
						zIndex={'2'}
						width={'100%'}
						height={'100%'}
						display={'flex'}
						justifyContent={'flex-end'}
						flexDir={'column'}
						pt={'16px'}
						gap={4}
					>
						<Heading color={'#fff'} fontSize={'24'} mx={4}>
							{product?.title || ''}
						</Heading>

						<Text color={'#fff'} fontSize={'14'} mx={4}>
							{product?.descShort || ''}
						</Text>

						<Button
							variant={'solid'}
							bgColor={'#a28445'}
							color={'white'}
							transition={'all 0.3s'}
							_hover={{ bgColor: '#81672e' }}
							borderTopRadius={0}
							borderBottomRadius={'2px'}
							aria-label={product?.button || `buy ${product?.title}`}
							textShadow={'4px 3px 5px rgba(0,  0,  0, 0.83)'}
						>
							{(product?.price &&
								product?.price !== 0 &&
								`${product?.price} ₪`) ||
								''}

							{product?.price && product?.unit && ` / ${product?.unit}`}
						</Button>
					</Box>
				</article>
			</Link>
			{isAuth ? (
				<form
					action={() => {
						formAction({ goodId: product.id });
					}}
				>
					<FavBtn
						position={'absolute'}
						top={'0px'}
						right={'0px'}
						zIndex={'10'}
						onClick={() => {
							setIsFavorite(!isFavorite);
							handleIsFavs(product.id);
						}}
						isFavorite={isFavorite}
					/>
				</form>
			) : (
				<CallToAuth />
			)}
		</Box>
	);
};

export default ProductItem;
