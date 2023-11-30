import { Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

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

        <Flex flexDir={'column'} gap={6} width={'200px'}>
          <SkeletonText mt={3} noOfLines={1} spacing="1" skeletonHeight="9" />
          <SkeletonText noOfLines={6} spacing="4" skeletonHeight="3" />
        </Flex>
      </Flex>
      <SkeletonText mt={4} noOfLines={6} spacing="2" skeletonHeight="2" />
    </>
  );
};

export default SkeletonSingleProduct;
