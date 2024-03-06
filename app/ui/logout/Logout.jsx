'use client';

import { useFormState } from 'react-dom';

// import { useRouter } from 'next/navigation';
import { Box, Button } from '@chakra-ui/react';

import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { logout } from '../../lib/actions';

export const Logout = ({ logoutDictionary, lang }) => {
	// eslint-disable-next-line no-unused-vars
	const [state, dispatch] = useFormState(logout, null);
	const [, setLocalBag] = useLocalBag('localBag');
	// const router = useRouter();

	// useEffect(() => {
	// 	if (state?.status === 200) {
	// 		// localStorage.removeItem('favs');
	// 		localStorage.clear();
	// 		setLocalBag([]);
	// 		router.refresh();
	// 	}
	// }, [router, setLocalBag, state]);

	return (
		<Box
			as="form"
			action={() => {
				setLocalBag([]);
				localStorage.clear();
				dispatch({ lang });
			}}
		>
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
