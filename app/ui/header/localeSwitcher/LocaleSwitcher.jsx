import { usePathname, useSearchParams } from 'next/navigation';

import { Link, List, ListItem } from '@chakra-ui/react';

import { i18n } from '@/app/lib/locales/i18n.config';

import EngFlag from '../../svg/EngFlag';
import HeFlag from '../../svg/HeFlag';

export const LocaleSwitcher = () => {
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const redirectedPathName = locale => {
		if (!pathName) return '/';
		const segments = pathName.split('/');
		segments[1] = locale;

		return segments.join('/');
	};

	const getLocaleDisplayName = locale => {
		return locale === 'he' ? <HeFlag /> : <EngFlag />;
	};

	const currentLocale = pathName.split('/')[1];

	return (
		<List display="flex" gap={'20px'}>
			{i18n.locales.map(locale => (
				<ListItem position="relative" key={locale}>
					<Link
						href={
							searchParams.has('?')
								? `${redirectedPathName(locale)}?${searchParams}`
								: `${redirectedPathName(locale)}`
						}
						h={'10px'}
						w={'40px'}
						pointerEvents={locale === currentLocale ? 'none' : 'auto'}
						opacity={locale === currentLocale ? '0.5' : '1'}
						cursor={locale === currentLocale ? 'not-allowed' : 'pointer'}
					>
						{getLocaleDisplayName(locale)}
					</Link>
				</ListItem>
			))}
		</List>
	);
};

export default LocaleSwitcher;
