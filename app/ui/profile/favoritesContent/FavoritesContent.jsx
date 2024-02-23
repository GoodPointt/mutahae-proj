'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';

import PaginationDisplay from '../../paginationDisplay/PaginationDisplay';
import ProductItem from '../../productItem/ProductItem';
import ArrowLeft from '../../svg/ArrowLeft';
import ArrowRight from '../../svg/ArrowRight';

export const FavoritesContent = ({ dictionary, lang, isAuth }) => {
	const [favorites, setFavs] = useState(
		isAuth && typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('favs'))
			: []
	);

	useEffect(() => {
		localStorage.setItem('favs', JSON.stringify(favorites || []));
	}, [favorites]);

	const [page, setPage] = useState(1);
	const [favoriteData, setFavoriteData] = useState(
		favorites.slice(0, page * 4)
	);
	const [total, setTotal] = useState(favorites.length || 0);

	useEffect(() => {
		const startFrom = page > 1 ? (page - 1) * 4 : 0;

		if (favorites.length > 0 && favorites.length === startFrom)
			setPage(prevState => prevState - 1);
		setFavoriteData(favorites.slice(startFrom, page * 4));

		setTotal(favorites.length);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, favorites]);

	// eslint-disable-next-line no-unused-vars
	const { title, btnAdd } = dictionary.profile.favorites;

	return (
		<>
			<Heading
				as="h2"
				mb={{ base: 6, lg: 8 }}
				fontSize={{ base: '2xl', lg: '4xl' }}
			>
				{title}
			</Heading>
			{favoriteData.length > 0 ? (
				<Grid
					as={'ul'}
					maxW={'100%'}
					gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
					gridGap={10}
					m={'0 auto'}
					padding={0}
					mb="50px"
				>
					{favoriteData &&
						favoriteData.map(good => {
							const { id, uid, locale, title, descShort, unit, price } = good;
							const { img } = good;

							const localizations = good?.localizations || [];

							return (
								<ProductItem
									dictionary={dictionary}
									favs={favorites}
									setFavs={setFavs}
									key={id}
									lang={lang}
									isAuth={isAuth}
									product={{
										uid,
										id: id,
										title:
											(localizations.length &&
												lang == 'en' &&
												locale === 'he') ||
											(localizations.length && lang == 'he' && locale === 'en')
												? localizations[0].title
												: title,
										button: btnAdd,
										img: img,
										unit: unit,
										price: price,
										descShort:
											(localizations.length &&
												lang == 'en' &&
												locale === 'he') ||
											(localizations.length && lang == 'he' && locale === 'en')
												? localizations[0].descShort
												: descShort,
									}}
								/>
							);
						})}
				</Grid>
			) : (
				<Flex
					flexDir={{ base: 'column', md: 'row' }}
					gap={'30px'}
					justifyContent={{ base: 'center', md: 'start' }}
					alignItems={'center'}
					pb={0}
				>
					<Text textAlign={'center'}>{dictionary.profile.favorites.empty}</Text>
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

			<PaginationDisplay
				total={total}
				page={page}
				setPage={setPage}
				setTotal={setTotal}
			/>
		</>
	);
};
