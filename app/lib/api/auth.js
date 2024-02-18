const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
if (!STRAPI_URL) throw new Error('Missing STRAPI_URL environment variable.');

export const registerNewUser = async dto => {
	const url = `${STRAPI_URL}/api/auth/local/register`;

	return await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			...dto,
			username: dto.email.split('@')[0],
		}),
		cache: 'no-cache',
	});
};

export const loginUserByEmailAndPassword = async (email, password) => {
	const url = `${STRAPI_URL}/api/auth/local`;

	return await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ identifier: email, password }),
		cache: 'no-cache',
	});
};

export const recoveryPasswordByEmail = async email => {
	const url = `${STRAPI_URL}/api/auth/forgot-password`;

	return await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email }),
		cache: 'no-cache',
	});
};

export const resetPasswordWithToken = async (code, password1, password2) => {
	const url = `${STRAPI_URL}/api/auth/reset-password`;

	return await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			code,
			password: password1,
			passwordConfirmation: password2,
		}),
		cache: 'no-cache',
	});
};
