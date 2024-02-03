'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';

import DeleteIcon from '../../svg/DeleteIcon';

const ListProductToBuy = () => {
	const [count, setCount] = useState(0);
	const decrement = () => {
		if (count === 1) {
			return;
		}
		setCount(count - 1);
	};

	const increment = () => {
		setCount(count + 1);
	};

	return (
		<Box as="ul" mt={'60px'} border={'1px solid #3B3D46'} padding={'30px'}>
			<Flex
				as="li"
				justifyContent={'space-between'}
				rowGap={{ base: '30px', md: '0px' }}
				alignItems={{ base: 'start', md: 'center' }}
				flexDir={{ base: 'column', md: 'row' }}
			>
				<Flex gap={'30px'}>
					<Box
						borderRadius={'2px'}
						position="relative"
						width="100px"
						height="100px"
						bgRepeat={'no-repeat'}
						bgPos={'center'}
						bgSize={'cover'}
					>
						<Image
							src={'/img/product.png'}
							alt={'product image'}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							style={{ objectFit: 'cover' }}
						/>
					</Box>
					<Flex flexDir={'column'} gap={'5px'} marginRight={'30px'}>
						<Heading as={'h3'} fontSize={'24px'} fontWeight={700}>
							Oak Mentina
						</Heading>
						<Box as="span" fontSize={'16px'} fontWeight={'500'}>
							€160
						</Box>
						<Text
							fontSize={'14px'}
							fontWeight={500}
							color={'#808080'}
							maxW={'257px'}
						>
							Sizes: 20,26,40x1000x1800-3000mm, A/B/Rustic
						</Text>
					</Flex>
				</Flex>
				<Flex>
					<Flex
						alignItems={'center'}
						justifyContent={'center'}
						gap={'40px'}
						border={'1px #3B3D46 solid'}
						maxW={'100%'}
						pt={'9px'}
						pb={'9px'}
						px={'40px'}
					>
						<Button
							variant={'link'}
							w={'16px'}
							minW={0}
							textColor={'#fff'}
							onClick={decrement}
							isDisabled={count === 1}
						>
							-
						</Button>

						<Text w={'25px'} textAlign={'center'}>
							{count}
						</Text>
						<Button
							variant={'link'}
							w={'16px'}
							minW={0}
							textColor={'#fff'}
							onClick={increment}
						>
							+
						</Button>
					</Flex>
					<Button
						variant="unstyled"
						p={0}
						bgColor="transparent"
						hover="transparent"
						// strokeHover={'#EE4B2B'}
						display={'flex'}
						justifyContent={'center'}
						stroke={'#fff'}
					>
						<DeleteIcon />
					</Button>
				</Flex>
			</Flex>
		</Box>
	);
};

export default ListProductToBuy;
