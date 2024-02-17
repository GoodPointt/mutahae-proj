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
	useMediaQuery,
} from '@chakra-ui/react';

import { submitProductToBag } from '@/app/lib/actions';
import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import Bag from '../bag/Bag';
import Modal from '../modal/Modal';
import SubmitButton from '../submitButton/SubmitButton';

import BreadcrumbBar from './Breadcrumb/Breadcrumb';
import Counter from './Counter/Counter';
import IsInBag from './isInBag/IsInBag';
import SingleProductSlider from './singleProductSlider/SingleProductSlider';
import TotalBagPrice from './TotalBagPrice/TotalBagPrice';

import { AnimatePresence, motion } from 'framer-motion';

export const dynamic = 'force-dynamic';

const SingleProduct = ({ userId, dictionary, product, bagData, favorites }) => {
	const {
		id: goodId,
		attributes: {
			uid,
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
	const [isMobile] = useMediaQuery('(max-width: 480px)', {
		ssr: true,
		fallback: false,
	});
	const [favs, setFavs] = useState(favorites);

	useEffect(() => {
		localStorage.setItem('favs', JSON.stringify(favs));
	}, [favs]);

	const [, formAction] = useFormState(submitProductToBag);

	const [totalPrice, setTotalPrice] = useState(null);
	const [isInBag, setIsInBag] = useState(false);

	useEffect(() => {
		const good = localBag.find(({ good }) => good.data.id === goodId);
		good ? setCount(good.count) : setCount(1);
	}, [bagData, goodId, localBag, userId]);

	useEffect(() => {
		const totalLocalPrice = localBag.reduce((acc, { count, good }) => {
			const flattenGood = flattenAttributes(good);

			return acc + flattenGood.price * count;
		}, 0);
		setTotalPrice(totalLocalPrice);
	}, [localBag, bagData, userId, totalPrice]);

	useEffect(() => {
		const isInLocalBag = localBag.find(
			({ good: { data } }) => data.attributes.uid === uid
		);
		setIsInBag(isInLocalBag);
	}, [localBag, uid]);

	const addGoodInLocal = (count, goodUid) => {
		const isSame = localBag.find(
			({ good: { data } }) => data.attributes.uid === goodUid
		);

		if (isSame) {
			const updatedBag = localBag.map(item => {
				if (item.id === goodUid) {
					return { ...item, count: item.count + count };
				}

				return item;
			});
			setLocalBag(updatedBag);
		} else {
			setLocalBag([...localBag, { count, good: { data: product } }]);
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
				<BreadcrumbBar
					favs={favs}
					setFavs={setFavs}
					productTitle={title}
					dictionary={dictionary}
					product={product}
					userId={userId}
				/>
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
							([option, value], i) =>
								value && (
									<ListItem key={option}>
										<Text
											as="p"
											textTransform="capitalize"
											fontSize="sm"
											fontWeight="600"
										>
											{dictionary.singleProduct.productData[i]}
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
						<Box pos={'relative'}>
							<Counter
								count={count}
								setCount={setCount}
								isInBag={isInBag}
								isBlock={isMobile}
								dictionary={dictionary}
							/>
							<TotalBagPrice
								dictionary={dictionary}
								count={count}
								totalPrice={price * count}
								isInBag={isInBag}
							/>
						</Box>
						{userId ? (
							<form
								action={() =>
									formAction({ count, goodId, goodPrice: totalPrice })
								}
							>
								<>
									<Box
										pos={'relative'}
										display={'flex'}
										w={'100%'}
										justifyContent={'center'}
									>
										{isInBag ? (
											<IsInBag
												isInBag={isInBag}
												onOpen={onOpen}
												dictionary={dictionary}
											/>
										) : (
											<AnimatePresence>
												<Box
													as={motion.div}
													w={'100%'}
													initial={{ opacity: 0, y: -20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, y: 0 }}
													transitionDuration={'0.2s'}
													transitionTimingFunction={'ease'}
												>
													<SubmitButton
														onClick={() => addGoodInLocal(count, uid)}
														type="submit"
														message={dictionary.buttons.loaders.addBtn}
													>
														<Text as={'span'}>{dictionary.buttons.bag}</Text>
													</SubmitButton>
												</Box>
											</AnimatePresence>
										)}
									</Box>
								</>
							</form>
						) : (
							<Box
								pos={'relative'}
								display={'flex'}
								w={'100%'}
								justifyContent={'center'}
							>
								{isInBag ? (
									<IsInBag
										isInBag={isInBag}
										onOpen={onOpen}
										dictionary={dictionary}
									/>
								) : (
									<AnimatePresence>
										<Box
											as={motion.div}
											w={'100%'}
											initial={{ opacity: 0, y: -20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 0 }}
											transition="0.2s easeOut"
										>
											<Button
												w={'100%'}
												color={'#fff'}
												_hover={{ bgColor: '#81672e' }}
												borderRadius={0}
												bgColor={'#a28445'}
												pos={'relative'}
												onClick={() => {
													addGoodInLocal(count, uid);
												}}
											>
												{dictionary.buttons.bag}
											</Button>
										</Box>
									</AnimatePresence>
								)}
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
					dictionary={dictionary}
					onClose={onClose}
				/>
			</Modal>
		</>
	);
};

export default SingleProduct;
