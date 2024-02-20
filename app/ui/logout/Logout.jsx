'use client';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import { Box, Button } from '@chakra-ui/react';

import { logout } from '../../lib/actions';

export const Logout = ({ logoutDictionary, lang }) => {
	// eslint-disable-next-line no-unused-vars
	const [state, dispatch] = useFormState(logout, null);
	const router = useRouter();

	useEffect(() => {
		if (state?.status === 200) {
			localStorage.removeItem('favs');
			router.refresh();
		}
	}, [router, state]);

	return (
		<Box as="form" action={() => dispatch({ lang })}>
			<Button
				bg="transparent"
				color="#fff"
				_hover={{ color: '#a98841' }}
				_active={{ backgroundColor: 'transparent' }}
				type="submit"
				p={0}
			>
				{logoutDictionary}
			</Button>
		</Box>
	);
};
