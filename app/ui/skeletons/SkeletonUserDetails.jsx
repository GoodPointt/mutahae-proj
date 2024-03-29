import React from 'react';

import { Box, Flex, Skeleton } from '@chakra-ui/react';

const SkeletonUserDetails = () => {
	return (
		<>
			<Box mb="70px">
				<Box>
					<Flex
						w="100%"
						gap={{ lg: '15px' }}
						flexDirection={{ base: 'column', lg: 'row' }}
					>
						<Skeleton
							// eslint-disable-next-line sonarjs/no-duplicate-string
							w={{ base: '100%', lg: 'calc((100% - 15px) /2 )' }}
							h="45px"
							mb="25px"
						/>

						<Skeleton
							w={{ base: '100%', lg: 'calc((100% - 15px) /2 )' }}
							h="45px"
							mb="25px"
						/>
					</Flex>
					<Flex
						gap={{ lg: '15px' }}
						mb="30px"
						flexDirection={{ base: 'column', lg: 'row' }}
					>
						<Skeleton
							w={{ base: '100%', lg: 'calc((100% - 15px) /2 )' }}
							h="45px"
							mb="25px"
						/>

						<Skeleton
							w={{ base: '100%', lg: 'calc((100% - 15px) /2 )' }}
							h="45px"
							mb="25px"
						/>
					</Flex>
					<Skeleton
						startColor="#a28445;"
						endColor="gray.400"
						h="45px"
						mb="25px"
						w="calc((100% - 15px) /2 )"
					/>
				</Box>
			</Box>
		</>
	);
};

export default SkeletonUserDetails;
