'use client';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

const RedirectPage = ({ params: { provider } }) => {
	const [text, setText] = useState('Loading...');
	useEffect(() => {
		fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${provider}/callback`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_STRAPI_TOKEN,
				},
			}
			//${location.search}
		)
			.then(res => {
				if (res.status !== 200) {
					throw new Error(`Couldn't login to Strapi. Status: ${res.status}`);
				}

				return res;
			})
			.then(res => res.json())
			.then(res => {
				// Successfully logged with Strapi
				// Now saving the jwt to use it for future authenticated requests to Strapi
				localStorage.setItem('jwt', res.jwt);
				localStorage.setItem('username', res.user.username);
				setText(
					'You have been successfully logged in. You will be redirected in a few seconds...'
				);
				setTimeout(() => redirect('/'), 3000); // Redirect to homepage after 3 sec
			})
			.catch(err => {
				console.error(err);
				// setText('An error occurred, please see the developer console.');
			});
	}, [provider]);

	return <div>{text}</div>;
};

export default RedirectPage;
