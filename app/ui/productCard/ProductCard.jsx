'use client';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import Image from 'next/image';

import { Box, Button, Flex, Heading, List, Text } from '@chakra-ui/react';

import { deleteProductFromBag } from '@/app/lib/actions';

import Counter from '../singleProduct/Counter/Counter';
import SubmitButton from '../submitButton/SubmitButton';
import DeleteIcon from '../svg/DeleteIcon';

const ProductCard = ({
	good,
	goods,
	goodId,
	id,
	authToken,
	setGoods,
	productCount,
}) => {
	const [count, setCount] = useState(productCount);
	const [, formAction] = useFormState(deleteProductFromBag);
	const { img, descShort, title, thickness, length, width, type } = good;

	const sizesArray = [thickness, length, width];

	const sizes = sizesArray.filter(value => value !== '').join('x');

	const removeItemFromLocal = goodId => {
		setGoods(prev => prev.filter(({ id }) => id !== goodId));
	};

	return (
		<Flex
			justifyContent={'space-between'}
			gap={{ md: '60px', lg: '120px' }}
			alignItems={'center'}
			flexDir={{ base: 'column', md: 'row' }}
		>
			<Flex alignItems={'center'}>
				<Box w={'115px'} h={'100px'} pos={'relative'}>
					<Image
						src={
							(img.data && img.data[0].attributes.url) ||
							img[0].url ||
							'/img/product.png'
						}
						alt={descShort}
						fill
					/>
				</Box>
				<List ml={{ base: '10px', lg: '30px' }}>
					<Heading as={'h4'} fontSize={'24px'}>
						{title}
					</Heading>
					<Text>€160</Text>
					<Text textColor={'#808080'}>Sizes: {sizes}</Text>
					<Text textTransform={'capitalize'} textColor={'#808080'}>
						{type}
					</Text>
				</List>
			</Flex>
			<Flex mt={'30px'} w={'100%'} justifyContent={'space-between'}>
				<Counter count={count} setCount={setCount} />
				<Flex w={'100%'} justifyContent={'center'}>
					{authToken ? (
						<form action={() => formAction({ goods, goodId, id })}>
							<SubmitButton
								variant="unstyled"
								bgColor="transparent"
								hover="transparent"
								strokeHover={'#EE4B2B'}
								display={'flex'}
								justifyContent={'center'}
								stroke={'#fff'}
							>
								<DeleteIcon />
							</SubmitButton>
						</form>
					) : (
						<Button
							variant="unstyled"
							bgColor="transparent"
							hover="transparent"
							// strokeHover={'#EE4B2B'}
							display={'flex'}
							justifyContent={'center'}
							stroke={'#fff'}
							onClick={() => removeItemFromLocal(goodId)}
						>
							<DeleteIcon />
						</Button>
					)}
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ProductCard;
