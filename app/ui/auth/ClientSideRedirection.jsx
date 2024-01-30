'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Flex, Spinner, Text } from '@chakra-ui/react';

import { setCookie } from 'cookies-next';

const ClientSideRedirection = ({ dictionary, provider, lang }) => {
	const searchParams = useSearchParams();
	const access_token = searchParams.get('access_token');
	const router = useRouter();

	const [text, setText] = useState(dictionary.provider.loading);

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
					setTimeout(() => {
						setText(dictionary.provider.error);
						router.push(`/${lang}/auth/login`);
					}, 400);
					throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
				}

				return res;
			})
			.then(res => res.json())
			.then(res => {
				setCookie('jwt', res.jwt);
				setCookie('userId', res.user.id);

				setTimeout(() => {
					setText(dictionary.provider.rederecting);
					router.push('/');
				}, 200);
			})
			.catch(err => {
				console.error(err);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [access_token, provider, router]);

	return (
		<Flex gap={10}>
			<Spinner size={'md'} />
			<Text>{text}</Text>
		</Flex>
	);
};

export default ClientSideRedirection;
