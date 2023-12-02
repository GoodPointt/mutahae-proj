// 'use client';

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import NavBar from '@/app/ui/navbar/NavBar';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import TopBar from './topBar/TopBar';
import { GiHamburgerMenu } from 'react-icons/gi';
import MobileMenu from './mobileMenu/MobileMenu';
import LocaleSwitcher from './localeSwitcher/LocaleSwitcher';

const Header = ({ lang }) => {
	// const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<SectionWrapper
			as={'header'}
			bg="black"
			py={{ base: '12px', lg: '16px', xl: '18px' }}
			pt="0">
			<Box display={{ base: 'none', lg: 'block' }}>
				<TopBar lang={lang} />
			</Box>
			<Flex
				justify={'space-between'}
				alignItems={'center'}
				py={'16px'}>
				<Link href={'/' + lang}>
					<Image
						src={'/logo.png'}
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
				<Box
					as="nav"
					display={{ base: 'none', lg: 'block' }}>
					<NavBar
						lang={lang}
						flexDir="row"
					/>
				</Box>
				<Box
					display={{ base: 'block', lg: 'none' }}
					mr={'8px'}>
					<Button
						variant={'unstyled'}
						color={'#a98841'}
						_hover={{ color: '#81672e' }}
						transition={'all 0.3s'}>
						<GiHamburgerMenu size={'40'} />
					</Button>
				</Box>
			</Flex>
			<MobileMenu>
				<NavBar
					flexDir="column"
					lang={lang}
				/>
				<TopBar
					lang={lang}
					flexDir="column"
					gap="32px"
				/>
			</MobileMenu>
		</SectionWrapper>
	);
};

export default Header;
