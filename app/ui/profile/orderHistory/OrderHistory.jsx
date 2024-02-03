'use client';
import React from 'react';

import { List } from '@chakra-ui/react';

import { OrderHistoryItem } from './OrderHistoryItem';

export const OrderHistory = ({ lang, orders }) => {
	return (
		<>
			{orders &&
				orders.map((order, index) => {
					const { goods, createdAt, id } = order.attributes;
					const dateOrder = new Date(createdAt);

					return (
						<List
							key={id}
							display="flex"
							gap="30px"
							flexDirection="column"
							borderTop={index > 0 ? '1px solid #ccc' : null}
							pt={index > 0 ? '30px' : null}
							pb={index !== orders.length - 1 ? '30px' : null}
						>
							{goods.map(product => {
								const { good } = product;
								const { id } = good.data;
								if (lang === 'he') {
									const { img } = good.data.attributes;
									const { descShort, title } =
										good.data.attributes.localizations;
									const imgurl = img?.data[0].attributes.formats.thumbnail.url;

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
								}
								const { descShort, title, img } = good.data.attributes;
								const imgurl = img?.data[0].attributes.formats.thumbnail.url;

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
						</List>
					);
				})}
		</>
	);
};
