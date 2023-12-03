'use client';

import { Link } from '@chakra-ui/next-js';
import { ListItem } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import React from 'react';

const MenuLink = ({ item, lang }) => {
  const pathname = usePathname();

  const isActive =
    pathname === '/' + lang + item.path ||
    (pathname === `/${lang}` && item.path === '/');

  return (
    <ListItem
      _hover={{
        transform: 'translateX(5px)',
        cursor: 'pointer',
        color: '#a98841',
      }}
      transition={'all 0.3s'}
      color={isActive ? '#a98841' : 'inherit'}
    >
      <Link
        href={'/' + lang + item.path}
        display={'flex'}
        align={'center'}
        gap={1}
        textDecor={'none'}
        fontSize={'md'}
        fontWeight={400}
        _hover={{ textDecoration: 'none' }}
      >
        {item.icon} {item.title}
      </Link>
    </ListItem>
  );
};

export default MenuLink;
