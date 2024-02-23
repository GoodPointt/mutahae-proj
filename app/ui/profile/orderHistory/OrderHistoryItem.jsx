import React from 'react';
import Image from 'next/image';

import { Link } from '@chakra-ui/next-js';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

import { format } from 'date-fns';

export const OrderHistoryItem = ({
	lang,
	title,
	descShort,
	imgurl,
	uid,
	orderNum,
	orderPrice,
	createdAt,
	city,
	user_address,
}) => {
	const dateOrder = new Date(createdAt);

	const formattedDate = format(dateOrder, 'dd/MM/yyyy', {
		timeZone: 'UTC',
	});

	const cityDataDefault = city?.data?.attributes;

	const cityHe = cityDataDefault?.localizations?.data[0]?.attributes?.cityName;

	const cityData = user_address?.data?.attributes;

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

				<Text
					display={{ base: 'block', lg: 'none' }}
					fontSize="24px"
					textAlign={{
						base: lang === 'he' ? 'right' : 'left',
						lg: lang === 'he' ? 'left' : 'right',
					}}
					lineHeight={1}
					mt="14px"
				>
					{`${orderPrice}₪`}
				</Text>
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
				<Box
					ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
					mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
					my="auto"
				>
					<Text
						fontSize="14px"
						textAlign={{
							base: lang === 'he' ? 'right' : 'left',
							lg: lang === 'he' ? 'left' : 'right',
						}}
						mb={{ base: '14px', lg: 0 }}
					>
						<Box as={'span'} display={lang === 'he' ? 'none' : 'inline'}>
							№{' '}
						</Box>
						{orderNum?.trim()}
						<Box as={'span'} display={lang !== 'he' ? 'none' : 'inline'}>
							{' '}
							№
						</Box>
					</Text>
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

					{!cityData ? (
						(lang === 'en' && cityDataDefault && (
							<Text
								fontSize="14px"
								textAlign={{
									base: lang === 'he' ? 'right' : 'left',
									lg: lang === 'he' ? 'left' : 'right',
								}}
								mb="14px"
							>
								{cityDataDefault?.cityName}
							</Text>
						)) ||
						(lang === 'he' && cityHe && (
							<Text
								fontSize="14px"
								textAlign={{
									base: lang === 'he' ? 'right' : 'left',
									lg: lang === 'he' ? 'left' : 'right',
								}}
								mb="14px"
							>
								{cityHe}
							</Text>
						))
					) : (
						<Text
							fontSize="14px"
							textAlign={{
								base: lang === 'he' ? 'right' : 'left',
								lg: lang === 'he' ? 'left' : 'right',
							}}
							mb={{ base: 0, lg: '14px' }}
						>{`${cityData.region}, ${cityData.city}, ${cityData.street}, ${cityData.app}`}</Text>
					)}

					<Text
						display={{ base: 'none', lg: 'block' }}
						fontSize="14px"
						textAlign={{
							base: lang === 'he' ? 'right' : 'left',
							lg: lang === 'he' ? 'left' : 'right',
						}}
					>
						{`${orderPrice}₪`}
					</Text>
				</Box>
			</Flex>
		</Box>
	);
};
