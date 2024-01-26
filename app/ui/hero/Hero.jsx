import Link from 'next/link';

import { Flex, Text, Heading } from '@chakra-ui/react';
import Btn from '../button/Btn';
import SectionWrapper from '../sectionWrapper/SectionWrapper';

const Hero = async ({ dictionary, lang }) => {
	return (
		<SectionWrapper
			bg={'url("/img/hero-bg.jpg")'}
			style={{
				paddingTop: '218px',
				paddingBottom: '218px',
			}}
		>
			<Heading
				as={'h1'}
				maxW={'731px'}
				fontSize={'40.5px'}
				lineHeight={'48.6px'}
				marginBottom={'20px'}
			>
				{dictionary.hero.title}
			</Heading>
			<Text fontSize={'16px'} maxW={'800px'} mb={'30px'}>
				{dictionary.hero.desc}
			</Text>
			<Flex
				flexDir={{ base: 'column', sm: 'row' }}
				gap={{ base: '10px', sm: '20px' }}
			>
				<Btn as={Link} href={`/${lang}/catalog`}>
					{dictionary.hero.btnCatalog}
				</Btn>
				<Btn as={Link} href={`/${lang}/contact`}>
					{dictionary.hero.btnContactUs}
				</Btn>
			</Flex>
		</SectionWrapper>
	);
};

export default Hero;
