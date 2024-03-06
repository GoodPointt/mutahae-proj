'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createContact } from './api/instance';
import {
	addUserAddress,
	changePassword,
	deleteUserAddress,
	fetchHandleFavorites,
	updateUserData,
} from './api/profileInstance';
import { textTrim } from './utils/textTrim';

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
			.regex(new RegExp(/(?:\+?\d{1,3}[-()]?)?\d{7,10}/), 'invalid'),
	})
	.partial();

const addressSchema = z
	.object({
		region: z.string().trim().max(10, { message: 'invalid' }),
		city: z
			.string()
			.trim()
			.min(1, { message: 'required' })
			.max(20, { message: 'invalid' }),
		street: z.string().trim().max(20, { message: 'invalid' }),
		app: z.string().trim().max(20, { message: 'invalid' }),
		index: z.string().trim().max(20, { message: 'invalid' }),
	})
	.partial();

const changePasswordSchema = z
	.object({
		currentPassword: z.string().min(6, { message: 'invalid' }),
		newPassword: z.string().min(6, { message: 'invalid' }),
		confirmPassword: z.string(),
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match or are empty",
		path: ['confirmPassword'], // path of error
	});

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
		console.error('submitData', error.message);
	}
}

export async function submitUserDetails(prevState, formData) {
	const { firstName, lastName, email, phone } = Object.fromEntries(formData);
	const userData = { firstName, lastName, email, phone };

	const formDto = {
		firstName: textTrim(firstName),
		lastName: textTrim(lastName),
		email: textTrim(email),
		phone: textTrim(phone),
	};

	const validatedFields = schema.safeParse(formDto);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error.',
		};
	}

	try {
		const data = await updateUserData(userData);

		if (!data) {
			throw new Error('Error occured while updating user data');
		}

		return {
			data,
			status: 'success',
		};
	} catch (error) {
		console.error('submitUserDetails', error.message);

		return {
			message: error.message,
			status: 'error',
		};
	}
}

export const logout = (prevState, formData) => {
	const { lang } = formData;
	try {
		cookies().delete('userId');
		cookies().delete('jwt');
		cookies().delete('favId');

		revalidatePath(`/${lang}`);
		redirect(`/${lang}`);
		// return { status: 200 };
	} catch (error) {
		console.error('logout', error.message);

		revalidatePath(`/${lang}/`);
		redirect(`/${lang}/`);
	}
};

export const changePasswordAction = async (prevState, formData) => {
	const { currentPassword, newPassword, confirmPassword } =
		Object.fromEntries(formData);

	const validatedFields = changePasswordSchema.safeParse({
		currentPassword,
		newPassword,
		confirmPassword,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error.',
		};
	}

	try {
		const response = await changePassword({
			currentPassword,
			password: newPassword,
			passwordConfirmation: confirmPassword,
		});

		revalidatePath('/profile');

		return {
			data: response.data,
			status: response.status,
		};
	} catch (error) {
		return {
			status: 'error',
			message: error.message,
		};
	}
};

export const addUserAddressAction = async (prevState, formData) => {
	const { region, city, street, app, index } = Object.fromEntries(formData);

	const validatedFields = addressSchema.safeParse({
		region,
		city,
		street,
		app,
		index,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error.',
		};
	}

	try {
		const response = await addUserAddress({ region, city, street, app, index });

		revalidatePath('/profile');

		return {
			data: response.data,
			status: 'success',
		};
	} catch (error) {
		return {
			status: 'error',
			message: error.message,
		};
	}
};

export const delAddressAction = async (prevState, formData) => {
	try {
		const { addressId } = Object.fromEntries(formData);

		if (!addressId) {
			throw new Error('No address id provided.');
		}

		await deleteUserAddress(addressId);

		return {
			status: 'success',
		};
	} catch (error) {
		console.error('delAddressAction', error);

		return {
			status: 'error',
			message: error.message,
		};
	}
};

export async function submitGoodToFavorite(prevState, formData) {
	const { goodId, goods } = formData;

	try {
		const response = await fetchHandleFavorites({
			goods,
			goodId,
		});

		if (response?.status === 200) {
			return {
				status: response?.status,
				totalFavorites: response.goods.length,
			};
		}
	} catch (error) {
		return { message: error.message };
	}
}
