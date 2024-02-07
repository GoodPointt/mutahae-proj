import { Grid } from '@chakra-ui/react';

import ProductItem from '../../productItem/ProductItem';
import SkeletotonClientProductGrid from '../../skeletons/SkeletotonClientProductGrid';

const ProductList = ({ list, lang, isLoading }) => {
	if (isLoading) return <SkeletotonClientProductGrid />;

	if (!isLoading)
		return (
			<Grid
				as={'ul'}
				maxW={'100%'}
				gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
				gridGap={10}
				m={'0 auto'}
				padding={0}
			>
				{list &&
					list.map(async ({ attributes }) => {
						return (
							<ProductItem
								key={attributes.uid}
								product={attributes}
								lang={lang}
							/>
						);
					})}
			</Grid>
		);
};

export default ProductList;
