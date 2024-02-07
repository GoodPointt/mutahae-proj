'use client';
import React from 'react';

import { Box, Flex, Text } from '@chakra-ui/react';

import { OrderHistoryItem } from './OrderHistoryItem';

import { format } from 'date-fns';

export const OrderHistory = ({ lang, orders }) => {
	return (
		<>
			{orders &&
				orders.length > 0 &&
				orders.map((order, index) => {
					const { goods, createdAt, id, orderPrice, city } = order.attributes;
					const dateOrder = new Date(createdAt);

					const formattedDate = format(dateOrder, 'dd/MM/yyyy', {
						timeZone: 'UTC',
					});

					const {
						data: {
							attributes: { cityName, localizations },
						},
					} = city;

					const cityHe = localizations?.data[0]?.attributes?.cityName;

					return (
						<Flex
							key={id}
							borderTop={index > 0 ? '1px solid #ccc' : null}
							pt={index > 0 ? '30px' : null}
							pb={index !== orders.length - 1 ? '30px' : null}
						>
							<Flex gap="30px" flexDir="column">
								{goods &&
									goods.length > 0 &&
									goods.map(product => {
										if (!product.good.data) return;
										const { good } = product;
										const { id } = good.data;
										if (lang === 'he') {
											const { img } = good.data.attributes;
											const { descShort, title } =
												good.data.attributes.localizations;
											const imgurl =
												img?.data[0].attributes.formats.thumbnail.url;

											return (
												<OrderHistoryItem
													key={id}
													lang={lang}
													title={title}
													imgurl={imgurl}
													descShort={descShort}
												/>
											);
										}
										const { descShort, title, img } = good.data.attributes;
										const imgurl =
											img?.data[0].attributes.formats.thumbnail.url;

										return (
											<OrderHistoryItem
												key={id}
												lang={lang}
												title={title}
												imgurl={imgurl}
												descShort={descShort}
												createdAt={dateOrder}
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
								<Text
									fontSize="14px"
									textAlign={{
										base: lang === 'he' ? 'right' : 'left',
										lg: lang === 'he' ? 'left' : 'right',
									}}
									mb="14px"
								>
									{lang === 'he' ? cityHe : cityName}
								</Text>
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
		</>
	);
};
