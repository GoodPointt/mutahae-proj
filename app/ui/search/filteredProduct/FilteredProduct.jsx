'use client';

import Image from 'next/image';

import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';

const FilteredProduct = ({ product, lang }) => {
	return (
		product && (
			<Flex as="li" borderBottom={'1px solid #A28445'} pb={'25px'}>
				<Link
					href={`/${lang}/catalog/${product.uid}`}
					display={'flex'}
					gap={'30px'}
				>
					<Box
						borderRadius={'2px'}
						position="relative"
						zIndex="2"
						width="100px"
						height="100px"
						bgRepeat={'no-repeat'}
						bgPos={'center'}
						bgSize={'cover'}
					>
						{product.img.data !== null &&
							product?.img?.data.map((img, index) => (
								<Image
									key={index}
									src={img.attributes.url || '/img/product.png'}
									alt={
										product.title + '' + product.descShort || 'product image'
									}
									fill
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									style={{ objectFit: 'cover' }}
								/>
							))}
					</Box>
					<Flex flexDir={'column'} gap={'5px'}>
						<Heading as={'h3'} fontSize={'24px'} fontWeight={700}>
							{product?.title || ''}
						</Heading>
						<Box as="span" fontSize={'16px'} fontWeight={'500'}>
							€160
						</Box>
						<Text
							fontSize={'14px'}
							fontWeight={500}
							color={'#808080'}
							maxW={'257px'}
						>
							{product?.descShort || ''}
						</Text>
					</Flex>
				</Link>
			</Flex>
		)
	);
};

export default FilteredProduct;
