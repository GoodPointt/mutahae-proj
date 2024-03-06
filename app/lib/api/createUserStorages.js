const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const createBagByUserIdAndJwt = async (jwt, userId) => {
	const isBagAlreadyExist = await fetch(
		STRAPI_URL + `/api/bags?filters[user][id][$eq]=${userId}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + jwt,
			},
			cache: 'no-store',
		}
	)
		.then(res => res.json())
		.then(res => res.data);

	if (!isBagAlreadyExist || isBagAlreadyExist.length === 0) {
		return await fetch(STRAPI_URL + '/api/bags', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + jwt,
			},
			cache: 'no-store',
			body: JSON.stringify({ data: { user: userId } }),
		});
	} else return isBagAlreadyExist;
};

export const createFavoritesByUserIdAndJwt = async (jwt, userId) => {
	const isFavoritesAlreadyExist = await fetch(
		STRAPI_URL + `/api/favorites?filters[user][id][$eq]=${userId}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + jwt,
			},
			cache: 'no-store',
		}
	)
		.then(res => res.json())
		.then(res => res.data);

	if (!isFavoritesAlreadyExist || isFavoritesAlreadyExist.length === 0) {
		return await fetch(STRAPI_URL + '/api/favorites', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + jwt,
			},
			cache: 'no-store',
			body: JSON.stringify({ data: { user: userId } }),
		});
	} else return isFavoritesAlreadyExist[0].id;
};
