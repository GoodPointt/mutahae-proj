import { cache } from 'react';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { flattenAttributes } from '../utils/flattenAttributes';

import axios from 'axios';

export const profileInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});

const getFavorites = async () => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;
		if (!token || !userId) {
			throw new Error('Not authorized');
		}
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const response = await profileInstance.get(
			`/api/favorites?populate[0]=goods&populate[1]=goods.good&populate[2]=goods.img&filters[user][id][$eq]=${userId}`
		);

		const { data } = response.data;

		if (!data) {
			return [];
		}

		return data[0]?.attributes?.goods?.data;
	} catch (e) {
		console.error(e.message);

		return notFound();
	}
};

export const fetchFavorites = cache(getFavorites);

const getOrders = async () => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;
		if (!token || !userId) {
			throw new Error('Not authorized');
		}
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const response = await profileInstance.get(
			`/api/orders?populate=deep,4&filters[user][id][$eq]=${userId}`
		);

		const { data } = response.data;

		if (!data) {
			return [];
		}

		return data;
	} catch (e) {
		console.error(e.message);

		return notFound();
	}
};
export const fetchOrders = cache(getOrders);

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

export const changePassword = async dataPassword => {
	try {
		const token = cookies().get('jwt')?.value;

		if (!token) {
			throw new Error('Not authorized');
		}
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const { data } = await profileInstance.post(
			'/api/auth/change-password',
			dataPassword
		);

		return {
			data,
			status: 'succsess',
		};
	} catch (error) {
		console.error(error);

		return {
			status: 'error',
			message: error.message,
		};
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

const getUserDataForOrder = async () => {
	try {
		const userId = cookies().get('userId')?.value;

		if (!userId) return {};

		const data = profileInstance.get(`/api/users/${userId}`);
		if (!data) {
			return {};
		}

		return data;
	} catch (e) {
		console.error(e.message);
	}
};

export const fetchUserDataForOrder = cache(getUserDataForOrder);

const getOrderByUserId = async userId => {
	try {
		const token = cookies().get('jwt').value;

		const res = await profileInstance.get(
			`/api/orders?populate=deep,4&filters[user][id][$eq]=${userId}`,
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

export const fetchOrderByUserId = cache(getOrderByUserId);
