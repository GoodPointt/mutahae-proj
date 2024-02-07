'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Center, Heading, Text } from '@chakra-ui/react';

import Btn from '../../button/Btn';

const NotFoundMessage = ({ lang, dictionary }) => {
	const pathname = usePathname();

	const redirectedPathName = locale => {
		if (!pathname) return '/';
		const segments = pathname.split('/');

		segments[1] = locale;

		return segments.join('/');
	};

	return (
		<Center flexDir="column" gap={6} h={480}>
			<Heading as="h1" fontWeight="bold">
				😒 OOPS!
			</Heading>
			<Text>{dictionary.notFoundMessage}</Text>

			<Link href={`${redirectedPathName(lang)}`}>
				<Btn>Let&apos;s try again</Btn>
			</Link>
			<Link href={`/${lang}`}>
				<Btn>Home</Btn>
			</Link>
		</Center>
	);
};

export default NotFoundMessage;
