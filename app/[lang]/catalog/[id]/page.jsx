import { Suspense } from 'react';
import { cookies } from 'next/headers';

import Contact from '@/app/ui/contact/Contact';
import DeliveryInfo from '@/app/ui/deliveryInfo/DeliveryInfo';
import SingleProduct from '@/app/ui/singleProduct/SingleProduct';

import { fetchContacts, fetchOneProduct } from '@/app/lib/api/instance';
import {
	fetchBagByUserId,
	fetchIsFavorite,
} from '@/app/lib/api/profileInstance';
import { getDictionary } from '@/app/lib/locales/dictionary';

import LoadingProduct from './loading';

export const generateMetadata = async ({ params: { id, lang } }) => {
	const { attributes: good } = await fetchOneProduct(id, lang);

	return {
		title: good.title,
		alternates: {
			canonical: `/catalog/${id}`,
			languages: {
				en: `/en/catalog/${id}`,
				he: `/he/catalog/${id}`,
			},
		},
		description: good.descShort,
		openGraph: {
			images: [
				{
					url: good.imgUrl,
				},
			],
		},
	};
};

const SingleProductPage = async ({ params: { id, lang } }) => {
	const dictionary = await getDictionary(lang);
	const userId = cookies().get('userId');

	const [product, contacts, bag] = await Promise.all([
		fetchOneProduct(id, lang),
		fetchContacts(lang),
		fetchBagByUserId(userId),
	]);

	const isFavorite = userId ? await fetchIsFavorite(product.id) : null;

	const totalPrice = userId
		? bag[0].goods.reduce((acc, { count, good }) => {
				return acc + good.data.attributes.price * count;
		  }, 0)
		: null;

	return (
		<>
			<Suspense fallback={<LoadingProduct dictionary={dictionary} />}>
				<SingleProduct
					userId={userId}
					product={product}
					dictionary={dictionary}
					contacts={contacts}
					isFavorite={isFavorite}
					bagPrice={totalPrice}
				/>
			</Suspense>
			<DeliveryInfo dictionary={dictionary} />
			<Contact lang={lang} dictionary={dictionary} contacts={contacts} />
		</>
	);
};

export default SingleProductPage;
