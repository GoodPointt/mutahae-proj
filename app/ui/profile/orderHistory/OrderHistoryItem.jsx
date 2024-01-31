import React from 'react';
import Image from 'next/image';

import { Box, Flex, Heading, ListItem, Text } from '@chakra-ui/react';

import { format } from 'date-fns';

export const OrderHistoryItem = ({
	lang,
	title,
	descShort,
	imgurl,
	createdAt,
}) => {
	const date = new Date(createdAt);
	const formattedDate = format(date, 'dd/MM/yyyy', { timeZone: 'UTC' });

	return (
		<ListItem display="flex">
			<Box
				position="relative"
				w="100px"
				h="100px"
				mr={lang === 'en' && '30px'}
				ml={lang === 'he' && '30px'}
				width={100}
				height={100}
			>
				<Image fill src={imgurl} alt="product img" />
			</Box>
			<Flex flexDirection={{ base: 'column', lg: 'row' }} flex={1} gap="10px">
				<Box maxW="257px">
					<Heading as="h3" fontSize="24px" fontWeight={700}>
						{title}
					</Heading>
					<Text>€160</Text>
					<Text fontSize="14px" color="#808080">
						{descShort}
					</Text>
				</Box>
				<Box
					ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
					mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
				>
					<Text
						fontSize="14px"
						color="#808080"
						textAlign={{
							base: lang === 'he' ? 'right' : 'left',
							lg: lang === 'he' ? 'left' : 'right',
						}}
						mb="14px"
					>
						{formattedDate}
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
