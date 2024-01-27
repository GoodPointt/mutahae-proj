'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createContact } from './api/instance';

import { z } from 'zod';

export async function createCookie(prevState, formData) {
	const { lang, path } = Object.fromEntries(formData);

	if (!path) return '/';
	const segments = path.split('/');
	segments[1] = lang;
	const newPath = segments.join('/');
	cookies().set({
		name: 'lang',
		value: lang,
		httpOnly: true,
		path: '/',
	});
	revalidatePath(path);
	redirect(newPath);
}

const schema = z
	.object({
		name: z.string().trim(),
		// .min(1, { message: 'required' })
		// .regex(
		//   new RegExp(/^[a-zA-Z\u0590-\u05FF]+[-'s]?[a-zA-Z\u0590-\u05FF ]+$/),
		//   'invalid'
		// ),
		email: z.string().trim(),
		// .min(1, { message: 'required' })
		// .email({ message: 'invalid' }),
		phone: z
			.string()
			.trim()
			.min(1, { message: 'required' })
			.regex(
				new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/),
				'invalid'
			),
	})
	.partial();

export async function submitData(prevState, formData) {
	const { name, email, phone } = Object.fromEntries(formData);

	const validatedFields = schema.safeParse({
		name,
		email,
		phone,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error.',
		};
	}
	try {
		const res = await createContact({ name, email, phone });

		if (res) {
			return { name, email, phone, message: 'succsess' };
		}
	} catch (error) {
		console.error(error);
	}
}

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

		const data = await response.json();
		if (!response.ok && data.error)
			return { ...prevState, message: data.error.message, errors: null };
		if (response.ok && data.jwt) {
			cookies().set('jwt', data.jwt);
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
				username: name,
				lastName,
			}),
			cache: 'no-cache',
		});

		const dataUser = await response.json();

		if (!response.ok && dataUser.error)
			return { ...prevState, message: dataUser.error.message, errors: null };
		if (response.ok && dataUser.jwt) {
			await fetch(STRAPI_URL + '/api/bags', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + dataUser.jwt,
				},
				cache: 'no-store',
				body: JSON.stringify({ data: { user: dataUser.user.id } }),
			});

			await fetch(STRAPI_URL + '/api/favorites', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + dataUser.jwt,
				},
				cache: 'no-store',
				body: JSON.stringify({ data: { user: dataUser.user.id } }),
			});

			cookies().set('jwt', dataUser.jwt);
			cookies().set('userId', dataUser.user.id);
		}
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
	redirect('/');
}
