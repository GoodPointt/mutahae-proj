import Link from 'next/link';

import { Flex, Heading, Text } from '@chakra-ui/react';

import Btn from '../button/Btn';
import SectionWrapper from '../sectionWrapper/SectionWrapper';

const Hero = async ({ dictionary, lang }) => {
	return (
		<SectionWrapper
			bg={'url("/img/hero-bg.jpg")'}
			style={{
				paddingTop: '156px',
				paddingBottom: '156px',
			}}
		>
			<Heading
				as={'h1'}
				maxW={'731px'}
				fontSize={{ base: '27px', lg: '40.5px' }}
				lineHeight={{ base: '35.91px', lg: '48.6px' }}
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
