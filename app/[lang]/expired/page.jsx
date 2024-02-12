import { redirect } from 'next/navigation';

import { Center, Spinner } from '@chakra-ui/react';

const ExpiredPage = ({ params: { lang }, searchParams: { expired } }) => {
	return (
		<>
			<Center h={'40dvh'}>
				<Spinner size={'xl'} />
			</Center>
			{expired !== 'true' ? redirect(`/${lang}/`) : redirect('auth/login')}
		</>
	);
};

export default ExpiredPage;
