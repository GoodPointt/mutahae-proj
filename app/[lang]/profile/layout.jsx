import SectionWrapper from '../../ui/sectionWrapper/SectionWrapper';
import { Sidebar } from '../../ui/sidebar/Sidebar';

import { Box, Flex } from '@chakra-ui/react';

const Layout = ({ children, params: { lang } }) => {
	return (
		<SectionWrapper>
			<Flex flexDirection={{ base: 'column', lg: 'row' }}>
				<Box flex="1" mb="35px">
					<Sidebar lang={lang} />
				</Box>
				<Box w="100%" maxW="753px">
					{children}
				</Box>
			</Flex>
		</SectionWrapper>
	);
};

export default Layout;
