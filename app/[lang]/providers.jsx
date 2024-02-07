'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, theme } from '@chakra-ui/react';

import { LocalBagProvider } from '../lib/hooks/useLocalBag';

const Providers = ({ children }) => {
	return (
		<CacheProvider>
			<ChakraProvider
				heme={theme}
				toastOptions={{
					defaultOptions: {
						position: 'top-right',
						duration: 3500,
						isClosable: false,
					},
				}}
			>
				<LocalBagProvider>{children}</LocalBagProvider>
			</ChakraProvider>
		</CacheProvider>
	);
};
export default Providers;
