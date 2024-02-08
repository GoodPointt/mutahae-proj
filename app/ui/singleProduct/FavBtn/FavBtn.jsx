'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@chakra-ui/react';

import Star from '../../svg/Star';

const FavBtn = props => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" isDisabled={pending} {...props}>
			<Star />
		</Button>
	);
};
export default FavBtn;
