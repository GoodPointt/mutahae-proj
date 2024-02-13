import { Box, List, ListItem, Text } from '@chakra-ui/react';

import SectionWrapper from '../sectionWrapper/SectionWrapper';

const Features = ({ dictionary }) => {
	return (
		<SectionWrapper bg="#000">
			<Box ml={'24px'}>
				<List
					display={'grid'}
					gridTemplateColumns={['1fr', 'repeat(3, 1fr)']}
					gap={16}
				>
					{dictionary.map(el => (
						<ListItem
							display={'flex'}
							flexDirection={'column'}
							p={'35px'}
							key={el.feat}
							gap={'30px'}
							borderLeft={'1px #a28445 solid'}
						>
							<Text fontWeight={700} fontSize={'40px'} lineHeight={1.2}>
								{el.feat}
							</Text>
							<Text fontWeight={500} fontSize={'18px'} lineHeight={1.5}>
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
