'use client';

import React from 'react';
import Link from 'next/link';

// import { usePathname } from 'next/navigation';
import FavoriteNavIcon from '@/app/ui/svg/FavoriteNavIcon';
import ProfileNavIcon from '@/app/ui/svg/ProfileNavIcon';

import { Box, Flex } from '@chakra-ui/react';

const ProfileMenu = ({ hasToken, lang, onClose, dictionary }) => {
	// const pathname = usePathname();

	const profilePathname = hasToken ? `/${lang}/profile` : `/${lang}/auth/login`;
	const favoritePathname = `/${lang}/profile`;

	// const isActive =
	// pathname.includes(profilePathname) || pathname.includes(favoritePathname);

	return (
		<Flex as={'ul'} flexDir={'column'} gap={'20px'}>
			<Box
				as={'li'}
				onClick={onClose}
				fontSize={'18px'}
				fontWeight={'400'}
				transition={'all 0.3s'}
				_hover={{
					transform: 'translateX(5px)',
					cursor: 'pointer',
					color: '#a98841',
				}}
			>
				<Flex
					as={Link}
					href={profilePathname}
					stroke={'#FFFFFF'}
					flexDir={'row'}
					// color={isActive ? '#a98841' : 'inherit'}
					transition={'stroke 0.3s'}
					_hover={{ stroke: '#a98841' }}
				>
					<ProfileNavIcon />
					<Box as={'span'} mx={'9px'}>
						{dictionary.profileMobileMenu.profile}
					</Box>
				</Flex>
			</Box>
			{hasToken && (
				<Box
					as={'li'}
					fontSize={'18px'}
					fontWeight={'400'}
					transition={'all 0.3s'}
					_hover={{
						transform: 'translateX(5px)',
						cursor: 'pointer',
						color: '#a98841',
					}}
					onClick={onClose}
				>
					<Flex
						as={Link}
						href={favoritePathname}
						fill={'#FFFFFF'}
						stroke={'#FFFFFF'}
						flexDir={'row'}
						// color={isActive ? '#a98841' : 'inherit'}

						transition={'stroke 0.3s'}
						_hover={{ stroke: '#a98841' }}
					>
						<FavoriteNavIcon />
						<Box as={'span'} mx={'9px'}>
							{dictionary.profileMobileMenu.favorite}
						</Box>
					</Flex>
				</Box>
			)}
		</Flex>
	);
};

export default ProfileMenu;
