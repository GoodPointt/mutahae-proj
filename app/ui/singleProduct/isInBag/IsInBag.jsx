'use client';

import React from 'react';

import { Box, Button, Text } from '@chakra-ui/react';

import BlogPageNavIcon from '../../svg/BagNavIcon';
import Succes from '../../svg/Succes';

import { AnimatePresence, motion } from 'framer-motion';

const IsInBag = ({ isInBag, onOpen, dictionary }) => {
	return (
		<>
			<AnimatePresence>
				{isInBag && (
					<Button
						key="count"
						as={motion.button}
						variant={'ghost'}
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 0 }}
						_hover={{
							stroke: '#81672e',
							color: '#81672e',
							bgColor: 'transparent',
							_after: { bgColor: '#81672e' },
						}}
						transitionDuration={'0.2s'}
						transitionTimingFunction={'ease'}
						stroke={'#fff'}
						onClick={onOpen}
						p={0}
						color={'#fff'}
						alignItems={'center'}
						gap={'10px'}
						sx={{
							'&:hover': {
								'> p::after': {
									bgColor: '#81672e',
								},
							},
						}}
					>
						<Box pos={'relative'} maxW={'max-content'}>
							<Text
								as="span"
								pos={'absolute'}
								borderRadius={'50%'}
								display={'flex'}
								alignItems={'center'}
								justifyContent={'center'}
								bgColor={'#008000'}
								top={'0px'}
								right={'0px'}
								w={'14px'}
								h={'14px'}
								fontSize={'12px'}
								stroke={'#fff'}
							>
								<Succes />
							</Text>
							<BlogPageNavIcon w={32} h={32} />
						</Box>
						<Text
							pos={'relative'}
							_after={{
								content: '""',
								pos: 'absolute',
								bottom: '-2px',
								left: 0,
								display: 'block',
								h: '1px',
								w: '100%',
								bgColor: '#fff',
								transitionDuration: '0.2s',
								transitionTimingFunction: 'ease-in-out',
							}}
						>
							{dictionary.buttons.inBag}
						</Text>
					</Button>
				)}
			</AnimatePresence>
		</>
	);
};

export default IsInBag;
