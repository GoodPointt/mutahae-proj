import Link from 'next/link';

import { Box } from '@chakra-ui/react';

const BottomBar = () => {
	return (
		<Box
			fontSize={'16px'}
			textAlign={{ base: 'center', md: 'unset' }}
			transition={'all 0.3s'}
			_hover={{ color: '#a98841' }}
			mt={'12px'}
		>
			<Link href={'mailto:7ty.dev@gmail.com'}>Created by SevenTy</Link>
		</Box>
	);
};

export default BottomBar;
