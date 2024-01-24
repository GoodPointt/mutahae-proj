'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { motion } from 'framer-motion';

const variants = {
	out: {
		opacity: 0,
	},
	in: {
		opacity: 1,
		transition: {
			duration: 0.5,
		},
	},
};

const AnimatedMain = ({ children }) => {
	const path = usePathname();

	return (
		<motion.main
			style={{
				overflow: 'hidden',
			}}
			key={path}
			variants={variants}
			animate="in"
			initial="out"
			exit="out"
		>
			{children}
		</motion.main>
	);
};

export default AnimatedMain;
