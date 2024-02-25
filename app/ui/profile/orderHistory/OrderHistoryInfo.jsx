import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { format } from 'date-fns';

const OrderHistoryInfo = ({
	createdAt,
	orderPrice,
	city,
	user_address,
	orderNum,
	lang,
}) => {
	const dateOrder = new Date(createdAt);

	const formattedDate = format(dateOrder, 'dd/MM/yyyy', {
		timeZone: 'UTC',
	});

	const cityDataDefault = city?.data?.attributes;

	const cityHe = cityDataDefault?.localizations?.data[0]?.attributes?.cityName;

	const cityData = user_address?.data?.attributes;

	return (
		<Flex
			justifyContent={'space-between'}
			width={'100%'}
			alignItems={'start'}
			mb={'14px'}
			flex={1}
		>
			<Text
				display={{ base: 'block', lg: 'none' }}
				fontSize="24px"
				textAlign={{
					base: lang === 'he' ? 'right' : 'left',
					lg: lang === 'he' ? 'left' : 'right',
				}}
				lineHeight={1}
			>
				{`${orderPrice}₪`}
			</Text>
			<Box
				ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
				mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
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
	);
};

export default OrderHistoryInfo;
