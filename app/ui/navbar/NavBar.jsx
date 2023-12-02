import { Flex, List } from '@chakra-ui/react';

import MenuLink from './menuLink/MenuLink';

import { menuIcons } from '@/app/lib/data';

const NavBar = ({ lang, flexDir = 'row', dictionary }) => {
  return (
    <Flex justify={'space-between'}>
      <List display={'flex'} gap={'24px'} flexDirection={flexDir}>
        {dictionary.header.navItems.length > 0 &&
          dictionary.header.navItems.map((item, idx) => {
            item.icon = menuIcons[idx];
            return <MenuLink key={item.title} item={item} lang={lang} />;
          })}
      </List>
    </Flex>
  );
};

export default NavBar;
