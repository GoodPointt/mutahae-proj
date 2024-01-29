'use server';

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
	const { firstName, lastName, email, phone } = Object.fromEntries(formData);

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
		return { firstName, email, phone, message: 'succsess' };
	} catch (error) {
		console.error(error);
	}
}
