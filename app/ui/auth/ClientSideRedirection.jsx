'use client';
import { useEffect, useState } from 'react';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Flex, Spinner, Text } from '@chakra-ui/react';

import {
	createBagByUserIdAndJwt,
	createFavoritesByUserIdAndJwt,
} from '@/app/lib/api/createUserStorages';
import { useLocalBag } from '@/app/lib/hooks/useLocalBag';

import { setCookie } from 'cookies-next';

const ClientSideRedirection = ({ dictionary, provider, lang }) => {
	const searchParams = useSearchParams();
	const access_token = searchParams.get('access_token');
	const router = useRouter();
	const [localBag] = useLocalBag('localBag', []);

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
			.then(async res => {
				if (res.jwt) {
					const bagRes = await createBagByUserIdAndJwt(res.jwt, res.user.id);
					if (localBag.length !== 0) {
						await fetch(
							`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/bags/${bagRes[0].data.id}?populate=goods`,
							{
								method: 'POST',
								headers: {
									Authorization: 'Bearer ' + res.jwt,
									'Content-Type': 'application/json',
								},
								body: {
									data: {
										goods: localBag,
									},
								},
							}
						);
					}
					await createFavoritesByUserIdAndJwt(res.jwt, res.user.id);
					setCookie('jwt', res.jwt);
					setCookie('userId', res.user.id);

					setTimeout(() => {
						setText(dictionary.provider.rederecting);
						router.refresh();
					}, 200);
				}
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
