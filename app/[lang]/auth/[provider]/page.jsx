'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';

import { Text } from '@chakra-ui/react';

import { setCookie } from 'cookies-next';

const RedirectPage = ({ params: { provider } }) => {
	const searchParams = useSearchParams();
	const access_token =
		provider === 'facebook'
			? searchParams.get('access_token')
			: searchParams.get('id_token');
	const router = useRouter();

	const [text, setText] = useState('...טוען');

	useEffect(() => {
		fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${provider}/callback?access_token=${access_token}`,
			{
				headers: {
					Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
					'Content-Type': 'application/json',
				},
			}
		)
			.then(res => {
				if (res.status !== 200) {
					throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
				}

				return res;
			})
			.then(res => res.json())
			.then(res => {
				setCookie('jwt', res.jwt);
				setCookie('userId', res.user.id);

				setText('...התחברת בהצלחה. תופנה מחדש תוך מספר שניות');
				setTimeout(() => router.push('/'), 3000); // Redirect to homepage after 3 sec
			})
			.catch(err => {
				console.error(err);
			});
	}, [access_token, provider, router]);

	return (
		<SectionWrapper style={{ height: '100dvh' }}>
			<Text>{text}</Text>
		</SectionWrapper>
	);
};

export default RedirectPage;
