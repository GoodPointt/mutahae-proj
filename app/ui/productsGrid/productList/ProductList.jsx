import { useEffect, useState } from 'react';

import { Center, Grid, Text } from '@chakra-ui/react';

import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import ProductItem from '../../productItem/ProductItem';

const ProductList = ({
	list,
	lang,
	isAuth,
	setCallbackPath,
	isLoading,
	dictionary,
}) => {
	const [favs, setFavs] = useState(
		typeof window !== 'undefined' && isAuth
			? JSON.parse(localStorage.getItem('favs'))
			: []
	);

	useEffect(() => {
		localStorage.setItem('favs', JSON.stringify(favs || []));
	}, [favs]);

	if (!isLoading && list.length === 0) {
		return (
			<Center h={'300px'}>
				<Text color={'red'}>{dictionary.searchField.noResultText}</Text>
			</Center>
		);
	} else
		return (
			<Grid
				as={'ul'}
				maxW={'100%'}
				gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
				gridGap={10}
				m={'0 auto'}
				mb={'2.5rem'}
				padding={0}
			>
				{list &&
					list.map(product => (
						<ProductItem
							isAuth={isAuth}
							favs={favs}
							setFavs={setFavs}
							key={product.id}
							product={flattenAttributes(product)}
							lang={lang}
							setCallbackPath={setCallbackPath}
						/>
					))}
			</Grid>
		);
};

export default ProductList;
