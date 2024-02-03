import React, { useEffect, useState } from 'react';

import { Button } from '@chakra-ui/react';

const ScrollToTop = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 500) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener('scroll', toggleVisibility);

		return () => {
			window.removeEventListener('scroll', toggleVisibility);
		};
	}, []);

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<Button
			onClick={scrollToTop}
			position="fixed"
			bottom="30px"
			right="20px"
			bgColor={'#a9884173'}
			color={'white'}
			display={isVisible ? 'block' : 'none'}
			zIndex="1000"
		>
			up
		</Button>
	);
};

export default ScrollToTop;
