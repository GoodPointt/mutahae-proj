'use client';

import React from 'react';

import { Button, Text, useMediaQuery } from '@chakra-ui/react';

import BlogPageNavIcon from '../../svg/BagNavIcon';
import Succes from '../../svg/Succes';

import { AnimatePresence, motion } from 'framer-motion';

const IsInBag = ({ isInBag, onOpen }) => {
	const [isMobile] = useMediaQuery('(max-width: 480px)', {
		ssr: true,
		fallback: false,
	});

	return (
		<>
			<AnimatePresence>
				{isInBag && (
					<Button
						key="count"
						position={'relative'}
						variant={'ghost'}
						as={motion.button}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: isMobile ? 45 : -45 }}
						exit={{ opacity: 0, y: isMobile ? 35 : -20 }}
						pos={'absolute'}
						_hover={{ stroke: '#81672e', bgColor: 'transparent' }}
						transition="0.2s easeOut"
						stroke={'#fff'}
						onClick={onOpen}
						p={0}
						top={'0'}
						right={'-2'}
					>
						<Text
							as="span"
							pos={'absolute'}
							borderRadius={'50%'}
							display={'flex'}
							alignItems={'center'}
							justifyContent={'center'}
							bgColor={'#008000'}
							top={'8px'}
							w={'14px'}
							h={'14px'}
							right={'8px'}
							fontSize={'12px'}
							stroke={'#fff'}
						>
							<Succes />
						</Text>
						<BlogPageNavIcon w={32} h={32} />
					</Button>
				)}
			</AnimatePresence>
		</>
	);
};

export default IsInBag;
