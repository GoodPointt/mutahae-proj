'use client';
import React from 'react';

import { Text, useMediaQuery } from '@chakra-ui/react';

import { AnimatePresence, motion } from 'framer-motion';

const TotalBagPrice = ({ count, totalPrice }) => {
	const [isMobile] = useMediaQuery('(max-width: 480px)', {
		ssr: true,
		fallback: false,
	});

	return (
		<>
			<AnimatePresence>
				{count !== 1 ? (
					<Text
						key="count"
						as={motion.p}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: isMobile ? 55 : -30 }}
						exit={{ opacity: 0, y: -20 }}
						pos={'absolute'}
						transition="0.2s easeOut"
						top={'0'}
						left={'0'}
					>
						Total: {totalPrice}₪
					</Text>
				) : null}
			</AnimatePresence>
		</>
	);
};

export default TotalBagPrice;
