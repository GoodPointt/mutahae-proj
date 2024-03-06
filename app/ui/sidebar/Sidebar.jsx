'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { List, ListItem } from '@chakra-ui/react';

import { Logout } from '../logout/Logout';

export const Sidebar = ({ lang, sidebarDictionary }) => {
	const pathname = usePathname();

	const { favorites, contactInformation, historyOfOrders, logout } =
		sidebarDictionary;

	const profileRoutes = {
		favorites: `/${lang}/profile/favorites`,
		contactInfo: `/${lang}/profile`,
		historyOfOrders: `/${lang}/profile/history-of-ordres`,
	};

	return (
		<List>
			<ListItem
				mb="12px"
				fontSize="20px"
				color={pathname === profileRoutes.favorites ? '#a98841' : 'inherit'}
				_hover={{ color: '#a98841' }}
				_active={{ backgroundColor: 'transparent' }}
			>
				<Link
					href={profileRoutes.favorites}
					style={{
						display: 'flex',
						// eslint-disable-next-line sonarjs/no-duplicate-string
						justifyContent: 'space-between',
						alignContent: 'center',
					}}
				>
					{favorites}
				</Link>
			</ListItem>
			<ListItem
				mb="12px"
				fontSize="20px"
				color={pathname === profileRoutes.contactInfo ? '#a98841' : 'inherit'}
				_hover={{ color: '#a98841' }}
				_active={{ backgroundColor: 'transparent' }}
			>
				<Link
					href={profileRoutes.contactInfo}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignContent: 'center',
					}}
				>
					{contactInformation}
				</Link>
			</ListItem>
			<ListItem
				mb="40px"
				fontSize="20px"
				color={
					pathname === profileRoutes.historyOfOrders ? '#a98841' : 'inherit'
				}
				_hover={{ color: '#a98841' }}
				_active={{ backgroundColor: 'transparent' }}
			>
				<Link
					href={profileRoutes.historyOfOrders}
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignContent: 'center',
					}}
				>
					{historyOfOrders}
				</Link>
			</ListItem>
			<ListItem fontSize="20px" color="#808080">
				<Logout lang={lang} logoutDictionary={logout} />
			</ListItem>
		</List>
	);
};
