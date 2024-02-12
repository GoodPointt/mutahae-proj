'use client';
import React from 'react';

import { Text, useMediaQuery } from '@chakra-ui/react';

import { AnimatePresence, motion } from 'framer-motion';

const TotalBagPrice = ({ count, totalPrice, isCentered }) => {
	const [isMobile] = useMediaQuery('(max-width: 480px)', {
		ssr: true,
		fallback: false,
	});

	return (
		<>
			<AnimatePresence>
				{count && count > 1 && totalPrice !== 0 ? (
					<Text
						key="count"
						as={motion.p}
						initial={{
							opacity: 0,
							y: isMobile ? 33 : -20,
							translateX: isCentered && '-50%',
						}}
						animate={{ opacity: 1, y: isMobile ? 55 : -30 }}
						exit={{ opacity: 0, y: isMobile ? 33 : -20 }}
						pos={'absolute'}
						transition="0.2s easeOut"
						top={'0'}
						left={isCentered ? '50%' : '0'}
					>
						Total: {totalPrice}₪
					</Text>
				) : null}
			</AnimatePresence>
		</>
	);
};

export default TotalBagPrice;
