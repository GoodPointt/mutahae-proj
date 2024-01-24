'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, theme } from '@chakra-ui/react';

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
				{children}
			</ChakraProvider>
		</CacheProvider>
	);
};
export default Providers;
