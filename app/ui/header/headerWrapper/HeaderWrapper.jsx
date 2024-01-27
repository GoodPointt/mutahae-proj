'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import NavBar from '@/app/ui/navbar/NavBar';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';

import Burger from '../../svg/Burger';
import LocaleSwitcher from '../localeSwitcher/LocaleSwitcher';
import MobileMenu from '../mobileMenu/MobileMenu';
import ProfileMenu from '../mobileMenu/profileMenu/ProfileMenu';
import TopBar from '../topBar/TopBar';
import TopMenu from '../topMenu/TopMenu';

const HeaderWrapper = ({ lang, dictionary, contacts, authToken }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();

	const [scrolling, setScrolling] = useState(false);
	const [prevScrollPosition, setPrevScrollPosition] = useState(0);
	const [headerStyle, setHeaderStyle] = useState({});

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPosition = window.scrollY;
			const scrollingDown =
				prevScrollPosition < currentScrollPosition &&
				currentScrollPosition > 100;

			setScrolling(scrollingDown);
			setPrevScrollPosition(currentScrollPosition);

			const headerStyleAfterScroll = {
				transition: 'transform 1s ease-in-out',
				transform: scrollingDown ? 'translateY(-100%)' : 'translateY(0)',
			};

			setHeaderStyle(headerStyleAfterScroll);
		};

		const cleanupScroll = () => {
			window.removeEventListener('scroll', handleScroll);
		};

		window.addEventListener('scroll', handleScroll);

		return cleanupScroll;
	}, [prevScrollPosition, scrolling]);

	return (
		<SectionWrapper
			as={'header'}
			position={'fixed'}
			w="100%"
			bg="linear-gradient(180deg, rgba(0,0,0,1) 16%, rgba(66,72,80,0) 98%)"
			py={{ base: '12px', lg: '16px', xl: '18px' }}
			pt="0"
			zIndex="99"
			style={headerStyle}
		>
			<Box
				display={{ base: 'none', lg: 'flex' }}
				alignItems={'center'}
				justifyContent={'space-between'}
			>
				<TopBar lang={lang} contacts={contacts} authToken={authToken} />
				<LocaleSwitcher />
			</Box>
			<Flex justify={'space-between'} alignItems={'center'} py={'16px'}>
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

				<Box display={{ base: 'flex', lg: 'none' }} gap={{ sm: '40px' }}>
					<TopMenu
						displayIcons={['SEARCH_ICON', 'BAG_ICON']}
						lang={lang}
						authToken={authToken}
					/>
					<Button
						variant={'ghost'}
						color={'#a98841'}
						_hover={{ color: '#81672e' }}
						transition={'all 0.3s'}
						onClick={onOpen}
						ref={btnRef}
					>
						<Burger />
					</Button>
				</Box>
			</Flex>

			<MobileMenu isOpen={isOpen} onClose={onClose}>
				<NavBar
					flexDir="column"
					lang={lang}
					dictionary={dictionary}
					onClose={onClose}
					visibleIcon={true}
				/>
				<ProfileMenu
					authToken={authToken}
					lang={lang}
					onClose={onClose}
					dictionary={dictionary}
				/>
				<TopBar lang={lang} flexDir="column" gap="32px" contacts={contacts} />
				<LocaleSwitcher />
			</MobileMenu>
		</SectionWrapper>
	);
};

export default HeaderWrapper;
