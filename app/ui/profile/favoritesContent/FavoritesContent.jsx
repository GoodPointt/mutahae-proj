'use client';

import { useEffect, useState } from 'react';

import { Grid, Heading } from '@chakra-ui/react';

import PaginationDisplay from '../../paginationDisplay/PaginationDisplay';
import ProductItem from '../../productItem/ProductItem';

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
								favs={favorites}
								setFavs={setFavs}
								key={id}
								lang={lang}
								isAuth={isAuth}
								product={{
									uid,
									id: id,
									title:
										(localizations.length && lang == 'en' && locale === 'he') ||
										(localizations.length && lang == 'he' && locale === 'en')
											? localizations[0].title
											: title,
									button: btnAdd,
									img: img,
									unit: unit,
									price: price,
									descShort:
										(localizations.length && lang == 'en' && locale === 'he') ||
										(localizations.length && lang == 'he' && locale === 'en')
											? localizations[0].descShort
											: descShort,
								}}
							/>
						);
					})}
			</Grid>

			<PaginationDisplay
				total={total}
				page={page}
				setPage={setPage}
				setTotal={setTotal}
			/>
		</>
	);
};
