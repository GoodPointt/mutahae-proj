import { Box, Grid, Skeleton, SkeletonText } from '@chakra-ui/react';

import { getDictionary } from '@/app/lib/locales/dictionary';
import getLang from '@/app/lib/utils/getLang';

import SectionWrapper from '../sectionWrapper/SectionWrapper';

export const SkeletonProductItem = () => {
	return (
		<Box as={'li'} shadow={'dark-lg'} position={'relative'} overflow="hidden">
			<Skeleton
				className="product_card"
				position="relative"
				z-index="2"
				width="100%"
				height="360px"
				transition="all 500ms cubic-bezier(0.4, 0, 0.2, 1)"
				bgColor={'gray.200'}
				bgRepeat={'no-repeat'}
				bgPos={'center'}
				bgSize={'cover'}
			/>
			<Box
				as="div"
				bg="linear-gradient(0deg,rgba(0, 0, 0, 0.7) 15%, rgba(252, 176, 69, 0) 50%)"
				position={'absolute'}
				top="0"
				zIndex={'2'}
				width={'100%'}
				height={'100%'}
				display={'flex'}
				justifyContent={'flex-end'}
				flexDir={'column'}
				pt={'16px'}
				gap={4}
			>
				<SkeletonText mx={4} skeletonHeight="6" noOfLines={1} w={'40%'} />
				<SkeletonText mx={4} skeletonHeight="3" noOfLines={1} w={'70%'} />
				<Skeleton startColor="#a28445;" endColor="gray.400" h={10} />
			</Box>
		</Box>
	);
};

const SkeletonProductsGrid = async () => {
	const lang = getLang();
	const {
		header: { navItems },
	} = await getDictionary(lang);

	return (
		<SectionWrapper heading={navItems[1].title}>
			<Skeleton width={'100%'} h={{ base: '30px', md: '40px' }} mb={'17px'} />
			<Grid
				as={'ul'}
				maxW={'100%'}
				gridTemplateColumns={'repeat(auto-fill, minmax(300px, 1fr))'}
				gridGap={10}
				m={'0 auto'}
			>
				{Array.from({ length: 6 }, (v, i) => (
					<SkeletonProductItem key={i} />
				))}
			</Grid>
		</SectionWrapper>
	);
};

export default SkeletonProductsGrid;
