import React from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '@chakra-ui/react';

import Star from '../../svg/Star';

const FavBtn = ({ isFavorite, ...props }) => {
	const { pending } = useFormStatus();

	return (
		<Button
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
				_hover: {
					transform: 'scale(1)',
					cursor: 'not-allowed',
				},
				stroke: '#91773e',
				fill: '#91773e',
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
