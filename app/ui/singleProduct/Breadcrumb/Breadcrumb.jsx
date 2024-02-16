'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Box, Flex, Text } from '@chakra-ui/react';

import { submitGoodToFavorite } from '@/app/lib/actions';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import CallToAuth from '../../callToAuth/CallToAuth';
import HomeIcon from '../../svg/HomeIcon';
import FavBtn from '../FavBtn/FavBtn';

import { parseAsFloat, useQueryState } from 'nuqs';

const BreadcrumbBar = ({
	productTitle,
	dictionary,
	product,
	userId,
	favs,
	setFavs,
}) => {
	const pathname = usePathname();
	const pathSegments = pathname.split('/').filter(segment => segment !== '');
	const lang = pathSegments[0];
	const [isFavorite, setIsFavorite] = useState(
		favs?.some(item => item.id === product.id)
	);

	const [, favoriteAction] = useFormState(submitGoodToFavorite, null);
	const [, setFavorite] = useQueryState(
		'favs',
		parseAsFloat.withDefault(
			typeof window !== 'undefined' &&
				userId &&
				JSON.parse(localStorage.getItem('favs'))?.length
		)
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

	return (
		<>
			{pathSegments.length > 0 && (
				<Flex alignItems={'start'} fontSize={'14px'} textColor={'#A28445'}>
					<Text>
						<Link href={`/${lang}`}>
							<HomeIcon />
						</Link>
					</Text>
					{pathSegments.map((segment, index) => (
						<Box
							as="li"
							textTransform={'capitalize'}
							listStyleType={'none'}
							key={index}
						>
							{segment === 'catalog' && (
								<Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
									{dictionary.hero.btnCatalog}
								</Link>
							)}
							{index < pathSegments.length - 1 &&
								segment !== lang &&
								segment !== 'catalog' && (
									<Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
										{segment}
									</Link>
								)}
							{index === pathSegments.length - 1 && (
								<Text as={'span'} textColor={'#666'}>
									{productTitle}
								</Text>
							)}
							{index < pathSegments.length - 1 && (
								<Text as={'span'} mx={'10px'}>
									/
								</Text>
							)}
						</Box>
					))}
				</Flex>
			)}
			{userId ? (
				<form
					action={() => {
						favoriteAction({ goodId: product.id });
					}}
				>
					<FavBtn
						onClick={() => {
							setIsFavorite(!isFavorite);
							handleIsFavs(product.id);
						}}
						isFavorite={isFavorite}
					/>
				</form>
			) : (
				<CallToAuth pos={'static'} />
			)}
		</>
	);
};

export default BreadcrumbBar;
