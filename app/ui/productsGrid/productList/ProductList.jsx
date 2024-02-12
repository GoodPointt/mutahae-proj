import { Grid } from '@chakra-ui/react';

import ProductItem from '../../productItem/ProductItem';

const ProductList = ({ list, lang, favorites }) => {
	// if (!isLoading)

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
				list.map(({ id, attributes }) => {
					return (
						<ProductItem
							favorites={favorites}
							key={attributes.uid}
							product={attributes}
							lang={lang}
							productId={id}
						/>
					);
				})}
		</Grid>
	);
};

export default ProductList;
