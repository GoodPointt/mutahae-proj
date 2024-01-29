'use client';
import React from 'react';
import { useFormState } from 'react-dom';

import { Box, Button } from '@chakra-ui/react';

import { logout } from '../../lib/actions';

export const Logout = () => {
	// eslint-disable-next-line no-unused-vars
	const [state, dispatch] = useFormState(logout, null);

	return (
		<Box as="form" action={dispatch}>
			<Button
				bg="transparent"
				color="#fff"
				_hover={{ color: '#a98841' }}
				_active={{ backgroundColor: 'transparent' }}
				type="submit"
				p={0}
			>
				logout
			</Button>
		</Box>
	);
};
