'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { z } from 'zod';

const loginSchema = z
	.object({
		email: z
			.string()
			.trim()
			.min(1, { message: 'required' })
			.email({ message: 'invalid' }),
		password: z.string().min(6, { message: 'invalid' }),
	})
	.partial();

export async function loginAction(prevState, formData) {
	const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
	if (!STRAPI_URL) throw new Error('Missing STRAPI_URL environment variable.');
	const url = `${STRAPI_URL}/api/auth/local`;

	const validatedFields = loginSchema.safeParse({
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error.',
		};
	}

	const { email, password } = validatedFields.data;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ identifier: email, password }),
			cache: 'no-cache',
		});

		const userData = await response.json();
		if (!response.ok && userData.error)
			return { ...prevState, message: userData.error.message, errors: null };
		if (response.ok && userData.jwt) {
			cookies().set({
				name: 'jwt',
				value: userData.jwt,
				httpOnly: true,
				secure: true,
			});
			cookies().set({
				name: 'userId',
				value: userData.user.id,
				httpOnly: true,
				secure: true,
			});
		}
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
	redirect('/');
}

const registerSchema = z
	.object({
		name: z
			.string()
			.trim()
			.min(1, { message: 'required' })
			.regex(
				new RegExp(/^[a-zA-Z\u0590-\u05FF]+[-'s]?[a-zA-Z\u0590-\u05FF ]+$/),
				'invalid'
			),
		lastName: z
			.string()
			.trim()
			.min(1, { message: 'required' })
			.regex(
				new RegExp(/^[a-zA-Z\u0590-\u05FF]+[-'s]?[a-zA-Z\u0590-\u05FF ]+$/),
				'invalid'
			),
		email: z
			.string()
			.trim()
			.min(1, { message: 'required' })
			.email({ message: 'invalid' }),
		password: z.string().min(6, { message: 'invalid' }),
	})
	.partial();

export async function registerAction(prevState, formData) {
	const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
	if (!STRAPI_URL) throw new Error('Missing STRAPI_URL environment variable.');
	const url = `${STRAPI_URL}/api/auth/local/register`;

	const validatedFields = registerSchema.safeParse({
		name: formData.get('name'),
		lastName: formData.get('lastName'),
		email: formData.get('email'),
		password: formData.get('password'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error.',
		};
	}

	const { email, name, lastName, password } = validatedFields.data;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
				firstName: name,
				lastName,
				username: email.split('@')[0],
			}),
			cache: 'no-cache',
		});

		const userData = await response.json();

		if (!response.ok && userData.error)
			return { ...prevState, message: userData.error.message, errors: null };
		if (response.ok && userData.jwt) {
			await fetch(STRAPI_URL + '/api/bags', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + userData.jwt,
				},
				cache: 'no-store',
				body: JSON.stringify({ data: { user: userData.user.id } }),
			});

			await fetch(STRAPI_URL + '/api/favorites', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + userData.jwt,
				},
				cache: 'no-store',
				body: JSON.stringify({ data: { user: userData.user.id } }),
			});

			cookies().set({
				name: 'jwt',
				value: userData.jwt,
				httpOnly: true,
				secure: true,
			});
			cookies().set({
				name: 'userId',
				value: userData.user.id,
				httpOnly: true,
				secure: true,
			});
		}
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
	redirect('/');
}

const recoverySchema = z
	.object({
		email: z
			.string()
			.trim()
			.min(1, { message: 'required' })
			.email({ message: 'invalid' }),
	})
	.partial();

export async function recoveryAction(prevState, formData) {
	const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
	if (!STRAPI_URL) throw new Error('Missing STRAPI_URL environment variable.');
	const url = `${STRAPI_URL}/api/auth/forgot-password`;

	const validatedFields = recoverySchema.safeParse({
		email: formData.get('email'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error.',
		};
	}

	const { email } = validatedFields.data;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
			cache: 'no-cache',
		});

		const data = await response.json();

		// console.log(data);
		if (!response.ok && data.error)
			return { ...prevState, message: data.error.message, errors: null };
		// if (response.ok && data.jwt) {
		// cookies().set({
		// 	name: 'jwt',
		// 	value: userData.jwt,
		// 	httpOnly: true,
		// 	secure: true,
		// });
		// cookies().set({
		// 	name: 'userId',
		// 	value: userData.user.id,
		// 	httpOnly: true,
		// 	secure: true,
		// });
		// }
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
	// redirect('/');
}
