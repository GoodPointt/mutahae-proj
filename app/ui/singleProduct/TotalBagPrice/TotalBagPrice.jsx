'use client';
import React from 'react';

import { Text } from '@chakra-ui/react';

import { AnimatePresence, motion } from 'framer-motion';

const TotalBagPrice = ({ count, totalPrice, isCentered, dictionary }) => {
	return (
		<>
			<AnimatePresence>
				{count && count > 1 && totalPrice !== 0 ? (
					<Text
						key="count"
						as={motion.p}
						initial={{
							opacity: 0,
							y: -20,
							translateX: isCentered && '-50%',
						}}
						animate={{ opacity: 1, y: -30 }}
						exit={{ opacity: 0, y: -20 }}
						pos={'absolute'}
						transition="0.2s easeOut"
						top={'0'}
						left={isCentered ? '50%' : '0'}
					>
						{dictionary.bag.total}: {totalPrice} ₪
					</Text>
				) : null}
			</AnimatePresence>
		</>
	);
};

export default TotalBagPrice;
