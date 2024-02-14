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
					const { goods, createdAt, id, orderPrice, city } = order.attributes;
					const dateOrder = new Date(createdAt);

					const formattedDate = format(dateOrder, 'dd/MM/yyyy', {
						timeZone: 'UTC',
					});

					const cityData = city?.data?.attributes;

					const cityHe = cityData?.localizations?.data[0]?.attributes?.cityName;

					return (
						<>
							<Flex
								key={id}
								borderTop={index > 0 ? '1px solid #ccc' : null}
								pt={index > 0 ? '30px' : null}
								pb={index !== orders.length - 1 ? '30px' : null}
							>
								<Flex gap="30px" flexDir="column" flex={1}>
									{goods &&
										goods.length > 0 &&
										goods.map(product => {
											if (!product.good.data) return;
											const { good } = product;
											const { id } = good.data;

											const { img, uid, localizations, title, descShort } =
												good.data.attributes;

											const localizData = localizations.data;

											const imgurl =
												img?.data[0].attributes.formats.thumbnail.url;

											return (
												<OrderHistoryItem
													key={id}
													lang={lang}
													title={
														localizData.length && lang == 'he'
															? localizData[0]?.attributes.title || title
															: title
													}
													imgurl={imgurl}
													descShort={
														localizData.length && lang == 'he'
															? localizData[0]?.attributes.descShort ||
															  descShort
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
										color="#808080"
										textAlign={{
											base: lang === 'he' ? 'right' : 'left',
											lg: lang === 'he' ? 'left' : 'right',
										}}
										mb="14px"
									>
										{formattedDate}
									</Text>

									{lang === 'en' && cityData && (
										<Text
											fontSize="14px"
											textAlign={{
												base: lang === 'he' ? 'right' : 'left',
												lg: lang === 'he' ? 'left' : 'right',
											}}
											mb="14px"
										>
											{cityData?.cityName}
										</Text>
									)}
									{lang === 'he' && cityHe && (
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
						</>
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
