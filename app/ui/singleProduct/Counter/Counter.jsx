'use client';

import React from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

const Counter = ({ count, setCount }) => {
	const decrement = () => {
		if (count === 1) {
			return;
		}
		setCount(count - 1);
	};

	const increment = () => {
		setCount(count + 1);
	};

	return (
		<Flex
			alignItems={'center'}
			justifyContent={'center'}
			gap={'40px'}
			border={'1px #3B3D46 solid'}
			maxW={'100%'}
			py={'9px'}
			px={'40px'}
		>
			<Button
				variant={'link'}
				w={'16px'}
				minW={0}
				textColor={'#fff'}
				onClick={decrement}
				isDisabled={count === 1}
			>
				-
			</Button>

			<Text w={'25px'} textAlign={'center'}>
				{count}
			</Text>
			<Button
				variant={'link'}
				w={'16px'}
				minW={0}
				textColor={'#fff'}
				onClick={increment}
			>
				+
			</Button>
		</Flex>
	);
};

export default Counter;
