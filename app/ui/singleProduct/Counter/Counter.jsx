'use client';

import React, { useState } from 'react';

import { Button, Flex, Input, Text } from '@chakra-ui/react';

import { AnimatePresence, motion } from 'framer-motion';

const Counter = ({ count, setCount, isInBag, dictionary, isBlock }) => {
	const [isValid, setIsValid] = useState(true);

	const decrement = () => {
		if (count === 1) {
			return;
		}
		setCount(count - 1);
		setIsValid(true);
	};

	const increment = () => {
		if (count === 100) {
			return;
		}
		setCount(count + 1);
		setIsValid(true);
	};

	return (
		<>
			<Flex
				pos={'relative'}
				alignItems={'center'}
				justifyContent={'center'}
				border={'1px #3B3D46 solid'}
				maxW={'100%'}
				gap={'10px'}
				px={'24px'}
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
					inputMode="numeric"
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
					onBlur={evt => {
						(evt.currentTarget.value === '' ||
							parseInt(evt.currentTarget.value) <= 0) &&
							setCount(1);
						setIsValid(true);
					}}
					onChange={evt => {
						const value =
							evt.currentTarget.value !== ''
								? parseInt(evt.currentTarget.value)
								: '';

						setCount(value <= 100 ? value : 100);
						setIsValid(value > 100 ? false : true);
					}}
				/>

				<Button
					variant={'link'}
					w={'32px'}
					minW={0}
					textColor={'#fff'}
					onClick={increment}
					isDisabled={isInBag || count === 100}
				>
					+
				</Button>
			</Flex>
			<AnimatePresence>
				{!isValid && (
					<Text
						initial={{
							opacity: 0,
						}}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						as={motion.p}
						pos={isBlock ? 'static' : 'absolute'}
						mt={isBlock ? '10px' : '0'}
						fontSize={'12px'}
						bottom={'-20px'}
						w={'100%'}
						textAlign={'center'}
					>
						{dictionary.bag.limit}
					</Text>
				)}
			</AnimatePresence>
		</>
	);
};

export default Counter;
