import React, { useEffect, useState } from 'react';

import {
	Box,
	Button,
	CloseButton,
	Flex,
	useMediaQuery,
} from '@chakra-ui/react';

import ArrowDown from '../../svg/ArrowDown';
import ArrowToSortDown from '../../svg/ArrowToSortDown';
import ArrowToSortUp from '../../svg/ArrowToSortUp';
import ArrowUp from '../../svg/ArrowUp';

import { motion } from 'framer-motion';

const SortMenu = ({
	sortValues,
	toggleSort,
	sortOrder,
	sortValue,
	dictionary,
	lang,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isLargerThan768] = useMediaQuery('(min-width: 768px)');

	useEffect(() => {
		if (isLargerThan768) {
			setIsOpen(true);
		}
	}, [isLargerThan768]);

	const getTranslation = key => {
		const item = dictionary.sort.find(item => Object.keys(item)[0] === key);

		return item ? item[key] : key;
	};

	return (
		<>
			<Flex
				display={{ base: 'flex', md: 'none' }}
				position={'relative'}
				my={'12px'}
			>
				<Button
					variant={'ghost'}
					color={'white'}
					fontSize={'16px'}
					fontWeight={'500'}
					fill={'white'}
					stroke={'white'}
					_hover={{ bg: 'transparent' }}
					onClick={() => {
						setIsOpen(!isOpen);
					}}
				>
					Sort{isOpen ? <ArrowUp /> : <ArrowDown />}
				</Button>

				{isOpen && (
					<>
						<Box
							position="fixed"
							top="0"
							left="0"
							bottom={'0'}
							right={'0'}
							width="100%"
							height="100%"
							backgroundColor="rgba(0, 0, 0, 0.2)"
							zIndex="98"
							onClick={() => setIsOpen(!isOpen)}
						/>

						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
							transition={{ duration: 0.2 }}
							style={{
								position: 'absolute',
								top: '50px',
								zIndex: isOpen ? '99' : '',
								width: '100%',
								maxHeight: '80dvh',
								maxWidth: '400px',
								backgroundColor: '#181617',
								padding: '12px 16px 32px 16px',
								marginTop: isOpen ? '0' : '-20px',
								opacity: isOpen ? '1' : '0',
								overflowY: 'auto',
							}}
						>
							<CloseButton
								ml={lang === 'en' && 'auto'}
								mr={lang === 'he' && 'auto'}
								onClick={() => {
									setIsOpen(!isOpen);
								}}
							/>
							<Flex
								as={'ul'}
								gap={'8px'}
								my={'4px'}
								justifyContent={'flex-end'}
								flexDir={{ base: 'column', md: 'row' }}
							>
								{sortValues.map(el => (
									<Box as="li" key={el}>
										<Button
											variant={'ghost'}
											color={'white'}
											fontSize={'16px'}
											fontWeight={'500'}
											_hover={{ bg: 'transparent' }}
											onClick={() => {
												toggleSort(`${el}`);
												!isLargerThan768 && setIsOpen(!isOpen);
											}}
											fill={'white'}
											stroke={'white'}
										>
											{getTranslation(el)}
											{el === sortValue && sortOrder !== 'asc' ? (
												<ArrowToSortUp />
											) : (
												<ArrowToSortDown />
											)}
										</Button>
									</Box>
								))}
							</Flex>
						</motion.div>
					</>
				)}
			</Flex>

			<Flex
				as={'ul'}
				gap={'8px'}
				my={'8px'}
				justifyContent={'flex-end'}
				display={{ base: 'none', md: 'flex' }}
				flexDir={{ base: 'column', md: 'row' }}
			>
				{sortValues.map(el => (
					<Box as="li" key={el}>
						<Button
							variant={'ghost'}
							color={'white'}
							fontSize={'16px'}
							fontWeight={'500'}
							_hover={{ bg: 'transparent' }}
							onClick={() => {
								toggleSort(`${el}`);
								!isLargerThan768 && setIsOpen(!isOpen);
							}}
							fill={'white'}
							stroke={'white'}
						>
							{getTranslation(el)}
							{el === sortValue && sortOrder !== 'asc' ? (
								<ArrowToSortUp />
							) : (
								<ArrowToSortDown />
							)}
						</Button>
					</Box>
				))}
			</Flex>
		</>
	);
};

export default SortMenu;
