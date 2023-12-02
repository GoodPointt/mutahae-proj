import { Flex, List } from '@chakra-ui/react';

import MenuLink from './menuLink/MenuLink';
import { getDictionary } from '@/app/lib/locales/dictionary';
import { menuIcons } from '@/app/lib/data';

const NavBar = async ({ lang, flexDir = 'row' }) => {
	const {
		header: { navItems },
	} = await getDictionary(lang);

	return (
		<Flex justify={'space-between'}>
			<List
				display={'flex'}
				gap={'24px'}
				flexDirection={flexDir}>
				{navItems.length > 0 &&
					navItems.map((item, idx) => {
						item.icon = menuIcons[idx];
						return (
							<MenuLink
								key={item.title}
								item={item}
								lang={lang}
							/>
						);
					})}
			</List>
		</Flex>
	);
};

export default NavBar;
