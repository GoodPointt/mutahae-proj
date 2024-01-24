import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

const SkeletonSingleProduct = () => {
	return (
		<>
			<Flex flexWrap={'wrap'} gap={4}>
				<Skeleton
					display={'block'}
					w={'400px'}
					h={'380px'}
					overflow={'hidden'}
					borderRadius={'10px'}
					startColor="#ad9a74"
					endColor="gray.400"
				/>

				<Flex flexDir={'column'} gap={12} width={'200px'}>
					<SkeletonText mt={3} noOfLines={1} spacing="1" skeletonHeight="9" />
					<SkeletonText noOfLines={5} spacing="4" skeletonHeight="2" />
					<Box mt={'auto'}>
						<SkeletonText noOfLines={1} skeletonHeight="3" mb={3} w={'80%'} />

						<SkeletonText
							noOfLines={1}
							spacing="1"
							skeletonHeight="9"
							startColor="#ad9a74"
							endColor="gray.400"
							w={'60%'}
						/>
					</Box>
				</Flex>
			</Flex>
			<SkeletonText mt={4} noOfLines={6} spacing="2" skeletonHeight="2" />
		</>
	);
};

export default SkeletonSingleProduct;
