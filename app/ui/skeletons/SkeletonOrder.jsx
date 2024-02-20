'use client';
import React from 'react';

import {
	Box,
	Button,
	Divider,
	Flex,
	Grid,
	Heading,
	Input,
	List,
	Skeleton,
	SkeletonText,
} from '@chakra-ui/react';

import SubmitButton from '../submitButton/SubmitButton';
import DeleteIcon from '../svg/DeleteIcon';

const SkeletonOrder = ({ dictionary }) => {
	return (
		<Flex
			gap={'50px'}
			justifyContent={'space-between'}
			flexDir={{ base: 'column', xl: 'row' }}
			alignItems={'start'}
		>
			<List
				border={'1px solid #3B3D46'}
				p={'30px'}
				width={{ base: '100%', lg: '651px', xl: '751px' }}
			>
				{Array.from({ length: 3 }, (v, i) => (
					<React.Fragment key={i}>
						<Flex
							as={'li'}
							justifyContent={'space-between'}
							rowGap={{ base: '30px', md: '0px' }}
							alignItems={{ base: 'start', md: 'center' }}
							flexDir={{ base: 'column', md: 'row' }}
						>
							<Grid
								templateColumns={{ base: '1fr', md: '1.1fr 1fr' }}
								alignItems={'center'}
								flexDir={{ base: 'column', md: 'row' }}
								gap={{ base: '0px', md: '50px', lg: '30px' }}
							>
								<Flex alignItems={'center'} gap={{ base: '10px', lg: '30px' }}>
									<Skeleton
										w={'115px'}
										h={'100px'}
										pos={'relative'}
										startColor="#a28445"
										endColor="gray.400"
									/>

									<List display={'flex'} flexDir={'column'} gap={'10px'}>
										<SkeletonText
											skeletonHeight="4"
											noOfLines={1}
											w={{ base: '150px', sm: '190px' }}
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
											w={'24px'}
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
						</Flex>
						{i !== 2 && (
							<Divider
								borderColor={'#A28445'}
								mb={'30px'}
								mt={'30px'}
								opacity={1}
							/>
						)}
					</React.Fragment>
				))}
			</List>

			<Box
				borderRadius={'2px'}
				border={'1px solid #3B3D46'}
				padding={'30px'}
				alignItems={'start'}
				w={{ base: '100%', md: '340px' }}
			>
				<Heading as={'h2'} fontSize={'20px'} fontFamily={600} mb={'30px'}>
					{dictionary.order.orderTitle}
				</Heading>
				<Flex
					color={'#808080'}
					fontSize={'14px'}
					flexDir={'column'}
					gap={'10px'}
				>
					<Flex justifyContent="space-between">
						<Box as="span">{dictionary.order.subtotal}</Box>

						<Box as="span" textAlign={'end'}>{`₪`}</Box>
					</Flex>
					<Flex
						justifyContent="space-between"
						paddingBottom={'20px'}
						borderBottom={'1px solid #3B3D46'}
					>
						<Box as="span">{dictionary.order.shippingPrice}</Box>
						<Box as="span">{` ₪`}</Box>
					</Flex>
					<Flex
						justifyContent="space-between"
						color={'#ffffff'}
						paddingBottom={'10px'}
					>
						<Box as="span">{dictionary.order.total}</Box>
						<Box as="span">{`₪`}</Box>
					</Flex>
					<SubmitButton isSubmitting={false} dis={true}>
						{dictionary.order.button}
					</SubmitButton>
				</Flex>
			</Box>
		</Flex>
	);
};

export default SkeletonOrder;
