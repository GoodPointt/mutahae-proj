import { Flex, List } from '@chakra-ui/react';

import { menuIcons } from '@/app/lib/data';

import MenuLink from './menuLink/MenuLink';

const NavBar = ({
	lang,
	flexDir = 'row',
	dictionary,
	onClose,
	mr = '0',
	visibleIcon,
}) => {
	return (
		<Flex justify={'space-between'} mr={mr}>
			<List display={'flex'} gap={'20px'} flexDirection={flexDir}>
				{dictionary.header.navItems.length > 0 &&
					dictionary.header.navItems.map((item, idx) => {
						item.icon = menuIcons[idx];

						return (
							<MenuLink
								key={item.title}
								item={item}
								lang={lang}
								onClose={onClose}
								visibleIcon={visibleIcon}
							/>
						);
					})}
			</List>
		</Flex>
	);
};

export default NavBar;
