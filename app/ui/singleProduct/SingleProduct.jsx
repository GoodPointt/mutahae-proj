'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import {
	Box,
	Flex,
	Grid,
	Heading,
	List,
	ListItem,
	Text,
} from '@chakra-ui/react';

import { submitGoodToFavorite, submitProductToBag } from '@/app/lib/actions';
import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import Btn from '../button/Btn';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import SubmitButton from '../submitButton/SubmitButton';

import BreadcrumbBar from './Breadcrumb/Breadcrumb';
import Counter from './Counter/Counter';
import FavBtn from './FavBtn/FavBtn';
import SingleProductSlider from './singleProductSlider/SingleProductSlider';

const SingleProduct = ({
	userId,
	dictionary,
	product,
	isFavorite,
	bagPrice,
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

	const [count, setCount] = useState(1);
	const [localBag, setLocalBag] = useLocalBag('localBag', []);

	const [, formAction] = useFormState(submitProductToBag);
	const [, favoriteAction] = useFormState(submitGoodToFavorite);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		if (!userId) {
			const totalLocalPrice = localBag.reduce((acc, { count, good }) => {
				const flattenGood = flattenAttributes(good);

				return acc + flattenGood.price * count;
			}, 0);
			setTotalPrice(totalLocalPrice);
		} else {
			setTotalPrice(bagPrice);
		}
	}, [bagPrice, localBag, price, userId]);

	const addGoodInLocal = (count, goodId) => {
		const isSame = localBag.find(({ good }) => good.id === goodId);

		if (isSame) {
			const updatedBag = localBag.map(item => {
				if (item.good.id === goodId) {
					return { ...item, count };
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
			<SectionWrapper>
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
								fill={isFavorite ? '#A28445' : 'transparent'}
								minW={0}
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
					<Flex flexDir={'column'} gap={2}>
						<Heading
							as="h2"
							mb={{ base: '15px', lg: '15px' }}
							fontSize={{ base: '2xl', lg: '4xl' }}
						>
							{title || ''}
						</Heading>
						<Text fontSize={'24px'}>
							{price}₪ {`/ ${unit}`}
						</Text>
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
											bagPrice: totalPrice + count * price,
										})
									}
								>
									<Box pos={'relative'}>
										<SubmitButton type="submit">
											{dictionary.buttons.bag}
										</SubmitButton>
									</Box>
									{totalPrice && <Text>Total: {totalPrice}</Text>}
								</form>
							) : (
								<>
									<Btn
										onClick={() => {
											addGoodInLocal(count, goodId);
										}}
									>
										{dictionary.buttons.bag}
									</Btn>
									{totalPrice && <Text>Total: {totalPrice}</Text>}
								</>
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
			</SectionWrapper>
		</>
	);
};

export default SingleProduct;
