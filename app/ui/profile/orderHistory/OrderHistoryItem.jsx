import React from 'react';
import Image from 'next/image';

import { Box, Flex, Heading, ListItem, Text } from '@chakra-ui/react';

import imgurl from '@/public/img/product.png';

export const OrderHistoryItem = ({ lang }) => {
	return (
		<ListItem display="flex">
			<Box
				w="100px"
				h="100px"
				mr={lang === 'en' && '30px'}
				ml={lang === 'he' && '30px'}
			>
				<Image src={imgurl} alt="product img" />
			</Box>
			<Flex flexDirection={{ base: 'column', lg: 'row' }} gap="10px">
				<Box maxW="257px">
					<Heading as="h3" fontSize="24px" fontWeight={700}>
						Oak Board
					</Heading>
					<Text>€160</Text>
					<Text fontSize="14px" color="#808080">
						Sizes: 20,26,40x1000x1800-3000mm, A/B/Rustic
					</Text>
				</Box>
				<Box ml={{ base: 0, lg: 'auto' }} mr={0}>
					<Text
						fontSize="14px"
						color="#808080"
						textAlign={{
							base: lang === 'he' ? 'right' : 'left',
							lg: lang === 'he' ? 'left' : 'right',
						}}
						mb="14px"
					>
						Order №0123456789, 26/01/2024
					</Text>
					<Text
						fontSize="16px"
						textAlign={{
							base: lang === 'he' ? 'right' : 'left',
							lg: lang === 'he' ? 'left' : 'right',
						}}
					>
						Delivered
					</Text>
				</Box>
			</Flex>
		</ListItem>
	);
};
