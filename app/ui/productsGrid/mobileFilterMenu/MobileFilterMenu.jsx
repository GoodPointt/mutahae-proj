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

const MobileFilterMenu = ({
	category,
	categories,
	setCategory,
	setSub_category,
	setPage,
	sub_category,
	dictionary,
	lang,
}) => {
	const [displayCategoryTitle, setDisplayCategoryTitle] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	// const [showPlaceholder, setShowPlaceholder] = useState(false);
	// const [prevScrollPosition, setPrevScrollPosition] = useState(0);
	// const [mobileFilterStyle, setMobileFilterStyle] = useState({});

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}, [isOpen]);

	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		const currentScrollPosition = window.scrollY;
	// 		const scrollingUp = prevScrollPosition > currentScrollPosition;

	// 		setPrevScrollPosition(currentScrollPosition);

	// 		if (isOpen) {
	// 			setMobileFilterStyle({
	// 				position: 'fixed',
	// 				top: '90px',
	// 				zIndex: 99,
	// 				// eslint-disable-next-line sonarjs/no-duplicate-string
	// 				transition: 'all 1.5s ease-in-out, opacity 0.5s ease-in-out',
	// 				transform: 'translateY(0)',
	// 				width: '95%',
	// 				background: 'linear-gradient(to right, #434343 0%, black 100%)',
	// 				opacity: 1,
	// 			});
	// 			setShowPlaceholder(true);

	// 			return;
	// 		}

	// 		let mobileFilterStyleAfterScroll;

	// 		if (currentScrollPosition <= 90) {
	// 			mobileFilterStyleAfterScroll = {
	// 				opacity: 1,
	// 			};
	// 			setShowPlaceholder(false);
	// 		} else if (scrollingUp) {
	// 			mobileFilterStyleAfterScroll = {
	// 				position: 'fixed',
	// 				top: '90px',
	// 				zIndex: 99,
	// 				transition: 'all 1.5s ease-in-out, opacity 0.5s ease-in-out',
	// 				transform: 'translateY(0)',
	// 				width: '95%',
	// 				background: 'linear-gradient(to right, #434343 0%, black 100%)',
	// 				opacity: 1,
	// 			};
	// 			setShowPlaceholder(true);
	// 		} else {
	// 			mobileFilterStyleAfterScroll = {
	// 				position: 'fixed',
	// 				top: '0',
	// 				zIndex: 99,
	// 				transition: 'all 1.5s ease-in-out, opacity 0.5s ease-in-out',
	// 				transform: 'translateY(-100%)',
	// 				opacity: 0,
	// 			};
	// 			setShowPlaceholder(true);
	// 		}

	// 		setMobileFilterStyle(mobileFilterStyleAfterScroll);
	// 	};

	// 	window.addEventListener('scroll', handleScroll);

	// 	return () => {
	// 		window.removeEventListener('scroll', handleScroll);
	// 	};
	// }, [prevScrollPosition, isOpen]);

	useEffect(() => {
		const filteredCategory = categories.find(el => el.id === category);
		if (filteredCategory) {
			setDisplayCategoryTitle(filteredCategory.title);
		}
	}, [categories, category]);

	return (
		<>
			{/* {showPlaceholder && (
				<Box as="div" h={'65px'} display={showPlaceholder ? 'block' : 'none'} />
			)} */}
			<Box
				width={'100%'}
				display={{ base: 'block', md: 'none' }}
				mb={'2.5rem'}
				// style={mobileFilterStyle}
			>
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
						{dictionary.catalogPage.menu.filter}
						<Box as="span" mx={'8px'}>
							{!isOpen ? <ArrowDown /> : <ArrowUp />}
						</Box>
					</Button>
					<Text mx={'16px'}>
						{category
							? displayCategoryTitle
							: `${dictionary.catalogPage.menu.all}`}
					</Text>
				</Flex>

				{isOpen && (
					<>
						<Box
							position="absolute"
							top="0"
							left="0"
							bottom={'0'}
							right={'0'}
							width="100%"
							height="100%"
							backgroundColor="rgba(0, 0, 0, 0.2)"
							zIndex="98"
							onClick={() => setIsOpen(false)}
						/>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
							transition={{ duration: 0.2 }}
							style={{
								position: 'absolute',
								zIndex: isOpen ? '99' : '',
								width: '100%',
								maxHeight: '80dvh',
								maxWidth: '400px',
								backgroundColor: '#181617',
								padding: '12px 16px',
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
										{dictionary.catalogPage.menu.all}
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
													{subCategories.length > 0 && (
														<AccordionButton>
															{title}
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
														<Box as={'li'}>
															<Button
																variant={'ghost'}
																display={'flex'}
																justifyContent={'flex-start'}
																fontSize={'16px'}
																fontWeight={'500'}
																color={category ? 'white' : '#a28445'}
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
																	window.scrollTo({
																		top: 0,
																		behavior: 'smooth',
																	});
																}}
															>
																{dictionary.catalogPage.menu.all}
															</Button>
														</Box>
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
																		(category === id &&
																			sub_category === subCategory.uid &&
																			'#a28445') ||
																		'white'
																	}
																	onClick={() => {
																		setCategory(id);
																		setSub_category(subCategory.uid);
																		setPage(1);
																		setIsOpen(false);
																		window.scrollTo({
																			top: 0,
																			behavior: 'smooth',
																		});
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
		</>
	);
};

export default MobileFilterMenu;
