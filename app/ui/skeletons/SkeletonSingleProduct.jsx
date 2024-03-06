import Link from 'next/link';

import {
	Box,
	Flex,
	Grid,
	Skeleton,
	SkeletonText,
	Text,
} from '@chakra-ui/react';

import HomeIcon from '../svg/HomeIcon';

const SkeletonSingleProduct = ({ lang }) => {
	return (
		<>
			<Box>
				<Flex
					mb={'30px'}
					alignItems={'start'}
					fontSize={'14px'}
					textColor={'#A28445'}
				>
					<Text>
						<Link href={`/${lang}`}>
							<HomeIcon />
						</Link>
					</Text>
					<Box mx={'10px'}>/</Box>
					<Text>
						<Link href={`/${lang}`}>{lang === 'he' ? 'קטלוג' : 'Catalog'}</Link>
					</Text>
					<Box mx={'10px'}>/</Box>
				</Flex>
				<Grid
					templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
					gap={'50px'}
					maxW={'100%'}
				>
					<Skeleton
						display={'block'}
						maxW={'550px'}
						h={{ base: '320px', sm: '450px' }}
						overflow={'hidden'}
						borderRadius={'10px'}
						startColor="#ad9a74"
						endColor="gray.400"
					/>

					<Flex flexDir={'column'} gap={'30px'}>
						<Box maxW={'360px'}>
							<SkeletonText noOfLines={1} spacing="1" skeletonHeight="9" />
						</Box>
						<Box maxW={'200px'}>
							<SkeletonText
								mb={'30px'}
								noOfLines={1}
								spacing="1"
								skeletonHeight="6"
							/>
							<Box maxW={'60px'}>
								<SkeletonText noOfLines={6} spacing="4" skeletonHeight="2" />
							</Box>
						</Box>
						<Grid
							templateColumns={{ base: '1fr', sm: '1.45fr 2fr' }}
							gap={'10px'}
							mt={{ base: '30px', lg: 'auto' }}
							alignItems={'center'}
						>
							<SkeletonText
								noOfLines={1}
								spacing="1"
								skeletonHeight="9"
								w={'100%'}
							/>
							<SkeletonText
								noOfLines={1}
								spacing="1"
								skeletonHeight="9"
								w={'100%'}
							/>
						</Grid>
					</Flex>
				</Grid>
			</Box>
		</>
	);
};

export default SkeletonSingleProduct;
