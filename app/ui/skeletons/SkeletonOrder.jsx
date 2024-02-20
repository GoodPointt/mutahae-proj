import {
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	List,
	Skeleton,
	SkeletonText,
	Stack,
} from '@chakra-ui/react';

import Counter from '../singleProduct/Counter/Counter';
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
							<Flex
								gap={'30px'}
								alignItems={'center'}
								flexDir={{ base: 'column', md: 'row' }}
							>
								<Flex alignItems={'center'} gap={{ base: '10px', lg: '30px' }}>
									<Skeleton w={'115px'} h={'100px'} pos={'relative'} />
									<Stack spacing={2}>
										<SkeletonText
											skeletonHeight="4"
											noOfLines={1}
											w={'190px'}
										/>
										<SkeletonText skeletonHeight="4" noOfLines={1} w={'30px'} />
										<SkeletonText skeletonHeight="4" noOfLines={1} w={'20px'} />
									</Stack>
								</Flex>

								<Grid
									mt={{ base: '50px', md: '0px' }}
									templateColumns={{ base: '3fr 1fr' }}
									w={'100%'}
									justifyContent={'center'}
								>
									<Counter count={4} />

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
							</Flex>
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
