'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import {
	Box,
	Button,
	Flex,
	Grid,
	Heading,
	List,
	ListItem,
	Text,
	useDisclosure,
} from '@chakra-ui/react';

import { submitGoodToFavorite, submitProductToBag } from '@/app/lib/actions';
import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import Bag from '../bag/Bag';
import Modal from '../modal/Modal';
import SubmitButton from '../submitButton/SubmitButton';

import BreadcrumbBar from './Breadcrumb/Breadcrumb';
import Counter from './Counter/Counter';
import FavBtn from './FavBtn/FavBtn';
import IsInBag from './isInBag/IsInBag';
import SingleProductSlider from './singleProductSlider/SingleProductSlider';
import TotalBagPrice from './TotalBagPrice/TotalBagPrice';

const SingleProduct = ({
	userId,
	dictionary,
	product,
	isFavorite,
	bagData,
}) => {
	const {
		id: goodId,
		attributes: {
			img: { data: imgs },
			title,
			length,
			width,
			descLong,
			thickness,
			wood,
			type,
			manufacturer,
			price,
			unit,
		},
	} = product;

	const productDetails = { length, width, thickness, wood, type, manufacturer };
	const { isOpen, onClose, onOpen } = useDisclosure();
	const [count, setCount] = useState(1);
	const [localBag, setLocalBag] = useLocalBag('localBag', []);

	const [, formAction] = useFormState(submitProductToBag);
	const [, favoriteAction] = useFormState(submitGoodToFavorite);
	const [totalPrice, setTotalPrice] = useState(null);
	const [isInBag, setIsInBag] = useState(false);

	useEffect(() => {
		if (!userId) {
			const totalLocalPrice = localBag.reduce((acc, { count, good }) => {
				const flattenGood = flattenAttributes(good);

				return acc + flattenGood.price * count;
			}, 0);
			setTotalPrice(totalLocalPrice);
		} else {
			setTotalPrice(bagData[0].bagPrice);
		}
	}, [localBag, bagData, userId, totalPrice]);

	useEffect(() => {
		if (!userId) {
			const isInLocalBag = localBag.some(({ good }) => good.id === goodId);
			setIsInBag(isInLocalBag);
		} else {
			const isInBag = bagData[0].goods.some(
				({ good }) => good.data.id === goodId
			);
			setIsInBag(isInBag);
		}
	}, [bagData, goodId, localBag, userId]);

	const addGoodInLocal = (count, goodId) => {
		const isSame = localBag.find(({ good }) => good.id === goodId);

		if (isSame) {
			const updatedBag = localBag.map(item => {
				if (item.good.id === goodId) {
					return { ...item, count: item.count + count };
				}

				return item;
			});
			setLocalBag(updatedBag);
		} else {
			setLocalBag([...localBag, { count, good: product }]);
		}
	};

	return (
		<>
			<Box
				key={count}
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
				mb={'30px'}
			>
				<BreadcrumbBar productTitle={title} />
				{userId && (
					<form
						action={() => favoriteAction({ goodId })}
						style={{ display: 'flex', alignItems: 'center' }}
					>
						<FavBtn
							type="submit"
							variant={'unstyled'}
							display={'flex'}
							justifyContent={'center'}
							isFavorite={isFavorite}
							minW={0}
							p={0}
							maxH={'24px'}
						/>
					</form>
				)}
			</Box>
			<Grid
				templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
				gap={'50px'}
				maxW={'100%'}
				pos={'relative'}
			>
				<SingleProductSlider imgs={Array.isArray(imgs) ? imgs : []} />
				<Flex flexDir={'column'} gap={'30px'}>
					<Heading as="h2" fontSize={{ base: '2xl', lg: '4xl' }}>
						{title || ''}
					</Heading>
					{price && (
						<Text fontSize={'28px'}>
							{price !== 0 && `${price} ₪`} {unit && `/ ${unit}`}
						</Text>
					)}
					<List>
						{Object.entries(productDetails).map(
							([option, value]) =>
								value && (
									<ListItem key={option}>
										<Text
											as="p"
											textTransform="capitalize"
											fontSize="sm"
											fontWeight="600"
										>
											{option}:
											<Text as="span" ml="4px" fontWeight="400">
												{value}
											</Text>
										</Text>
									</ListItem>
								)
						)}
					</List>

					<Grid
						templateColumns={{ base: '1fr ', sm: '1fr 2fr' }}
						gap={'10px'}
						mt={{ base: '30px', lg: 'auto' }}
						alignItems={'center'}
					>
						<Counter count={count} setCount={setCount} />
						{userId ? (
							<form
								action={() =>
									formAction({
										count,
										goodId,
										goodPrice: count * price,
									})
								}
							>
								<Box pos={'relative'}>
									<SubmitButton type="submit" message={'loading'}>
										<Text as={'span'}>{dictionary.buttons.bag}</Text>
									</SubmitButton>
									<TotalBagPrice
										count={count}
										totalPrice={price * count}
										isInBag={isInBag}
									/>
									<IsInBag isInBag={isInBag} onOpen={onOpen} />
								</Box>
							</form>
						) : (
							<Box pos={'relative'}>
								<Button
									w={'100%'}
									color={'#fff'}
									_hover={{ bgColor: '#81672e' }}
									borderRadius={0}
									bgColor={'#a28445'}
									pos={'relative'}
									onClick={() => {
										addGoodInLocal(count, goodId);
									}}
								>
									{dictionary.buttons.bag}
								</Button>
								<TotalBagPrice
									count={count}
									totalPrice={price * count}
									isInBag={isInBag}
								/>
								<IsInBag isInBag={isInBag} onOpen={onOpen} />
							</Box>
						)}
					</Grid>
				</Flex>
			</Grid>
			{descLong && (
				<>
					<Heading
						as="h2"
						mb={{ base: 6, lg: 8 }}
						mt={'60px'}
						fontSize={{ base: '2xl', lg: '4xl' }}
					>
						{dictionary.singleProduct.description}
					</Heading>
					<Text as="p" fontWeight={'400'}>
						{descLong}
					</Text>
				</>
			)}

			<Modal isOpen={isOpen} onClose={onClose}>
				<Bag
					bagData={bagData ? bagData[0] : {}}
					hasToken={!!userId}
					onClose={onClose}
				/>
			</Modal>
		</>
	);
};

export default SingleProduct;
