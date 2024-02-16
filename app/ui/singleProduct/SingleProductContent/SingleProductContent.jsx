import React, { Suspense } from 'react';
import { cookies } from 'next/headers';

import { fetchOneProduct } from '@/app/lib/api/instance';
import {
	fetchBagByUserId,
	fetchFavorites,
} from '@/app/lib/api/profileInstance';

import SectionWrapper from '../../sectionWrapper/SectionWrapper';
import SkeletonSingleProduct from '../../skeletons/SkeletonSingleProduct';
import SingleProduct from '../SingleProduct';

const SingleProductContent = async ({ id, lang, dictionary }) => {
	const userId = cookies().get('userId')?.value;

	const product = await fetchOneProduct(id, lang);

	let bagData;
	let favorites;

	if (userId) {
		bagData = await fetchBagByUserId(userId);
		favorites = await fetchFavorites(userId);
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
					favorites={favorites && favorites[0].goods}
					userId={userId}
					product={product}
					dictionary={dictionary}
					bagPrice={totalPrice}
					bagData={bagData}
				/>
			</Suspense>
		</SectionWrapper>
	);
};

export default SingleProductContent;
