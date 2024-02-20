import { Suspense } from 'react';

import SsrOrderHistory from '../../../ui/profile/orderHistory/SsrOrderHistory';
import SkeletonOrderHistory from '../../../ui/skeletons/SkeletonOrderHistory';

import { Heading } from '@chakra-ui/react';

import { getDictionary } from '../../../lib/locales/dictionary';

const HistoryOfOrders = async ({ params: { lang } }) => {
	const dictionary = await getDictionary(lang);
	const {
		historyOfOrders: { title },
	} = dictionary.profile;

	return (
		<>
			<Heading
				as="h2"
				mb={{ base: 6, lg: 8 }}
				fontSize={{ base: '2xl', lg: '4xl' }}
			>
				{title}
			</Heading>

			<Suspense fallback={<SkeletonOrderHistory lang={lang} />}>
				<SsrOrderHistory lang={lang} dictionary={dictionary} />
			</Suspense>
		</>
	);
};
export default HistoryOfOrders;
