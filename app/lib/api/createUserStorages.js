const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export const createBagByUserIdAndJwt = async (jwt, userId) => {
	return await fetch(STRAPI_URL + '/api/bags', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + jwt,
		},
		cache: 'no-store',
		body: JSON.stringify({ data: { user: userId } }),
	});
};

export const createFavoritesByUserIdAndJwt = async (jwt, userId) => {
	await fetch(STRAPI_URL + '/api/favorites', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + jwt,
		},
		cache: 'no-store',
		body: JSON.stringify({ data: { user: userId } }),
	});
};
