'use client';

import { useEffect, useState } from 'react';

import { Grid, Heading } from '@chakra-ui/react';

import PaginationDisplay from '../../paginationDisplay/PaginationDisplay';
import ProductItem from '../../productItem/ProductItem';

export const FavoritesContent = ({
	// favorites,
	dictionary,
	lang,
}) => {
	// eslint-disable-next-line no-unused-vars
	const [favs, setFavs] = useState(
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('favs'))
			: []
	);

	const [total, setTotal] = useState(favs.length || 0);
	const [page, setPage] = useState(1);
	const [favoriteData, setFavoriteData] = useState(favs.slice(0, page * 4));

	useEffect(() => {
		const startFrom = page > 1 ? (page - 1) * 4 : 0;
		setFavoriteData(favs.slice(startFrom, page * 4));
	}, [favs, page]);

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
						// const { uid, locale, title, descShort } = good;
						// const { img } = good;

						// const imgData = {
						// 	data: [
						// 		{
						// 			attributes: {
						// 				url: img[0].url,
						// 			},
						// 		},
						// 	],
						// };

						// const localizations = good.localizations[0];

						return (
							<ProductItem
								key={good.id}
								lang={lang}
								product={good}
								// product={{
								// 	isFavorite: true,
								// 	uid,
								// 	title:
								// 		localizations && lang == 'he' ? localizations.title : title,
								// 	button: btnAdd,
								// 	img: { ...imgData },
								// 	descShort:
								// 		localizations && lang == 'he'
								// 			? localizations.descShort
								// 			: descShort,
								// }}
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
