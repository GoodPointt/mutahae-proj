import { cache } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import axios from 'axios';

export const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});
instance.defaults.headers.authorization = `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`;

const getFavorites = async userId => {
	try {
		const token = cookies().get('jwt')?.value;
		if (!token) throw new Error('not authorized');

		const {
			data: { data },
		} = await instance.get(
			`/api/favorites?populate[0]=goods&populate[1]=goods.good&populate[2]=goods.img&filters[user][id][$eq]=${userId}`
		);
		if (data.length === 0) {
			return notFound();
		}

		return data;
	} catch (e) {
		if (e.data === undefined) {
			return notFound();
		}
	}
};

export const fetchFavorites = cache(getFavorites);

const addToBag = async (bagId, goods) => {
	try {
		const token = cookies().get('jwt').value;

		return await instance.put(
			`/api/bags/${bagId}?populate=goods`,
			{
				data: {
					goods: [...goods],
				},
			},
			{
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				},
				cache: 'no-cache',
			}
		);
	} catch (error) {
		console.error(error);

		return { error: error.message };
	}
};

export const fetchAddToBag = cache(addToBag);

const getBagByUserId = async userId => {
	try {
		const token = cookies().get('jwt').value;

		return await instance.get(
			`/api/bags?populate[0]=goods&populate[1]=goods.good&populate[2]=goods.good.img&filters[user][id][$eq]=${userId}`,
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		);
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
};

export const fetchBagByUserId = cache(getBagByUserId);
