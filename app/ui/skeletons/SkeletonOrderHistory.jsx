import React from 'react';

import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

const SkeletonOrderHistory = ({ lang }) => {
	return (
		<Box display={'flex'} flexDir={{ base: 'column', md: 'row-reverse' }}>
			<Flex
				width={'100%'}
				justifyContent={'space-between'}
				flexDir={'row-reverse'}
				mb={'30px'}
				flex={1}
			>
				<Flex flexDir={'column'} gap={'14px'}>
					<SkeletonText
						width={'130px'}
						skeletonHeight="10px"
						noOfLines={1}
						ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
						mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
					/>

					<SkeletonText
						width={'80px'}
						skeletonHeight="10px"
						noOfLines={1}
						ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
						mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
					/>

					<SkeletonText
						width={'140px'}
						skeletonHeight="10px"
						noOfLines={1}
						ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
						mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
					/>
					<SkeletonText
						display={{ base: 'none', md: 'block' }}
						width={{ md: '60px' }}
						skeletonHeight="10px"
						noOfLines={1}
						ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
						mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
					/>
				</Flex>

				<SkeletonText
					display={{ base: 'block', md: 'none' }}
					width={'70px'}
					skeletonHeight="22px"
					noOfLines={1}
					ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
					mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
				/>
			</Flex>

			<Flex flex={1}>
				<Flex gap="30px" flexDir="column" flex={1}>
					{Array.from({ length: 4 }, (v, i) => {
						return (
							<Box display="flex" key={i}>
								<Skeleton
									mr={lang === 'en' && '30px'}
									ml={lang === 'he' && '30px'}
									width="100px"
									height="100px"
									startColor="#a28445;"
									endColor="gray.400"
								/>

								<Flex flexDir={{ base: 'column', md: 'row' }} flex={1}>
									<Flex
										flexDirection={{ base: 'column', lg: 'row' }}
										gap="10px"
										flex={1}
									>
										<Box flex={1}>
											<SkeletonText
												w="80%"
												mb="10px"
												skeletonHeight="24px"
												noOfLines={1}
											/>
											<SkeletonText
												w="60%"
												skeletonHeight="14px"
												noOfLines={1}
											/>
										</Box>
									</Flex>
								</Flex>
							</Box>
						);
					})}
				</Flex>
			</Flex>
		</Box>
	);
};

export default SkeletonOrderHistory;
