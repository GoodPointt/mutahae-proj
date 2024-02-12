import { redirect } from 'next/navigation';

import { Center, Spinner } from '@chakra-ui/react';

const ExpiredPage = ({ searchParams: { expired } }) => {
	return (
		<>
			<Center h={'40dvh'}>
				<Spinner size={'xl'} />
			</Center>
			{expired !== 'true' ? redirect('/') : redirect('auth/login')}
		</>
	);
};

export default ExpiredPage;
