import { Suspense } from 'react';

import DeliveryInfo from '@/app/ui/deliveryInfo/DeliveryInfo';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import SingleProductContent from '@/app/ui/singleProduct/SingleProductContent/SingleProductContent';
import SkeletonSingleProduct from '@/app/ui/skeletons/SkeletonSingleProduct';

import { fetchOneProduct } from '@/app/lib/api/instance';
import { getDictionary } from '@/app/lib/locales/dictionary';

export const generateMetadata = async ({ params: { id, lang } }) => {
	const { attributes: good } = await fetchOneProduct(id, lang);

	const imgUrl = good.img && good.img.data && good.img.data[0].attributes.url;

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
					url: imgUrl,
				},
			],
		},
	};
};

const SingleProductPage = async ({ params: { id, lang } }) => {
	const dictionary = await getDictionary(lang);

	return (
		<>
			<Suspense
				fallback={
					<SectionWrapper>
						<SkeletonSingleProduct lang={lang} />
					</SectionWrapper>
				}
			>
				<SingleProductContent id={id} lang={lang} dictionary={dictionary} />
			</Suspense>
			<DeliveryInfo dictionary={dictionary} />
		</>
	);
};

export default SingleProductPage;
