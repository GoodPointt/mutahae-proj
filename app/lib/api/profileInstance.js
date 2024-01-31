import { cache } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { flattenAttributes } from '../utils/flattenAttributes';

import axios from 'axios';

export const profileInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});

const getFavorites = async userId => {
	try {
		const token = cookies().get('jwt')?.value;
		if (!token) throw new Error('not authorized');

		const {
			data: { data },
		} = await profileInstance.get(
			`/api/favorites?populate[0]=goods&populate[1]=goods.good&populate[2]=goods.img&filters[user][id][$eq]=${userId}`
		);
		if (data.length === 0) {
			return notFound();
		}

		return data;
	} catch (e) {
		return notFound();
	}
};

export const fetchFavorites = cache(getFavorites);

const getUserData = async () => {
	try {
		const userId = cookies().get('userId')?.value;

		if (!userId) throw new Error('User id not found!');

		const data = profileInstance.get(`/api/users/${userId}`);
		if (!data) {
			return notFound();
		}

		return data;
	} catch (e) {
		console.error(e.message);

		return notFound();
	}
};

export const fetchUserData = cache(getUserData);

export const updateUserData = async userData => {
	//console.log(userData);
	try {
		const userId = cookies().get('userId')?.value;
		//console.log(userId);

		if (!userId) throw new Error('User id not found!');

		const { data } = await profileInstance.put(
			`/api/users/${userId}`,
			userData
		);

		return data;
	} catch (e) {
		console.error(e.message);

		return notFound();
	}
};

const addToBag = async (bagId, goods) => {
	try {
		const token = cookies().get('jwt').value;

		return await profileInstance.put(
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

		const res = await profileInstance.get(
			`/api/bags?populate[0]=goods&populate[1]=goods.good&populate[2]=goods.good.img&filters[user][id][$eq]=${userId}`,
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		);

		const {
			data: { data: responseData },
		} = res;

		return flattenAttributes(responseData);
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
};

export const fetchBagByUserId = cache(getBagByUserId);
