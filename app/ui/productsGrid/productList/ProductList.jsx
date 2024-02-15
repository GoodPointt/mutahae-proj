import { useEffect, useState } from 'react';

import { Grid } from '@chakra-ui/react';

import ProductItem from '../../productItem/ProductItem';

const ProductList = ({ list, lang, favorites }) => {
	const [favs, setFavs] = useState(
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('favs'))
			: []
	);

	useEffect(() => {
		localStorage.setItem('favs', JSON.stringify(favs || []));
	}, [favs]);

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
						favs={favs}
						setFavs={setFavs}
						favorites={favorites}
						key={product.id}
						product={product}
						lang={lang}
						// productId={id}
					/>
				))}
		</Grid>
	);
};

export default ProductList;
