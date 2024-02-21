import Link from 'next/link';

import { Flex, Heading, Text } from '@chakra-ui/react';

import Btn from '../button/Btn';
import SectionWrapper from '../sectionWrapper/SectionWrapper';

const Hero = async ({ dictionary, lang }) => {
	return (
		<SectionWrapper
			style={
				lang === 'en'
					? {
							backgroundImage:
								'linear-gradient(90deg, rgba(8,5,0,0.6783963585434174) 0%, rgba(31,21,0,0.6111694677871149) 40%, rgba(0,212,255,0) 68%), url("/img/hero-bg.jpg")',
					  }
					: {
							backgroundImage:
								'linear-gradient(270deg, rgba(8,5,0,0.6783963585434174) 0%, rgba(31,21,0,0.6111694677871149) 40%, rgba(0,212,255,0) 68%), url("/img/hero-bg.jpg")',
					  }
			}
		>
			<Flex
				maxW={'825px'}
				h={'74dvh'}
				gap={'30px'}
				flexDir={'column'}
				justifyContent={'center'}
			>
				<Heading
					as={'h1'}
					maxW={'731px'}
					fontSize={{ base: '27px', lg: '40.5px' }}
					lineHeight={{ base: '35.91px', lg: '48.6px' }}
				>
					{dictionary.hero.title}.
				</Heading>
				<Text fontSize={'16px'} maxW={'800px'}>
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
			</Flex>
		</SectionWrapper>
	);
};

export default Hero;
