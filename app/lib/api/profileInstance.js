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
			`/api/favorites?populate[0]=goods&populate[1]=goods.good&populate[2]=goods.img&populate[3]=goods.localizations&filters[user][id][$eq]=${userId}`
		);

		const data = flattenAttributes(response?.data?.data);

		if (!data) {
			return [];
		}

		return data;
	} catch (e) {
		console.error(e.message);

		return notFound();
	}
};

export const fetchFavorites = cache(getFavorites);

const handleFavorites = async goodId => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;

		if (!token || !userId) {
			throw new Error('Not authorized');
		}
		const favorites = await getFavorites();

		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const flattenFavorites = flattenAttributes(favorites[0].goods);

		const isSame = flattenFavorites.some(item => item.id === goodId);

		const body = isSame
			? [...flattenFavorites.filter(item => item.id !== goodId)]
			: [...flattenFavorites, goodId];

		const response = await profileInstance.put(
			`/api/favorites/${favorites[0].id}?populate=goods`,
			{
				data: { goods: body, user: userId },
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		return flattenAttributes(response);
	} catch (error) {
		console.error(error.message);

		return notFound();
	}
};

export const fetchHandleFavorites = cache(handleFavorites);

const isFavorite = async goodId => {
	try {
		const response = await fetchFavorites();

		const favorites = flattenAttributes(response[0].goods);

		return favorites.some(good => good.id === goodId);
	} catch (error) {
		console.error(error.message);

		return notFound();
	}
};

export const fetchIsFavorite = cache(isFavorite);

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
	try {
		const userId = cookies().get('userId')?.value;

		if (!userId) throw new Error('User id not found!');

		const { data } = await profileInstance.put(
			`/api/users/${userId}`,
			userData
		);

		return {
			data,
			status: 'success',
		};
	} catch (error) {
		console.error(error.message);

		return {
			status: 'error',
			message: error.message,
		};
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
			status: 'success',
		};
	} catch (error) {
		console.error(error);

		return {
			status: 'error',
			message: error.message,
		};
	}
};

export const addUserAddress = async dataAddress => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;

		if (!token || !userId) {
			throw new Error('Not authorized');
		}
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const { data } = await profileInstance.post('/api/user-addresses', {
			data: {
				user: userId,
				...dataAddress,
			},
		});
		if (!data) throw new Error('Failed to add user address.');

		return {
			data,
			status: 'success',
		};
	} catch (error) {
		console.error(error);

		return {
			status: 'error',
			message: error.message,
		};
	}
};

export const deleteUserAddress = async addressId => {
	try {
		const token = cookies().get('jwt')?.value;

		if (!token) {
			throw new Error('Not authorized');
		}
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		await profileInstance.delete(`/api/user-addresses/${addressId}`);

		return {
			status: 'success',
		};
	} catch (error) {
		return {
			status: 'error',
			message: error.message,
		};
	}
};

export const getUserAddress = async () => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;

		if (!token || !userId) {
			throw new Error('Not authorized');
		}
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const data = profileInstance.get(
			`/api/user-addresses?filters[user][id][$eq]=${userId}`
		);

		if (!data) {
			throw new Error(
				'Failed to fetch user address. An error occurred while retrieving the address data.'
			);
		}

		return data;
	} catch (e) {
		console.error(e.message);
	}
};

export const fetchUserAddress = cache(getUserAddress);

const getBagByUserId = async () => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;

		const res = await profileInstance.get(
			`/api/bags?populate[0]=goods&populate[1]=goods.good&populate[2]=goods.good.img&populate[3]=goods.good.localizations&filters[user][id][$eq]=${userId}`,
			{
				headers: {
					Authorization: 'Bearer ' + token,
				},
			}
		);

		const {
			data: { data: goodsInBagData },
		} = res;

		return flattenAttributes(goodsInBagData);
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
};

export const fetchBagByUserId = cache(getBagByUserId);

const createOrder = async (totalPrice, goods, deliveryAddress) => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		return await profileInstance.post(
			'/api/orders',
			{
				data: {
					user: userId,
					goods: goods,
					orderPrice: totalPrice,
					city: deliveryAddress,
				},
			},
			{
				headers: {
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

export const fetchCreateOrder = cache(createOrder);

const addToBag = async (count, goodId, bagPrice) => {
	try {
		const token = cookies().get('jwt')?.value;

		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const response = await fetchBagByUserId();

		const goodsInBag = flattenAttributes(response[0].goods);

		let body = [];

		const isSame = goodsInBag.some(({ good }) => good.data.id === goodId);

		if (isSame) {
			body = goodsInBag.map(item => {
				if (item.good.data.id === goodId) {
					return { ...item, count };
				}

				return item;
			});
		} else {
			body = [...goodsInBag, { count, good: goodId }];
		}

		return await profileInstance.put(
			`/api/bags/${response[0].id}?populate=goods`,
			{
				data: {
					bagPrice,
					goods: body,
				},
			},
			{
				headers: {
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

const updateAllGoodsInBag = async (goods, bagPrice) => {
	try {
		const token = cookies().get('jwt')?.value;

		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const response = await fetchBagByUserId();

		return await profileInstance.put(
			`/api/bags/${response[0].id}?populate=goods`,
			{
				data: {
					bagPrice,
					goods: [...goods],
				},
			},
			{
				headers: {
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

export const fetchUpdateAllGoodsInBag = cache(updateAllGoodsInBag);

const deleteProductFromBag = async goodId => {
	try {
		const token = cookies().get('jwt')?.value;

		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const response = await fetchBagByUserId();

		const goodsInBag = flattenAttributes(response[0].goods);

		const goodsWithoutDeleted = goodsInBag.filter(
			({ good }) => good.data.id !== goodId
		);

		return await profileInstance.put(
			`/api/bags/${response[0].id}?populate=goods`,
			{
				data: {
					goods: [...goodsWithoutDeleted],
				},
			},
			{
				headers: {
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

export const fetchDeleteProductFromBag = cache(deleteProductFromBag);

const setLocalBagOnServer = async localGoods => {
	try {
		const token = cookies().get('jwt')?.value;

		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const bag = await fetchBagByUserId();

		const goodsInBag = flattenAttributes(bag[0].goods);

		const localGoodsIds = localGoods.map(({ good }) => good.id);

		const updateGoodsInBag = goodsInBag.map(item => {
			const { count, good } = item;
			if (localGoodsIds.includes(good.data.id)) {
				return { ...item, count };
			}

			return item;
		});

		const newGoods = localGoods.filter(
			({ good }) => !localGoodsIds.includes(good.id)
		);

		const body = [...updateGoodsInBag, ...newGoods];

		return await profileInstance.put(
			`/api/bags/${bag[0].id}?populate=goods`,
			{
				data: {
					goods: body,
				},
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
				cache: 'no-cache',
			}
		);
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
};

export const handleLocalBagOnServer = cache(setLocalBagOnServer);

const resetBag = async () => {
	try {
		const token = cookies().get('jwt')?.value;

		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const bag = await fetchBagByUserId();

		return await profileInstance.put(
			`/api/bags/${bag[0].id}?populate=goods`,
			{
				data: {
					goods: [],
				},
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
				cache: 'no-cache',
			}
		);
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
};

export const fetchResetBag = cache(resetBag);

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
