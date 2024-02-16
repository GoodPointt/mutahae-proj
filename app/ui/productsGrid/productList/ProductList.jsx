import { useEffect, useState } from 'react';

import { Grid } from '@chakra-ui/react';

import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import ProductItem from '../../productItem/ProductItem';

const ProductList = ({ list, lang, isAuth }) => {
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
						isAuth={isAuth}
						favs={favs}
						setFavs={setFavs}
						key={product.id}
						product={flattenAttributes(product)}
						lang={lang}
					/>
				))}
		</Grid>
	);
};

export default ProductList;
