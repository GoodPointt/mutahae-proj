'use client';

import { useState } from 'react';

import { Flex, Grid, Heading, List, ListItem, Text } from '@chakra-ui/react';

import Btn from '../button/Btn';
import SectionWrapper from '../sectionWrapper/SectionWrapper';

import Counter from './Counter/Counter';
import SingleProductSlider from './singleProductSlider/SingleProductSlider';

const SingleProduct = ({
	dictionary,
	product: {
		img: { data: imgs },
		title,
		length,
		width,
		descLong,
		thickness,
		wood,
		type,
		manufacturer,
	},
}) => {
	const productDetails = { length, width, thickness, wood, type, manufacturer };
	const [count, setCount] = useState(1);

	return (
		<SectionWrapper>
			<Grid
				templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
				gap={'50px'}
				maxW={'100%'}
			>
				<SingleProductSlider imgs={Array.isArray(imgs) ? imgs : []} />
				<Flex flexDir={'column'} gap={2}>
					<Heading
						as="h2"
						mb={{ base: 6, lg: 8 }}
						fontSize={{ base: '2xl', lg: '4xl' }}
					>
						{title || ''}
					</Heading>
					<List>
						{Object.entries(productDetails).map(
							([option, value]) =>
								value && (
									<ListItem key={option}>
										<Text
											as="p"
											textTransform="capitalize"
											fontSize="sm"
											fontWeight="600"
										>
											{option}:
											<Text as="span" ml="4px" fontWeight="400">
												{value}
											</Text>
										</Text>
									</ListItem>
								)
						)}
					</List>
					<Grid
						templateColumns={{ base: 'repeat(2, 1fr)', lg: '1fr 2fr' }}
						gap={'10px'}
						mt={'auto'}
						alignItems={'center'}
					>
						<Counter count={count} setCount={setCount} />
						<Btn>{dictionary.buttons.bag}</Btn>
					</Grid>
				</Flex>
			</Grid>
			{descLong && (
				<>
					<Heading
						as="h2"
						mb={{ base: 6, lg: 8 }}
						mt={'60px'}
						fontSize={{ base: '2xl', lg: '4xl' }}
					>
						{dictionary.singleProduct.description}
					</Heading>
					<Text as="p" fontWeight={'400'}>
						{descLong}
					</Text>
				</>
			)}
		</SectionWrapper>
	);
};

export default SingleProduct;
