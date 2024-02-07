import { RiDoubleQuotesR } from 'react-icons/ri';

import { Box, Divider, Skeleton, SkeletonText, Text } from '@chakra-ui/react';

import { getDictionary } from '@/app/lib/locales/dictionary';

import SectionWrapper from '../sectionWrapper/SectionWrapper';
import TextLink from '../textLink/TextLink';

const SkeletonBlog = async ({ lang }) => {
	const dictionary = await getDictionary(lang);

	return (
		<SectionWrapper heading={dictionary.header.navItems[3].title}>
			<Box
				display="flex"
				gap="40px"
				w="100%"
				flexDirection={{ base: 'column', md: 'row' }}
				alignItems="center"
			>
				<Skeleton
					w={{ base: '100%', md: '400px', xl: '600px' }}
					height={200}
					mt={'40px'}
					startColor="#a28445;"
					endColor="gray.400"
				/>

				<Box position="relative" width={'100%'} pt="60px">
					<SkeletonText mb={7} skeletonHeight="6" noOfLines={1} w={'40%'} />

					<Box position="absolute" top={0}>
						<RiDoubleQuotesR size="40px" color="#a28445" />
					</Box>
					<SkeletonText mb="10px" skeletonHeight="2" noOfLines={5} w={'90%'} />
				</Box>
			</Box>
			<SkeletonText my="10px" skeletonHeight="2" noOfLines={5} w={'100%'} />
			<Divider
				mt={'32px'}
				borderBottom="2px solid #a28445"
				h={'2px'}
				width={'100%'}
			></Divider>
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
