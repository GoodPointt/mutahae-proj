'use client';

import { useState } from 'react';
import Image from 'next/image';

import Counter from '@/app/ui/singleProduct/Counter/Counter';
import SubmitButton from '@/app/ui/submitButton/SubmitButton';

import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react';

import DeleteIcon from '../../../svg/DeleteIcon';

const ProductToBuy = ({ good, goodId, authToken, setGoods, productCount }) => {
	const [count, setCount] = useState(productCount);
	const { img, descShort, title, thickness, length, width, type } = good;

	const sizesArray = [thickness, length, width];
	const sizes = sizesArray.filter(value => value !== '').join('x');

	const removeItemFromLocal = goodId => {
		setGoods(prev => prev.filter(({ id }) => id !== goodId));
	};

	return (
		<>
			<Flex gap={'30px'}>
				<Box
					borderRadius={'2px'}
					position="relative"
					width="100px"
					height="100px"
					bgRepeat={'no-repeat'}
					bgPos={'center'}
					bgSize={'cover'}
				>
					<Image
						src={
							(img?.data && img?.data[0].attributes.url) ||
							img[0].url ||
							'/img/product.png'
						}
						alt={descShort}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						style={{ objectFit: 'cover' }}
					/>
				</Box>
				<Flex flexDir={'column'} gap={'5px'} marginRight={'30px'}>
					<Heading as={'h3'} fontSize={'24px'} fontWeight={700}>
						{title}
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
						Sizes: {sizes}
					</Text>
					<Text textTransform={'capitalize'} textColor={'#808080'}>
						{type}
					</Text>
				</Flex>
			</Flex>
			<Flex gap={'30px'}>
				<Counter count={count} setCount={setCount} />
				{authToken ? (
					<SubmitButton
						variant="unstyled"
						bgColor="transparent"
						_hover={{ bgColor: 'transparent' }}
						strokeHover={'#EE4B2B'}
						display={'flex'}
						justifyContent={'center'}
						stroke={'#fff'}
					>
						<DeleteIcon />
					</SubmitButton>
				) : (
					<IconButton
						variant="unstyled"
						bgColor="transparent"
						_hover={{ bgColor: 'transparent' }}
						display={'flex'}
						justifyContent={'center'}
						stroke={'#fff'}
						onClick={() => removeItemFromLocal(goodId)}
					>
						<DeleteIcon />
					</IconButton>
				)}
			</Flex>
		</>
	);
};

export default ProductToBuy;
