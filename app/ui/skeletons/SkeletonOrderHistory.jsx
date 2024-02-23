import React from 'react';

import { Box, Flex, Skeleton, SkeletonText } from '@chakra-ui/react';

const SkeletonOrderHistory = ({ lang }) => {
	//const arr = new Array().fill(4);

	return (
		<Flex>
			<Flex gap="30px" flexDir="column" flex={1}>
				{Array.from({ length: 4 }, (v, i) => {
					return (
						<Box display="flex" key={i}>
							<Flex flexDir={'column'} gap={'14px'}>
								<Skeleton
									mr={lang === 'en' && '30px'}
									ml={lang === 'he' && '30px'}
									width="100px"
									height="100px"
									startColor="#a28445;"
									endColor="gray.400"
								/>

								<SkeletonText
									display={{ base: 'flex', md: 'none' }}
									w="50%"
									skeletonHeight="22px"
									noOfLines={1}
									ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
									mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
									my="auto"
								/>
							</Flex>

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
										<SkeletonText w="60%" skeletonHeight="14px" noOfLines={1} />
									</Box>
								</Flex>
								<Flex flexDirection="column" flex={1}>
									<SkeletonText
										w="50%"
										mb="8px"
										skeletonHeight="10px"
										noOfLines={1}
										alignSelf="flex-start"
										ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
										mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
									/>
									<SkeletonText
										w="35%"
										mb="14px"
										skeletonHeight="10px"
										noOfLines={1}
										ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
										mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
									/>

									<SkeletonText
										w="60%"
										mb="14px"
										skeletonHeight="10px"
										noOfLines={1}
										ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
										mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
										my="auto"
									/>

									<SkeletonText
										display={{ base: 'none', md: 'flex' }}
										w="20%"
										skeletonHeight="10px"
										noOfLines={1}
										ml={{ base: 0, lg: lang === 'he' ? 0 : 'auto' }}
										mr={{ base: 0, lg: lang === 'en' ? 0 : 'auto' }}
										my="auto"
									/>
								</Flex>
							</Flex>
						</Box>
					);
				})}
			</Flex>
		</Flex>
	);
};

export default SkeletonOrderHistory;
