'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { List, ListItem } from '@chakra-ui/react';

export const Sidebar = ({ lang }) => {
	const pathname = usePathname();

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
			>
				<Link href={profileRoutes.favorites}>Favorites</Link>
			</ListItem>
			<ListItem
				mb="12px"
				fontSize="20px"
				color={pathname === profileRoutes.contactInfo ? '#a98841' : 'inherit'}
			>
				<Link href={profileRoutes.contactInfo}>Contact Information</Link>
			</ListItem>
			<ListItem
				mb="40px"
				fontSize="20px"
				color={
					pathname === profileRoutes.historyOfOrders ? '#a98841' : 'inherit'
				}
			>
				<Link href={profileRoutes.historyOfOrders}>History of orders</Link>
			</ListItem>
			<ListItem fontSize="20px" color="#808080">
				<Link href={`/${lang}/`}>logout</Link>
			</ListItem>
		</List>
	);
};
