import React, { useEffect, useState } from 'react';

import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	CloseButton,
	Flex,
	Text,
} from '@chakra-ui/react';

import ArrowDown from '../../svg/ArrowDown';
import ArrowUp from '../../svg/ArrowUp';

import { motion } from 'framer-motion';

const Filter = ({
	category,
	categories,
	setCategory,
	setSub_category,
	setPage,
	sub_category,
}) => {
	const [displayCategoryTitle, setDisplayCategoryTitle] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const filteredCategory = categories.find(el => el.id === category);
		if (filteredCategory) {
			setDisplayCategoryTitle(filteredCategory.title);
		}
	}, [categories, category]);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, [isOpen]);

	return (
		<Box width={'100%'} display={{ base: 'block', md: 'none' }}>
			<Flex
				position={'relative'}
				justifyContent={'space-between'}
				alignItems={'center'}
				borderBottom={'1px #a28445 solid'}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			>
				<Button
					variant={'ghost'}
					stroke={'white'}
					color={'white'}
					display={'flex'}
					alignItems={'center'}
					transition={'all 0.3s'}
					_hover={{ bg: 'none', color: '#a98841', stroke: '#a98841' }}
				>
					Filter
					<Box as="span" mx={'8px'}>
						{!isOpen ? <ArrowDown /> : <ArrowUp />}
					</Box>
				</Button>
				<Text mx={'16px'}>{category ? displayCategoryTitle : 'All'}</Text>
			</Flex>

			{isOpen && (
				<>
					<Box
						position="fixed"
						top="0"
						left="0"
						width="100%"
						height="100%"
						backgroundColor="rgba(0, 0, 0, 0.2)"
						zIndex="9998"
						onClick={() => setIsOpen(false)}
					/>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
						transition={{ duration: 0.2 }}
						style={{
							position: 'absolute',
							zIndex: isOpen ? '9999' : '',
							width: '94%',
							maxWidth: '400px',
							backgroundColor: '#181617',
							padding: '12px 16px',
							marginTop: isOpen ? '0' : '-20px',
							opacity: isOpen ? '1' : '0',
						}}
					>
						<CloseButton
							ml={'auto'}
							onClick={() => {
								setIsOpen(!isOpen);
							}}
						/>

						<Flex as="ul" flexDir={'column'} gap={'4px'}>
							<Box as={'li'}>
								<Button
									variant={'ghost'}
									display={'flex'}
									fontSize={'16px'}
									fontWeight={'500'}
									transition={'all 0.3s'}
									textAlign={'left'}
									color={category ? 'white' : '#a28445'}
									_hover={{
										bg: 'none',
										// eslint-disable-next-line sonarjs/no-duplicate-string
										transform: 'translateX(5px)',
										color: '#a98841',
									}}
									onClick={() => {
										setPage(1);
										setCategory(null);
										setSub_category(null);
										setIsOpen(false);
									}}
								>
									All
								</Button>
							</Box>
							{categories.map(({ id, title, subCategories }) => (
								<Box as={'li'} key={id}>
									<Accordion allowToggle>
										<AccordionItem
											display={'flex'}
											border={'none'}
											flexDir={'column'}
											color={category !== id ? 'white' : '#a28445'}
										>
											<Box
												display={'flex'}
												gap={'4px'}
												transition={'all 0.1s'}
												_hover={{
													color: '#a98841',
												}}
											>
												<Button
													variant={'ghost'}
													display={'flex'}
													justifyContent={'flex-start'}
													fontSize={'16px'}
													fontWeight={'500'}
													color={category !== id ? 'white' : '#a28445'}
													transition={'all 0.3s'}
													_hover={{
														bg: 'none',
														transform: 'translateX(5px)',
														color: '#a98841',
													}}
													onClick={() => {
														setCategory(id);
														setSub_category(null);
														setPage(1);
														setIsOpen(false);
													}}
												>
													{title}
												</Button>
												{subCategories.length > 0 && (
													<AccordionButton
														display={'inline-flex'}
														justifyContent={'center'}
														alignItems={'center'}
														width={'50px'}
														p={0}
													>
														<AccordionIcon />
													</AccordionButton>
												)}
											</Box>

											<AccordionPanel>
												<Flex
													as="ul"
													flexDir={'column'}
													gap={'4px'}
													alignItems={'flex-start'}
												>
													{subCategories.map(subCategory => (
														<Box as="li" key={subCategory.uid} width={'100%'}>
															<Button
																variant={'ghost'}
																fontSize={'16px'}
																fontWeight={'500'}
																transition={'all 0.3s'}
																_hover={{
																	bg: 'none',
																	transform: 'translateX(5px)',
																	color: '#a98841',
																}}
																color={
																	sub_category !== subCategory.uid
																		? 'white'
																		: '#a28445'
																}
																onClick={() => {
																	setCategory(id);
																	setSub_category(subCategory.uid);
																	setPage(1);
																	setIsOpen(false);
																}}
															>
																{subCategory.title}
															</Button>
														</Box>
													))}
												</Flex>
											</AccordionPanel>
										</AccordionItem>
									</Accordion>
								</Box>
							))}
						</Flex>
					</motion.div>
				</>
			)}
		</Box>
	);
};

export default Filter;
