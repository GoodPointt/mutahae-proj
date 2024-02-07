'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createContact } from './api/instance';
import {
	changePassword,
	fetchDeleteProductFromBag,
	fetchHandleFavorites,
	fetchUpdateAllGoodsInBag,
	updateUserData,
} from './api/profileInstance';
import { fetchAddToBag } from './api/profileInstance';

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
		console.error(error);
	}
}

export async function submitUserDetails(prevState, formData) {
	const { username, lastName, email, phone } = Object.fromEntries(formData);
	const userData = { username, lastName, email, phone };

	const validatedFields = schema.safeParse({
		username,
		lastName,
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
		const data = await updateUserData(userData);

		if (!data) {
			throw new Error('Error occured while updating user data');
		}

		return {
			data,
			status: 'succsess',
		};
	} catch (error) {
		console.error(error);

		return {
			message: error.message,
			status: 'error',
		};
	}
}

export async function submitUserAddress(prevState, formData) {
	const { firstName } = Object.fromEntries(formData);

	const validatedFields = schema.safeParse({
		firstName,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Error.',
		};
	}

	//console.log(firstName, lastName, email, phone);
	// try {
	// 	const res = await createContact({ name, email, phone });

	// 	if (res) {
	// 		return { name, email, phone, message: 'succsess' };
	// 	}
	// } catch (error) {
	// 	console.error(error);
	// }
}

export const logout = () => {
	try {
		cookies().delete('userId');
		cookies().delete('jwt');

		revalidatePath('/');
		redirect('/');
	} catch (error) {
		console.error(error);

		revalidatePath('/');
		redirect('/');
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

export async function submitProductToBag(prevState, formData) {
	const { count, goodId, bagPrice } = formData;

	try {
		const res = await fetchAddToBag(count, goodId, bagPrice);
		if (res.status === 200) {
			revalidatePath('/');
		}
	} catch (error) {
		return { message: error.message };
	}
}

export async function updateAllGoodsInBag(prevState, formData) {
	const { bagPrice, goods } = formData;

	try {
		const res = await fetchUpdateAllGoodsInBag(goods, bagPrice);

		if (res.status === 200) {
			revalidatePath('/');

			return { status: res.status };
		}
	} catch (error) {
		return { message: error.message };
	}
}

export async function deleteProductFromBag(prevState, formData) {
	const { goodId } = formData;

	try {
		const response = await fetchDeleteProductFromBag(goodId);
		if (response.status === 200) {
			revalidatePath('/');
		}
	} catch (error) {
		return { message: error.message };
	}
}

export async function submitGoodToFavorite(prevState, formData) {
	const { goodId } = formData;

	try {
		const response = await fetchHandleFavorites(goodId);

		if (response.status === 200) {
			revalidatePath('/');

			return {
				status: response.status,
			};
		}
	} catch (error) {
		return { message: error.message };
	}
}
