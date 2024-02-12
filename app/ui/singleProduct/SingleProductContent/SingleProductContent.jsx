import React, { Suspense } from 'react';
import { cookies } from 'next/headers';

import { fetchOneProduct } from '@/app/lib/api/instance';
import {
	fetchBagByUserId,
	fetchIsFavorite,
} from '@/app/lib/api/profileInstance';

import SectionWrapper from '../../sectionWrapper/SectionWrapper';
import SkeletonSingleProduct from '../../skeletons/SkeletonSingleProduct';
import SingleProduct from '../SingleProduct';

const SingleProductContent = async ({ id, lang, dictionary }) => {
	const userId = cookies().get('userId')?.value;

	const product = await fetchOneProduct(id, lang);

	let bagData;
	let isFavorite;

	if (userId) {
		bagData = await fetchBagByUserId(userId);
		isFavorite = await fetchIsFavorite(product.id);
	}

	const totalPrice = userId
		? bagData[0].goods.length !== 0 &&
		  bagData[0].goods.reduce((acc, { count, good }) => {
				return acc + good.data.attributes.price * count;
		  }, 0)
		: null;

	return (
		<SectionWrapper pb={'60px'}>
			<Suspense fallback={<SkeletonSingleProduct dictionary={dictionary} />}>
				<SingleProduct
					userId={userId}
					product={product}
					dictionary={dictionary}
					isFavorite={isFavorite}
					bagPrice={totalPrice}
					bagData={bagData}
				/>
			</Suspense>
		</SectionWrapper>
	);
};

export default SingleProductContent;
