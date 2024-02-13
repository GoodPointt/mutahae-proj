'use client';

import React from 'react';

import { Button, Flex, Input } from '@chakra-ui/react';

const Counter = ({ count, setCount, isInBag }) => {
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
			px={'32px'}
		>
			<Button
				variant={'link'}
				w={'24px'}
				minW={0}
				textColor={'#fff'}
				onClick={decrement}
				isDisabled={count <= 1 || count === '' || isInBag}
			>
				-
			</Button>

			<Input
				type="number"
				h={'max-content'}
				variant={'unstyled'}
				isDisabled={isInBag}
				w={'100px'}
				minH={0}
				p={'9px'}
				border={'1px transparent solid'}
				_focus={{
					border: '#fff 1px solid',
					_hover: { border: '#fff 1px solid' },
				}}
				_hover={{ border: '1px rgba(255, 255, 255, 0.5) solid' }}
				_disabled={{
					_hover: { border: '1px transparent solid' },
					color: 'rgba(255, 255, 255, 0.5)',
					cursor: 'not-allowed',
				}}
				textAlign={'center'}
				ringColor={'transparent'}
				value={count}
				onBlur={evt =>
					(evt.currentTarget.value === '' || evt.currentTarget.value === '0') &&
					setCount(1)
				}
				onChange={evt =>
					setCount(
						evt.currentTarget.value !== ''
							? parseInt(evt.currentTarget.value)
							: ''
					)
				}
			/>

			<Button
				variant={'link'}
				w={'32px'}
				minW={0}
				textColor={'#fff'}
				onClick={increment}
				isDisabled={isInBag}
			>
				+
			</Button>
		</Flex>
	);
};

export default Counter;
