import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import {
	Box,
	Button,
	Flex,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Portal,
} from '@chakra-ui/react';

import ArrowDown from '../../svg/ArrowDown';
import ArrowUp from '../../svg/ArrowUp';

const FooterProductsList = ({ products, lang }) => {
	const [categories, setCategories] = useState([]);
	const initRef = useRef();

	useEffect(() => {
		if (!products) return;

		const dataCategory = products.map(item => ({
			title: item.attributes.title,
			id: item.attributes.uid,
			subCategories: item.attributes.sub_categories.data,
			goods: item.attributes.goods.data,
		}));

		const fitredData = dataCategory.filter(item => item.goods.length > 0);

		const categoriesArr = fitredData.reduce((acc, item) => {
			const { title, id } = item;
			const subCategoriesSet = new Set();
			item.goods.forEach(good => {
				good.attributes.sub_categories.data.forEach(subCat => {
					subCategoriesSet.add(
						JSON.stringify({
							uid: subCat.attributes.uid,
							title: subCat.attributes.title,
						})
					);
				});
			});

			const subCategories = Array.from(subCategoriesSet).map(subCat =>
				JSON.parse(subCat)
			);

			acc.push({ title, id, subCategories });

			return acc;
		}, []);

		const sortedCategoriesArr = categoriesArr.sort(
			(a, b) => parseInt(a.id) - parseInt(b.id)
		);

		setCategories(sortedCategoriesArr);
	}, [products]);

	return (
		<Flex
			as="ul"
			gap={'20px'}
			flexDir={{ base: 'column', md: 'row' }}
			wrap={'wrap'}
			mb={{ base: '52px', lg: '42px' }}
			fontSize={'15px'}
		>
			{categories &&
				categories.map(({ id, title, subCategories }) => (
					<Flex
						as="li"
						key={id}
						alignItems={'center'}
						justifyContent={'center'}
						align={'center'}
						gap={'5px'}
						fontSize={'18px'}
						transition={'all 0.3s'}
						stroke={'white'}
						_hover={{
							cursor: 'pointer',
							color: '#a98841',
							stroke: '#a98841',
						}}
					>
						<Link href={`/${lang}/catalog?category=${id}`}>{title}</Link>
						<Box as="ul">
							{' '}
							<Box as="li" key={subCategories}>
								<Popover
									closeOnBlur={true}
									placement="bottom"
									initialFocusRef={initRef}
									width={'50%'}
									flip={false}
								>
									{({ isOpen, onClose }) => (
										<>
											{subCategories.length > 0 && (
												<PopoverTrigger>
													<Button
														variant={'ghost'}
														_hover={{
															bg: 'none',
														}}
													>
														{isOpen ? <ArrowUp /> : <ArrowDown />}
													</Button>
												</PopoverTrigger>
											)}
											<Portal>
												<PopoverContent
													bg={'#191617'}
													border={'none'}
													maxW={'200px'}
												>
													<PopoverBody
														display={'flex'}
														flexDir={'column'}
														alignItems={'center'}
													>
														<Flex as="ul" flexDir={'column'} gap={'4px'}>
															{subCategories.map(subCategory => (
																<Box
																	as="li"
																	key={subCategory.uid}
																	transition={'all 0.3s'}
																	_hover={{
																		cursor: 'pointer',
																		color: '#a98841',
																	}}
																>
																	<Link
																		href={`/${lang}/catalog?category=${id}&sub_category=${subCategory.uid}`}
																		onMouseDown={() => {
																			onClose();
																		}}
																		onClick={() => {
																			onClose();
																		}}
																	>
																		{subCategory.title}
																	</Link>
																</Box>
															))}
														</Flex>
													</PopoverBody>
												</PopoverContent>
											</Portal>
										</>
									)}
								</Popover>
							</Box>
						</Box>
					</Flex>
				))}
		</Flex>
	);
};

export default FooterProductsList;
