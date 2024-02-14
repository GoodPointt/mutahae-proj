import { usePathname, useSearchParams } from 'next/navigation';

import { Link, List, ListItem } from '@chakra-ui/react';

import { i18n } from '@/app/lib/locales/i18n.config';

import { setCookie } from 'cookies-next';

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
		return locale === 'he' ? 'עב' : 'EN';
	};

	const currentLocale = pathName.split('/')[1];

	const linksStyle = locale => {
		const isActive = pathName.includes(locale);
		if (isActive) {
			return {
				border: '2px #a28477 solid',
				borderRadius: '8px',
			};
		} else {
			return {
				color: '#A28445',
			};
		}
	};

	return (
		<List display="flex">
			{i18n.locales.map(locale => (
				<ListItem position="relative" key={locale}>
					<Link
						href={
							searchParams.has('?')
								? `${redirectedPathName(locale)}?${searchParams}`
								: `${redirectedPathName(locale)}`
						}
						{...linksStyle(locale)}
						onClick={() => setCookie('lang', locale)}
						fontSize={'14px'}
						fontWeight={'500'}
						p={'6px 12px'}
						pointerEvents={locale === currentLocale ? 'none' : 'auto'}
						opacity={locale === currentLocale ? '0.5' : '1'}
						cursor={locale === currentLocale ? 'not-allowed' : 'pointer'}
						color={'#A28445'}
						_hover={{ color: '#7f7535' }}
					>
						{getLocaleDisplayName(locale)}
					</Link>
				</ListItem>
			))}
		</List>
	);
};

export default LocaleSwitcher;
