import React from 'react';
import Image from 'next/image';

import { Link } from '@chakra-ui/next-js';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

// import { format } from 'date-fns';

export const OrderHistoryItem = ({
	lang,
	title,
	descShort,
	imgurl,
	uid,
	// orderNum,
	// orderPrice,
	// createdAt,
	// city,
	// user_address,
}) => {
	return (
		<Box display="flex" as={Link} href={`/${lang}/catalog/${uid}`}>
			<Flex
				flexDir={{ base: 'column', lg: 'row' }}
				justifyContent="space-between"
			>
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
			</Flex>

			<Flex flexDirection={{ base: 'column', lg: 'row' }} flex={1} gap="10px">
				<Box maxW="257px">
					<Heading as="h3" fontSize="24px" fontWeight={700}>
						{title}
					</Heading>
					<Text fontSize="14px" color="#808080">
						{descShort}
					</Text>
				</Box>
			</Flex>
		</Box>
	);
};
