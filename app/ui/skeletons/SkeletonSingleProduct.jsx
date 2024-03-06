import { Box, Flex, Grid, Skeleton, SkeletonText } from '@chakra-ui/react';

const SkeletonSingleProduct = () => {
	return (
		<>
			<Box maxW={'300px'}>
				<SkeletonText
					mb={'30px'}
					noOfLines={1}
					skeletonHeight="2"
					startColor="#ad9a74"
					endColor="gray.400"
				/>
			</Box>
			<Grid
				templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
				gap={'50px'}
				maxW={'100%'}
			>
				<Skeleton
					display={'block'}
					w={'550px'}
					h={'380px'}
					overflow={'hidden'}
					borderRadius={'10px'}
					startColor="#ad9a74"
					endColor="gray.400"
				/>

				<Flex flexDir={'column'} gap={'30px'}>
					<Box maxW={'360px'}>
						<SkeletonText
							noOfLines={1}
							spacing="1"
							skeletonHeight="9"
							startColor="#ad9a74"
							endColor="gray.400"
						/>
					</Box>
					<Box maxW={'200px'}>
						<SkeletonText
							mb={'30px'}
							noOfLines={1}
							spacing="1"
							skeletonHeight="5"
							startColor="#ad9a74"
							endColor="gray.400"
						/>
						<SkeletonText
							noOfLines={6}
							spacing="4"
							skeletonHeight="2"
							startColor="#ad9a74"
							endColor="gray.400"
						/>
					</Box>
					<Grid
						templateColumns={{ base: '1fr', sm: '1.50fr 2fr' }}
						gap={'10px'}
						mt={{ base: '30px', lg: 'auto' }}
						alignItems={'center'}
					>
						<SkeletonText
							noOfLines={1}
							spacing="1"
							skeletonHeight="9"
							startColor="#ad9a74"
							endColor="gray.400"
							w={'100%'}
						/>
						<SkeletonText
							noOfLines={1}
							spacing="1"
							skeletonHeight="9"
							startColor="#ad9a74"
							endColor="gray.400"
							w={'100%'}
						/>
					</Grid>
				</Flex>
			</Grid>
			<Box mt={'50px'}>
				<Box maxW={'150px'}>
					<SkeletonText
						mt={4}
						noOfLines={1}
						spacing="2"
						skeletonHeight="9"
						startColor="#ad9a74"
						endColor="gray.400"
					/>
				</Box>
				<SkeletonText
					mt={4}
					noOfLines={6}
					spacing="2"
					skeletonHeight="2"
					startColor="#ad9a74"
					endColor="gray.400"
				/>
			</Box>
		</>
	);
};

export default SkeletonSingleProduct;
