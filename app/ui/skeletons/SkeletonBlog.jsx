import { RiDoubleQuotesR } from 'react-icons/ri';

import { Box, Skeleton, SkeletonText, Text } from '@chakra-ui/react';

import { getDictionary } from '@/app/lib/locales/dictionary';
import getLang from '@/app/lib/utils/getLang';

import SectionWrapper from '../sectionWrapper/SectionWrapper';
import TextLink from '../textLink/TextLink';

const SkeletonBlog = async () => {
	const lang = getLang();
	const dictionary = await getDictionary(lang);

	return (
		<SectionWrapper heading={dictionary.header.navItems[3].title}>
			<Box
				display="flex"
				gap="40px"
				borderBottom="2px solid #a28445"
				w="100%"
				flexDirection={{ base: 'column', md: 'row' }}
				alignItems="center"
			>
				<Skeleton
					position="relative"
					w={200}
					height={200}
					startColor="#a28445;"
					endColor="gray.400"
				/>

				<Box
					position="relative"
					maxW={{ base: '380px', md: '400px', lg: '700px' }}
					width={'100%'}
					display="flex"
					flexDirection="column"
					justifyContent="center"
					pt="60px"
					pb="30px"
				>
					<SkeletonText mb={7} skeletonHeight="6" noOfLines={1} w={'40%'} />

					<Box position="absolute" top={0}>
						<RiDoubleQuotesR size="40px" color="#a28445" />
					</Box>
					<SkeletonText mb="10px" skeletonHeight="3" noOfLines={5} w={'90%'} />
				</Box>
			</Box>
			<Text mt={'32px'}>
				{dictionary.pageLinksText.catalog.fromBlog}
				<TextLink href={`/${lang}/${dictionary.pageLinksText.catalog.link}`}>
					{dictionary.pageLinksText.catalog.linkName}
				</TextLink>
			</Text>
		</SectionWrapper>
	);
};

export default SkeletonBlog;
