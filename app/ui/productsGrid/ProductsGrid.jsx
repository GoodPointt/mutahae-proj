import { Grid } from '@chakra-ui/react';

import ProductItem from '../productItem/ProductItem';
import SectionWrapper from '../sectionWrapper/SectionWrapper';

const ProductsGrid = ({ products, lang, heading }) => {
	return (
		<SectionWrapper
			heading={heading}
			bg={'linear-gradient(to right, #434343 0%, black 100%)'}
		>
			<Grid
				as={'ul'}
				maxW={'100%'}
				gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
				gridGap={10}
				m={'0 auto'}
				padding={0}
			>
				{products?.length > 0 &&
					products.map(({ attributes }) => {
						return (
							<ProductItem
								key={attributes.uid}
								product={attributes}
								lang={lang}
							/>
						);
					})}
			</Grid>
		</SectionWrapper>
	);
};

export default ProductsGrid;
