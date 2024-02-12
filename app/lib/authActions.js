'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
	loginUserByEmailAndPassword,
	recoveryPasswordByEmail,
	registerNewUser,
	resetPasswordWithToken,
} from './api/auth';
import {
	createBagByUserIdAndJwt,
	createFavoritesByUserIdAndJwt,
} from './api/createUserStorages';
import { handleLocalBagOnServer, profileInstance } from './api/profileInstance';

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

	const goods = JSON.parse(formData.get('localGoods'));

	try {
		const response = await loginUserByEmailAndPassword(email, password);
		const userData = await response.json();

		if (!response.ok && userData.error)
			return { ...prevState, message: userData.error.message, errors: null };
		if (response.ok && userData.jwt) {
			cookies().set({
				name: 'jwt',
				value: userData.jwt,
				httpOnly: true,
			});
			cookies().set({
				name: 'userId',
				value: userData.user.id,
				httpOnly: true,
			});
			profileInstance.defaults.headers.authorization = `Bearer ${userData.jwt}`;
		}

		if (response.ok && goods.length !== 0) {
			await handleLocalBagOnServer(goods);
		}
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}

	return { message: 'success' };
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

	const goods = JSON.parse(formData.get('localGoods'));

	try {
		const response = await registerNewUser(email, name, lastName, password);

		const userData = await response.json();

		if (!response.ok && userData.error)
			return { ...prevState, message: userData.error.message, errors: null };
		if (response.ok && userData.jwt) {
			const bagResponse = await createBagByUserIdAndJwt(
				userData.jwt,
				userData.user.id,
				goods
			);

			if (bagResponse.ok && goods.length !== 0) {
				await handleLocalBagOnServer(goods);
			}

			await createFavoritesByUserIdAndJwt(userData.jwt, userData.user.id);

			cookies().set({
				name: 'jwt',
				value: userData.jwt,
				httpOnly: true,
			});
			cookies().set({
				name: 'userId',
				value: userData.user.id,
				httpOnly: true,
			});
			profileInstance.defaults.headers.authorization = `Bearer ${userData.jwt}`;
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
		const response = await recoveryPasswordByEmail(email);

		const data = await response.json();

		if (!response.ok && data.error)
			return { ...prevState, message: data.error.message, errors: null };
		if (response.ok) {
			return { ...prevState, message: 'success' };
		}
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
}

const resetPasswordSchema = z
	.object({
		code: z.string().trim(),
		password1: z.string().min(6, { message: 'invalid' }),
		password2: z.string().min(6, { message: 'invalid' }),
	})
	.partial();

export async function resetPasswordAction(prevState, formData) {
	const validatedFields = resetPasswordSchema.safeParse({
		password1: formData.get('password1'),
		password2: formData.get('password2'),
		code: formData.get('code'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error.',
		};
	}

	const { password1, password2, code } = validatedFields.data;
	if (password1 !== password2) {
		return {
			message: 'not_equal',
		};
	}

	try {
		const response = await resetPasswordWithToken(code, password1, password2);

		const data = await response.json();

		if (!response.ok && data.error)
			return { ...prevState, message: data.error.message, errors: null };

		if (response.ok) {
			return { ...prevState, message: 'success' };
		}
	} catch (error) {
		console.error(error);

		return { error: 'Server error please try again later.' };
	}
}
