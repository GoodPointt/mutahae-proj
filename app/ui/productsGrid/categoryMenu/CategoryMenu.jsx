import { useEffect, useRef } from 'react';

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

const CategoryMenu = ({
	subCategories,
	id,
	setCategory,
	setSub_category,
	setPage,
	sub_category,
	title,
	category,
	dictionary,
}) => {
	const initRef = useRef();
	const popoverCloseRef = useRef();

	useEffect(() => {
		let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

		const handleScroll = () => {
			let scrollTop = window.scrollY || document.documentElement.scrollTop;

			if (Math.abs(scrollTop - lastScrollTop) > 30 && popoverCloseRef.current) {
				popoverCloseRef.current();
			}

			lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<Popover closeOnBlur={true} placement="bottom" initialFocusRef={initRef}>
			{({ isOpen, onClose }) => {
				popoverCloseRef.current = onClose;

				return (
					<>
						{subCategories.length > 0 && (
							<PopoverTrigger>
								<Flex>
									{title}
									{isOpen ? <ArrowUp /> : <ArrowDown />}
								</Flex>
							</PopoverTrigger>
						)}

						<Portal>
							<PopoverContent
								bg={'#191617'}
								border={'none'}
								alignItems={'center'}
							>
								<PopoverBody display={'flex'} flexDir={'column'}>
									<Flex as="ul" flexDir={'column'} gap={'4px'}>
										<Box as="li" key={'All'} width={'100%'}>
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
												color={category ? 'white' : '#a28445'}
												onMouseDown={() => onClose()}
												onClick={() => {
													setSub_category(null);
													onClose();
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
														sub_category !== subCategory.uid
															? 'white'
															: '#a28445'
													}
													onMouseDown={() => onClose()}
													onClick={() => {
														setCategory(id),
															setSub_category(subCategory.uid),
															setPage(1),
															onClose();
													}}
												>
													{subCategory.title}
												</Button>
											</Box>
										))}
									</Flex>
								</PopoverBody>
							</PopoverContent>
						</Portal>
					</>
				);
			}}
		</Popover>
	);
};

export default CategoryMenu;
