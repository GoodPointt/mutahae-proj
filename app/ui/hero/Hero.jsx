import { Box } from '@chakra-ui/react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import getLang from '@/app/lib/utils/getLang';
import { getDictionary } from '@/app/lib/locales/dictionary';

const Hero = async () => {
	const lang = getLang();

	const {
		page: { home },
	} = await getDictionary(lang);

	return (
		<Box
			bg={'url("/hero-bg.jpg")'}
			bgRepeat={'no-repeat'}
			bgPos={'center'}
			bgSize={'cover'}
			width={'100%'}
			height={{ base: '400px', lg: '600px' }}>
			<SectionWrapper heading={home.hero.tittle}></SectionWrapper>
		</Box>
	);
};

export default Hero;
