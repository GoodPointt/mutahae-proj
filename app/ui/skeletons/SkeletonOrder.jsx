import {
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	Input,
	List,
	Skeleton,
	SkeletonText,
} from '@chakra-ui/react';

import DeleteIcon from '../svg/DeleteIcon';

const SkeletonOrder = () => {
	return (
		<Flex gap={'50px'} justifyContent={'space-between'}>
			<List
				border={'1px solid #3B3D46'}
				p={'30px'}
				width={{ base: '100%', lg: '651px', xl: '751px' }}
			>
				{Array.from({ length: 3 }, (v, i) => (
					<>
						<Box as="li" key={i}>
							<Grid
								templateColumns={{ base: '1fr', md: '1.2fr 1fr' }}
								alignItems={'center'}
								flexDir={{ base: 'column', md: 'row' }}
							>
								<Flex alignItems={'center'} gap={{ base: '10px', lg: '30px' }}>
									<Skeleton w={'115px'} h={'100px'} pos={'relative'} />

									<List display={'flex'} flexDir={'column'} gap={'10px'}>
										<SkeletonText
											skeletonHeight="4"
											noOfLines={1}
											w={'190px'}
										/>
										<SkeletonText skeletonHeight="4" noOfLines={1} w={'30px'} />
										<SkeletonText skeletonHeight="4" noOfLines={1} w={'20px'} />
									</List>
								</Flex>

								<Grid
									mt={{ base: '50px', md: '0px' }}
									templateColumns={{ base: '3fr 1fr' }}
									w={'100%'}
									justifyContent={'center'}
								>
									<Flex
										pos={'relative'}
										alignItems={'center'}
										justifyContent={'center'}
										border={'1px #3B3D46 solid'}
										maxW={'100%'}
										gap={'10px'}
										px={'24px'}
									>
										<Button
											variant={'link'}
											w={'24px'}
											minW={0}
											textColor={'#fff'}
											isDisabled={true}
										>
											-
										</Button>

										<Input
											type="number"
											h={'max-content'}
											variant={'unstyled'}
											inputMode="numeric"
											isDisabled={true}
											w={'100px'}
											minH={0}
											p={'9px'}
											border={'1px transparent solid'}
											textAlign={'center'}
											ringColor={'transparent'}
											value={1}
										/>

										<Button
											variant={'link'}
											w={'32px'}
											minW={0}
											textColor={'#fff'}
											isDisabled={true}
										>
											+
										</Button>
									</Flex>

									<Flex justifyContent={'center'}>
										{
											<Button
												variant="unstyled"
												bgColor="transparent"
												_hover={{ bgColor: 'transparent', stroke: 'red' }}
												display={'flex'}
												justifyContent={'center'}
												stroke={'#fff'}
											>
												<DeleteIcon />
											</Button>
										}
									</Flex>
								</Grid>
							</Grid>
						</Box>
						<Divider mt={'30px'} mb={'30px'} />
					</>
				))}
			</List>

			<Skeleton
				borderRadius={'2px'}
				height={'270px'}
				w={{ base: '100%', md: '340px' }}
			/>
		</Flex>
	);
};

export default SkeletonOrder;
