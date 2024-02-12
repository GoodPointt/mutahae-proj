'use client';

import { useEffect, useState } from 'react';

import { Grid, Heading } from '@chakra-ui/react';

import PaginationDisplay from '../../paginationDisplay/PaginationDisplay';
import ProductItem from '../../productItem/ProductItem';

export const FavoritesContent = ({ favorites, dictionary, lang }) => {
	const [total, setTotal] = useState(favorites.length);
	const [page, setPage] = useState(1);
	const [favoriteData, setFavoriteData] = useState(
		favorites.slice(0, page * 4)
	);

	useEffect(() => {
		const startFrom = page > 1 ? (page - 1) * 4 : 0;
		setFavoriteData(favorites.slice(startFrom, page * 4));
	}, [favorites, page]);

	return (
		<>
			<Heading
				as="h2"
				mb={{ base: 6, lg: 8 }}
				fontSize={{ base: '2xl', lg: '4xl' }}
			>
				{dictionary.profile.favorites.title}
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
						const { uid, locale, title, descShort } = good;
						const { img } = good;

						const imgData = {
							data: [
								{
									attributes: {
										url: img[0].url,
									},
								},
							],
						};

						if (lang === 'en' && locale === 'he') return;

						if (lang === 'en' && locale === 'en') {
							return (
								<ProductItem
									lang={locale}
									product={{
										isFavorite: true,
										uid,
										title: title,
										button: 'Add To Bag',
										img: { ...imgData },
										descShort: descShort,
									}}
									key={uid}
								/>
							);
						}
						if (lang === 'he' && locale === 'he') {
							return (
								<ProductItem
									lang={locale}
									product={{
										isFavorite: true,
										uid,
										title: title,
										button: 'להוסיף לתיק',
										img: { ...imgData },
										descShort: descShort,
									}}
									key={uid}
								/>
							);
						}
					})}
				{favorites &&
					lang === 'he' &&
					favorites.map(good => {
						const { uid, locale } = good;

						if (!good.localizations.length) return;

						const { title: title_he, descShort: descShort_he } =
							good.localizations[0];
						const { img } = good;

						const imgData = {
							data: [
								{
									attributes: {
										url: img[0].url,
									},
								},
							],
						};

						return (
							<ProductItem
								lang={locale}
								product={{
									isFavorite: true,
									uid,
									title: title_he,
									button: 'להוסיף לתיק',
									img: { ...imgData },
									descShort: descShort_he,
								}}
								key={uid}
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
