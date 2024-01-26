import { Box, Grid, GridItem, Heading, Text } from '@chakra-ui/react';

import SectionWrapper from '../sectionWrapper/SectionWrapper';
import BenefitIcon1 from '../svg/BenefitIcon1';
import BenefitIcon2 from '../svg/BenefitIcon2';
import BenefitIcon3 from '../svg/BenefitIcon3';
import BenefitIcon4 from '../svg/BenefitIcon4';
import BenefitIcon5 from '../svg/BenefitIcon5';
import BenefitIcon6 from '../svg/BenefitIcon6';

const icons = [
	BenefitIcon1,
	BenefitIcon2,
	BenefitIcon3,
	BenefitIcon4,
	BenefitIcon5,
	BenefitIcon6,
];

const Benefits = ({ dictionary }) => {
	return (
		<SectionWrapper bg=" linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(25,25,25,1) 50%, rgba(0,0,0,1) 100%)">
			<Heading
				as={'h2'}
				mb={'50px'}
				fontSize={{ base: '27px', lg: '40.5' }}
				fontWeight={700}
				maxW={'731px'}
			>
				{dictionary.benefits.title}
			</Heading>
			<Grid
				as={'ul'}
				templateColumns={{
					base: 'repeat(1, 1fr)',
					sm: 'repeat(2, 1fr)',
					lg: 'repeat(3, 1fr)',
				}}
				gap={{ base: '20px', lg: '40px' }}
				rowGap={{ base: '30px', lg: '50px' }}
			>
				{dictionary.benefits.benefitsList.map((item, idx) => {
					return (
						<GridItem as={'li'} key={idx} display={'flex'}>
							<Box as={'span'} width={'32px'}>
								{icons[idx]()}
							</Box>
							<Text marginLeft={'20px'} fontSize={'16px'}>
								{item}
							</Text>
						</GridItem>
					);
				})}
			</Grid>
		</SectionWrapper>
	);
};

export default Benefits;
