'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { List, ListItem } from '@chakra-ui/react';

const LocaleSwitcher = () => {
  const pathName = usePathname();

  const redirectedPathName = (locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <List>
      {i18n.locales.map((locale) => {
        return (
          <ListItem key={locale}>
            <Link href={redirectedPathName(locale)}>{locale}</Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default LocaleSwitcher;
