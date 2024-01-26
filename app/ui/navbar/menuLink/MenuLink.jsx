'use client';

import { usePathname } from 'next/navigation';

import { Link } from '@chakra-ui/next-js';
import { ListItem } from '@chakra-ui/react';

const MenuLink = ({ item, lang, onClose, visibleIcon = false }) => {
	const pathname = usePathname();

	const isActive =
		pathname === '/' + lang + item.path ||
		(pathname === `/${lang}` && item.path === '/');

	return (
		<ListItem
			_hover={{
				transform: 'translateX(5px)',
				cursor: 'pointer',
			}}
			transition={'all 0.3s'}
			onClick={() => onClose()}
		>
			<Link
				href={'/' + lang + item.path}
				display={'flex'}
				align={'center'}
				gap={1}
				color={isActive ? '#a98841' : 'white'}
				fill={isActive ? '#a98841' : 'white'}
				textDecor={'none'}
				fontSize={'18px'}
				fontWeight={400}
				transition={'all 0.3s'}
				_hover={{
					textDecoration: 'none',
					fill: '#a98841',
					color: '#a98841',
				}}
			>
				{visibleIcon && item.icon} {item.title}
			</Link>
		</ListItem>
	);
};

export default MenuLink;
