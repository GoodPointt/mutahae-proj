'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { Box, Button, Flex, List, ListItem } from '@chakra-ui/react';

import './singleProductSlider.css';

const SingleProductSlider = ({ imgs }) => {
	const startImg = imgs.length !== 0 ? imgs[0].attributes.url : null;
	const thumbnailImg =
		imgs.length !== 0 ? imgs[0].attributes.formats.thumbnail.url : null;
	const [currentImg, setCurrentImg] = useState(startImg);

	return (
		<Flex
			gap={'10px'}
			display={{ base: 'block', md: 'flex' }}
			flexDir={'row-reverse'}
			maxW={'100%'}
		>
			<Box
				w={'100%'}
				h={{ base: '320px', sm: '450px' }}
				pos={'relative'}
				mb={{ base: '10px', lg: 0 }}
				bgImage={`url(${thumbnailImg})`}
				bgRepeat={'no-repeat'}
				bgPos={'center'}
				bgSize={'cover'}
			>
				<Image
					src={currentImg || '/img/product.png'}
					alt="img"
					fill
					style={{ objectFit: 'cover' }}
				/>
			</Box>

			{Array.isArray(imgs) && imgs.length > 1 && (
				<List
					display={'flex'}
					maxHeight={'450px'}
					maxW={'100%'}
					flexDir={{ base: 'row', md: 'column' }}
					gap={'10px'}
					overflow={'auto'}
					className="list"
				>
					{imgs.map(({ id, attributes: img }) => (
						<ListItem key={id}>
							<Button
								w={'80px'}
								h={'80px'}
								borderRadius={0}
								border={
									currentImg === img.url
										? '2px rgb(162, 132, 69) solid'
										: 'none'
								}
								_hover={{
									bg: currentImg === img.url ? 'rgba(0,0,0, 0.5)' : 'inherit',
								}}
								bg={currentImg === img.url ? 'rgba(0,0,0, 0.5)' : ''}
								onClick={() => setCurrentImg(img.url)}
							>
								<Image
									src={img.url}
									alt={img.name}
									fill
									style={{
										objectFit: 'cover',
										zIndex: '-1',
									}}
								/>
							</Button>
						</ListItem>
					))}
				</List>
			)}
		</Flex>
	);
};

export default SingleProductSlider;
