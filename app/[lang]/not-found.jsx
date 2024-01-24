import Link from 'next/link';

import Btn from '@/app/ui/button/Btn';
import SectionWrapper from '../ui/sectionWrapper/SectionWrapper';

import { Center, Heading, Text } from '@chakra-ui/react';

function NotFound() {
	return (
		<SectionWrapper bg="radial-gradient(#434343 20%, black 100%)">
			<Center flexDir="column" gap={6} h={480}>
				<Heading as="h1" fontWeight="bold">
					😒 OOPS!
				</Heading>
				<Text>Looks like something went wrong</Text>

				<Link href="/">
					<Btn>Let&apos;s try again</Btn>
				</Link>
			</Center>
		</SectionWrapper>
	);
}

export default NotFound;
