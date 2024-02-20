'use client';
import React, { useEffect, useState } from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import PaginationDisplay from '../../paginationDisplay/PaginationDisplay';

import { OrderHistoryItem } from './OrderHistoryItem';

import { format } from 'date-fns';

export const OrderHistory = ({ lang, orders }) => {
	const [total, setTotal] = useState(orders.length);
	const [page, setPage] = useState(1);
	const [ordersData, setOrdersData] = useState(orders.slice(0, page * 4));

	useEffect(() => {
		const startFrom = page > 1 ? (page - 1) * 4 : 0;
		setOrdersData(orders.slice(startFrom, page * 4));
	}, [orders, page]);

	return (
		<>
			{ordersData &&
				ordersData.length > 0 &&
				ordersData.map((order, index) => {
					const { goods, createdAt, orderPrice, city, user_address, orderNum } =
						order.attributes;

					const dateOrder = new Date(createdAt);

					const formattedDate = format(dateOrder, 'dd/MM/yyyy', {
						timeZone: 'UTC',
					});

					const cityDataDefault = city?.data?.attributes;

					const cityHe =
						cityDataDefault?.localizations?.data[0]?.attributes?.cityName;

					const cityData = user_address?.data?.attributes;

					return (
						<Flex
							key={Date.now() + Math.random()}
							borderTop={index > 0 ? '1px solid #a98841' : null}
							pt={index > 0 ? '30px' : null}
							pb={index !== orders.length - 1 ? '30px' : null}
						>
							<Flex gap="30px" flexDir="column" flex={1}>
								{goods &&
									goods.length > 0 &&
									goods.map(product => {
										if (!product.good.data) return;
										const { good } = product;

										const { img, uid, localizations, title, descShort } =
											good.data.attributes;

										const localizData = localizations.data;

										const imgurl =
											img?.data[0].attributes.formats.thumbnail.url;

										return (
											<OrderHistoryItem
												key={Date.now() + Math.random()}
												lang={lang}
												title={
													localizData.length && lang == 'he'
														? localizData[0]?.attributes.title || title
														: title
												}
												imgurl={imgurl}
												descShort={
													localizData.length && lang == 'he'
														? localizData[0]?.attributes.descShort || descShort
														: descShort
												}
												uid={uid}
											/>
										);
									})}
							</Flex>
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
										mb="14px"
									>{`${cityData.region}, ${cityData.city}, ${cityData.street}, ${cityData.app}`}</Text>
								)}

								<Text
									fontSize="14px"
									textAlign={{
										base: lang === 'he' ? 'right' : 'left',
										lg: lang === 'he' ? 'left' : 'right',
									}}
									mb="14px"
								>
									{`${orderPrice}₪`}
								</Text>
							</Box>
						</Flex>
					);
				})}
			<PaginationDisplay
				total={total}
				page={page}
				setPage={setPage}
				setTotal={setTotal}
			/>
		</>
	);
};
