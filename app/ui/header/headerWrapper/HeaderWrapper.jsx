/* eslint-disable sonarjs/no-duplicate-string */
'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import NavBar from '@/app/ui/navbar/NavBar';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import ContactsList from '../../contactsList/ContactsList';
import LocaleSwitcher from '../../localeSwitcher/LocaleSwitcher';
import Burger from '../../svg/Burger';
import MobileMenu from '../mobileMenu/MobileMenu';
import ToolBar from '../toolBar/ToolBar';

const HeaderWrapper = ({ lang, dictionary, contacts, bagData, isAuth }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	const [hasToken, setHasToken] = useState(false);
	const [scrolling, setScrolling] = useState(false);
	const [prevScrollPosition, setPrevScrollPosition] = useState(0);
	const [headerStyle, setHeaderStyle] = useState({});

	useEffect(() => {
		setHasToken(isAuth);
	}, [isAuth]);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPosition = window.scrollY;
			const scrollingDown =
				prevScrollPosition < currentScrollPosition &&
				currentScrollPosition > 100;

			setScrolling(scrollingDown);
			setPrevScrollPosition(currentScrollPosition);

			const headerStyleAfterScroll = {
				transition: 'transform 1.5s ease-in-out',
				transform: scrollingDown ? 'translateY(-100%)' : 'translateY(0)',
			};

			setHeaderStyle(headerStyleAfterScroll);
		};

		const cleanupScroll = () => {
			window.removeEventListener('scroll', handleScroll);
		};

		window.addEventListener('scroll', handleScroll);

		if (hasToken) {
			localStorage.removeItem('localBag');
		}

		return cleanupScroll;
	}, [hasToken, prevScrollPosition, scrolling]);

	return (
		<SectionWrapper
			as={'header'}
			position={'fixed'}
			w="100%"
			bg="linear-gradient(180deg, rgba(0,0,0,1) 16%, rgba(66,72,80,0) 98%)"
			zIndex="99"
			pb={{ base: '12px', lg: '16px' }}
			pt={'12px'}
			py={'0'}
			style={headerStyle}
		>
			<Flex
				alignItems={'center'}
				justifyContent={'space-between'}
				display={{ base: 'none', lg: 'flex' }}
			>
				<ContactsList lang={lang} contacts={contacts} />

				<ToolBar
					lang={lang}
					hasToken={hasToken}
					bagData={bagData}
					dictionary={dictionary}
				/>
				<LocaleSwitcher />
			</Flex>

			<Flex justify={'space-between'} alignItems={'center'}>
				<Link href={'/' + lang}>
					<Image
						src={'/img/logo.png'}
						alt="logo"
						width="180"
						height="60"
						style={{
							objectFit: 'cover',
							width: 180,
							height: 60,
							display: 'block',
						}}
					/>
				</Link>
				<Box as="nav" display={{ base: 'none', lg: 'block' }}>
					<NavBar
						lang={lang}
						flexDir="row"
						dictionary={dictionary}
						onClose={onClose}
					/>
				</Box>

				<Flex
					alignItems={'center'}
					justifyContent={'space-between'}
					display={{ base: 'flex', lg: 'none' }}
				>
					<ToolBar
						lang={lang}
						hasToken={hasToken}
						bagData={bagData}
						dictionary={dictionary}
						displayIcons={['SEARCH_ICON', 'BAG_ICON']}
					/>

					<Button
						display={{ base: 'block', lg: 'none' }}
						variant={'ghost'}
						color={'#a98841'}
						_hover={{ color: '#81672e' }}
						transition={'all 0.3s'}
						onClick={onOpen}
						ref={btnRef}
					>
						<Burger />
					</Button>
				</Flex>
			</Flex>

			<MobileMenu
				isOpen={isOpen}
				onClose={onClose}
				hasToken={hasToken}
				lang={lang}
				dictionary={dictionary}
			/>
		</SectionWrapper>
	);
};

export default HeaderWrapper;
