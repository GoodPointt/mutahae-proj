'use server';

import { cookies } from 'next/headers';

import { fetchCreateOrder } from './api/profileInstance';

import { z } from 'zod';

const schema = z
	.object({
		firstName: z
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
	const { firstName, lastName, email, phone } = formData.payload.formValues;
	const { totalPrice, goods, deliveryAddress, cityId } = formData.payload;
	const token = cookies().get('jwt')?.value;

	const validatedFields = schema.safeParse({
		firstName,
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
		if (token) {
			await fetchCreateOrder(totalPrice, goods, cityId);
		}

		return {
			firstName,
			lastName,
			email,
			phone,
			totalPrice,
			goods,
			deliveryAddress,
			message: 'success',
		};
	} catch (error) {
		console.error(error);
	}
}
