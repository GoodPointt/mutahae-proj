'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { sendTgNotification } from './api/notifyInstance';
import {
	fetchCreateOrder,
	fetchResetBag,
	updateUserData,
} from './api/profileInstance';
import { flattenAttributes } from './utils/flattenAttributes';
import { textTrim } from './utils/textTrim';

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
			.regex(new RegExp(/(?:\+?\d{1,3}[-()]?)?\d{7,10}/), 'invalid'),
	})
	.partial();

export async function submitData(prevState, formData) {
	const { firstName, lastName, email, phone } = formData.payload.formValues;
	const { totalPrice, goods, deliveryAddress, cityId, userAddressId, lang } =
		formData.payload;
	const token = cookies().get('jwt')?.value;

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
		const orderNum = Date.now();
		if (token) {
			await fetchCreateOrder(
				totalPrice,
				goods,
				cityId,
				userAddressId,
				orderNum
			);
			await updateUserData(formDto);
		}

		const listGoods = goods.map(good => ({
			title: `${flattenAttributes(good.good).title}, ${
				flattenAttributes(good.good).descShort
			} `,
			count: good.count,
		}));

		const res = await sendTgNotification({
			...formDto,
			delivery: textTrim(deliveryAddress),
			orderPrice: totalPrice,
			goods: listGoods,
			orderNum,
		});

		if (res.status === 404) {
			return res;
		}

		if (res.status === 201) {
			await fetchResetBag();
			revalidatePath(`/${lang}/order`);

			return {
				...formDto,
				totalPrice,
				goods,
				deliveryAddress,
				message: 'success',
				status: 201,
			};
		} else {
			return {
				status: 404,
			};
		}
	} catch (error) {
		console.error('Order/submitData', error.message);
	}
}
