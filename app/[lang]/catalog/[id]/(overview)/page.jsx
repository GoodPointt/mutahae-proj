import { Suspense } from 'react';
import { cookies } from 'next/headers';

import Contact from '@/app/ui/contact/Contact';
import DeliveryInfo from '@/app/ui/deliveryInfo/DeliveryInfo';
import SingleProduct from '@/app/ui/singleProduct/SingleProduct';

import { fetchContacts, fetchOneProduct } from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';

import LoadingProduct from './loading';

export const generateMetadata = async ({ params: { id, lang } }) => {
	const { attributes: product } = await fetchOneProduct(id, lang);

	return {
		title: product.title,
		alternates: {
			canonical: `/catalog/${id}`,
			languages: {
				en: `/en/catalog/${id}`,
				he: `/he/catalog/${id}`,
			},
		},
		description: product.descShort,
		openGraph: {
			images: [
				{
					url: product.imgUrl,
				},
			],
		},
	};
};

const SingleProductPage = async ({ params: { id, lang } }) => {
	const dictionary = await getDictionary(lang);

	const [{ id: productId, attributes: product }, contacts] = await Promise.all([
		fetchOneProduct(id, lang),
		fetchContacts(lang),
	]);

	const userId = cookies().get('userId');

	return (
		<>
			<Suspense fallback={<LoadingProduct dictionary={dictionary} />}>
				<SingleProduct
					userId={userId}
					productId={productId}
					product={product}
					dictionary={dictionary}
					contacts={contacts}
				/>
			</Suspense>
			<DeliveryInfo dictionary={dictionary} />
			<Contact lang={lang} dictionary={dictionary} contacts={contacts} />
		</>
	);
};

export default SingleProductPage;
