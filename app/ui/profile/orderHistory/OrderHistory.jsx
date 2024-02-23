'use client';
import React, { useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/react';

import PaginationDisplay from '../../paginationDisplay/PaginationDisplay';

import { OrderHistoryItem } from './OrderHistoryItem';

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

					return (
						<Flex
							key={Date.now() + Math.random()}
							borderTop={index > 0 ? '1px solid #a98841' : null}
							pt={index > 0 ? '30px' : null}
							pb={index !== orders.length - 1 ? '30px' : null}
							//flexDir={{ base: 'column', lg: 'row' }}
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
												orderNum={orderNum}
												orderPrice={orderPrice}
												createdAt={createdAt}
												city={city}
												user_address={user_address}
											/>
										);
									})}
							</Flex>
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
