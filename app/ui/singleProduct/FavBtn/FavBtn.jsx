'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@chakra-ui/react';

import Star from '../../svg/Star';

import { motion } from 'framer-motion';

const FavBtn = ({ isFavorite, ...props }) => {
	const { pending } = useFormStatus();

	return (
		<Button
			as={motion.button}
			initial={pending && { opacity: 0 }}
			animate={pending && { opacity: 1 }}
			type="submit"
			variant={'unstyled'}
			display={'flex'}
			justifyContent={'center'}
			isDisabled={pending}
			stroke="#A28445"
			fill={isFavorite ? '#A28445' : 'transparent'}
			_hover={{
				stroke: '#dab462',
				fill: isFavorite ? '#dab462' : 'transparent',
				transform: 'scale(1.13)',
			}}
			_disabled={{
				stroke: '#a28445b0',
				fill: isFavorite ? '#a28445b0' : 'transparent',
				_hover: {
					transform: 'scale(1)',
					cursor: 'not-allowed',
					stroke: '#a28445b0',
				},
			}}
			minW={0}
			p={'12px'}
			{...props}
		>
			<Star />
		</Button>
	);
};
export default FavBtn;
