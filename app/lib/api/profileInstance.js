import { cache } from 'react';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

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
			throw new Error('getFavorites Not authorized');
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
		console.error('getFavorites', e.response?.status);
		console.error('getFavorites', e.message);

		if (e.response?.status === 401) {
			return redirect('/expired?expired=true');
		}
	}
};

export const fetchFavorites = cache(getFavorites);

const handleFavorites = async ({ goods, goodId }) => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;
		const favId = cookies().get('favId')?.value;

		if (!token || !userId) {
			throw new Error('handleFavorites Not authorized');
		}

		//const favorites = await getFavorites();

		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const flattenFavorites = flattenAttributes(goods);

		const isSame = flattenFavorites.some(item => item.id === goodId);

		const body = isSame
			? [...flattenFavorites.filter(item => item.id !== goodId)]
			: [...flattenFavorites, goodId];

		const response = await profileInstance.put(
			`/api/favorites/${favId}?populate=goods`,
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
		console.error('handleFavorites', error.response?.status);
		console.error('handleFavorites', error.message);

		if (error.response?.status === 401) redirect('/profile?expired=true');
	}
};

export const fetchHandleFavorites = cache(handleFavorites);

// const isFavorite = async goodId => {
// 	try {
// 		const response = await fetchFavorites();

// 		const favorites = flattenAttributes(response[0].goods);

// 		return favorites.some(good => good.id === goodId);
// 	} catch (error) {
// 		console.error('isFavorite', error.response?.status);
// 		console.error('isFavorite', error.message);
// 		if (error.response?.status === 401) redirect('/profile?expired=true');
// 	}
// };

// export const fetchIsFavorite = cache(isFavorite);

const getOrders = async () => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;
		if (!token || !userId) {
			throw new Error('getOrders Not authorized');
		}
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const response = await profileInstance.get(
			`/api/orders?populate=deep,4&filters[user][id][$eq]=${userId}&sort[0]=createdAt:desc`
		);

		const { data } = response.data;

		if (!data) {
			return [];
		}

		return data;
	} catch (e) {
		console.error('getOrders', e.response?.status);
		console.error('getOrders', e.message);

		if (e.response?.status === 401) redirect('/expired?expired=true');
		else return notFound();
	}
};
export const fetchOrders = cache(getOrders);

const getUserData = async () => {
	try {
		const userId = cookies().get('userId')?.value;

		if (!userId) throw new Error('getUserData User id not found!');

		return await profileInstance.get(`/api/users/${userId}`);
	} catch (e) {
		console.error('getUserData', e.response?.status);
		console.error('getUserData', e.message);

		return redirect('/expired?expired=true');
	}
};

export const fetchUserData = cache(getUserData);

export const updateUserData = async userData => {
	try {
		const userId = cookies().get('userId')?.value;

		if (!userId) throw new Error('updateUserData User id not found!');

		const { data } = await profileInstance.put(
			`/api/users/${userId}`,
			userData
		);

		return {
			data,
			status: 'success',
		};
	} catch (error) {
		console.error('updateUserData', error.response?.status);
		console.error('updateUserData', error.message);
		if (error.response?.status === 401) redirect('/expired?expired=true');
		else
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
			throw new Error('changePassword Not authorized');
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
		console.error('changePassword', error.response?.status);
		console.error('changePassword', error.message);

		if (error.response?.status === 401) redirect('/expired?expired=true');
		else
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
			throw new Error('addUserAddress Not authorized');
		}
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const { data } = await profileInstance.post('/api/user-addresses', {
			data: {
				user: userId,
				...dataAddress,
			},
		});
		if (!data) throw new Error('addUserAddress Failed to add user address.');

		return {
			data,
			status: 'success',
		};
	} catch (error) {
		console.error('addUserAddress', error.response?.status);
		console.error('addUserAddress', error.message);

		if (error.response?.status === 401) {
			return redirect('/expired?expired=true');
		} else
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
			throw new Error('deleteUserAddress Not authorized');
		}
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		await profileInstance.delete(`/api/user-addresses/${addressId}`);

		return {
			status: 'success',
		};
	} catch (error) {
		console.error('deleteUserAddress', error.response?.status);
		console.error('deleteUserAddress', error.message);

		if (error.response?.status === 401) {
			return redirect('/expired?expired=true');
		} else
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
			throw new Error('getUserAddress Not authorized');
		}

		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const data = profileInstance.get(
			`/api/user-addresses?filters[user][id][$eq]=${userId}`
		);

		if (!data) {
			throw new Error(
				'getUserAddress Failed to fetch user address. An error occurred while retrieving the address data.'
			);
		}

		return data;
	} catch (e) {
		console.error('getUserAddress', e.response?.status);
		console.error('getUserAddress', e.message);
		if (e.message === 'Not authorized') redirect('/auth/login');
		if (e.response?.status === 401) {
			return redirect('/expired?expired=true');
		} else return { error: 'Server error please try again later.' };
	}
};

export const fetchUserAddress = cache(getUserAddress);

const getBagByUserId = async () => {
	try {
		const userId = cookies().get('userId')?.value;

		const res = await profileInstance.get(
			`/api/bags?populate[0]=goods&populate[1]=goods.good&populate[2]=goods.good.img&populate[3]=goods.good.localizations&filters[user][id][$eq]=${userId}`
		);

		const {
			data: { data: goodsInBagData },
		} = res;

		return flattenAttributes(goodsInBagData);
	} catch (error) {
		console.error('getBagByUserId', error.response?.status);
		console.error('getBagByUserId', error.message);
		if (error.response?.status === 401) {
			return redirect('/expired?expired=true');
		} else return { error: 'Server error please try again later.' };
	}
};

export const fetchBagByUserId = cache(getBagByUserId);

const createOrder = async (
	totalPrice,
	goods,
	cityId,
	userAddressId,
	orderNum
) => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const goodsList = goods.map(good => {
			const imgUrl = good.good.data.attributes.img.data[0].attributes.url;

			return {
				count: good.count,
				good: good.good.data.id,
				title: good.good.data.attributes.title,
				descShort: good.good.data.attributes.descShort || '',
				imgUrl,
			};
		});

		return await profileInstance.post('/api/orders', {
			data: {
				user: userId,
				goods: goodsList,
				orderPrice: totalPrice,
				city: cityId,
				user_address: userAddressId,
				orderNum,
			},
		});
	} catch (error) {
		console.error('createOrder', error.response?.status);
		console.error('createOrder', error);
		if (error.response?.status === 401) {
			return redirect('/expired?expired=true');
		} else return { error: error.message };
	}
};

export const fetchCreateOrder = cache(createOrder);

const setLocalBagOnServer = async localGoods => {
	try {
		const bag = await fetchBagByUserId();

		const goodsInBag = flattenAttributes(bag[0].goods);

		const localGoodsIds = localGoods.map(({ good }) => good.id);

		const goods = goodsInBag.filter(
			({ good }) => !localGoodsIds.includes(good.data.id)
		);

		const updateGoods = [...goods, ...localGoods];

		return await profileInstance.put(
			`/api/bags/${bag[0].id}?populate=goods`,
			{
				data: {
					goods: updateGoods,
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
		console.error('setLocalBagOnServer', error.response?.status);
		console.error('setLocalBagOnServer', error.message);
		if (error.response?.status === 401) {
			return redirect('/expired?expired=true');
		} else
			return {
				error: 'setLocalBagOnServer: Server error please try again later.',
			};
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
		console.error('resetBag', error.response?.status);
		console.error('resetBag', error.message);
		if (error.response?.status === 401) {
			return redirect('/expired?expired=true');
		} else return { error: 'Server error please try again later.' };
	}
};

export const fetchResetBag = cache(resetBag);

const getUserDataForOrder = async () => {
	try {
		const userId = cookies().get('userId')?.value;

		if (!userId) return null;

		const data = profileInstance.get(`/api/users/${userId}`);
		if (!data) {
			return null;
		}

		return data;
	} catch (e) {
		console.error('getUserDataForOrder', e.response?.status);
		console.error('getUserDataForOrder', e.message);
		if (e.response?.status === 401) {
			return redirect('/expired?expired=true');
		} else return { error: 'Server error please try again later.' };
	}
};

export const fetchUserDataForOrder = cache(getUserDataForOrder);

export const getUserAddressForOrder = async () => {
	try {
		const token = cookies().get('jwt')?.value;
		const userId = cookies().get('userId')?.value;

		if (!token || !userId) return null;
		profileInstance.defaults.headers.authorization = `Bearer ${token}`;

		const data = profileInstance.get(
			`/api/user-addresses?filters[user][id][$eq]=${userId}`
		);

		if (!data) {
			return null;
		}

		return data;
	} catch (e) {
		console.error('getUserAddressForOrder', e.message);
	}
};

export const fetchUserAddressForOrder = cache(getUserAddressForOrder);

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
		console.error('getOrderByUserId', error.response?.status);
		console.error('getOrderByUserId', error.message);
		if (error.response?.status === 401) {
			return redirect('/expired?expired=true');
		} else return { error: 'Server error please try again later.' };
	}
};

export const fetchOrderByUserId = cache(getOrderByUserId);
