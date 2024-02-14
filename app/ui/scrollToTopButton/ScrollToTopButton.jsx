import React, { useEffect, useState } from 'react';

import { IconButton } from '@chakra-ui/react';

import ArrowUp from '../svg/OrderArrowUp';

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 500) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => window.removeEventListener('scroll', toggleVisibility);
	}, []);

	return (
		isVisible && (
			<IconButton
				icon={<ArrowUp />}
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				isRound="true"
				size={'lg'}
				position="fixed"
				bottom="30px"
				right="30px"
				onClick={scrollToTop}
				aria-label="Scroll to top"
				bg={'#a28445b0'}
				zIndex={100}
			/>
		)
	);
};

export default ScrollToTopButton;
