import SectionWrapper from '../../ui/sectionWrapper/SectionWrapper';
import { Sidebar } from '../../ui/sidebar/Sidebar';

import { Box, Flex } from '@chakra-ui/react';

import { getDictionary } from '../../lib/locales/dictionary';

const Layout = async ({ children, params: { lang } }) => {
	const dictionary = await getDictionary(lang);
	const { sidebar } = dictionary.profile;

	return (
		<SectionWrapper>
			<Flex flexDirection={{ base: 'column', lg: 'row' }}>
				<Box flex="1" mb="35px">
					<Sidebar lang={lang} sidebarDictionary={sidebar} />
				</Box>
				<Box w="100%" maxW="753px">
					{children}
				</Box>
			</Flex>
		</SectionWrapper>
	);
};

export default Layout;
