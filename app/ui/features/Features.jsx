import { Box, List, ListItem, Text } from '@chakra-ui/react';

import SectionWrapper from '../sectionWrapper/SectionWrapper';

const Features = ({ dictionary, lang }) => {
	return (
		<SectionWrapper bg="#000">
			<Box>
				<List
					display={'grid'}
					gridTemplateColumns={['1fr', 'repeat(3, 1fr)']}
					gap={6}
				>
					{dictionary.map(el => (
						<ListItem
							display={'flex'}
							flexDirection={'column'}
							p={{ base: '35px', sm: '15px', md: '35px', xl: '35px' }}
							key={el.feat}
							gap={'30px'}
							borderLeft={lang === 'en' ? '1px #a28445 solid' : null}
							borderRight={lang === 'he' ? '1px #a28445 solid' : null}
						>
							<Text fontWeight={700} fontSize={'40px'} lineHeight={1.2}>
								{el.feat}
							</Text>
							<Text
								fontWeight={500}
								fontSize={{ base: '18px', sm: '14px', md: '18px', xl: '18px' }}
								lineHeight={1.5}
							>
								{el.title}
							</Text>
						</ListItem>
					))}
				</List>
			</Box>
		</SectionWrapper>
	);
};

export default Features;
