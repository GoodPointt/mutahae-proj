import ProductItem from '../../../ui/productItem/ProductItem';

import { Grid, Heading } from '@chakra-ui/react';

import { fetchFavorites } from '../../../lib/api/profileInstance';
import { getDictionary } from '../../../lib/locales/dictionary';

const Favorites = async ({ params: { lang } }) => {
	const favorites = await fetchFavorites();
	const dictionary = await getDictionary(lang);

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
			>
				{favorites &&
					favorites[0].goods.map(good => {
						const { uid, locale, title, descShort } = good;
						const { title: title_he, descShort: descShort_he } =
							good.localizations[0];
						const { img } = good;

						const imgUrl = img[0].formats.small.url;

						return (
							<ProductItem
								lang={locale}
								product={{
									isFavorite: true,
									uid,
									title: lang === 'he' ? title_he : title,
									button: 'Add To Bag',
									imgUrl,
									descShort: lang === 'he' ? descShort_he : descShort,
								}}
								key={uid}
							/>
						);
					})}
			</Grid>
		</>
	);
};

export default Favorites;
