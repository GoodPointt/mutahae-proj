import { Suspense } from 'react';

import SkeletonOrder from '@/app/ui/skeletons/SkeletonOrder';
import Wrapper from '../../ui/order/wrapper/Wrapper';
import SectionWrapper from '../../ui/sectionWrapper/SectionWrapper';

import { Heading } from '@chakra-ui/react';

import { getDictionary } from '@/app/lib/locales/dictionary';

const Order = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);

	return (
		<SectionWrapper>
			<Heading
				as={'h2'}
				fontSize={{ base: '27px', lg: '40.5' }}
				fontFamily={700}
				mb={'35px'}
			>
				{dictionary.order.title}
			</Heading>
			<Suspense fallback={<SkeletonOrder />}>
				<Wrapper dictionary={dictionary} lang={lang} />
			</Suspense>
		</SectionWrapper>
	);
};

export default Order;
