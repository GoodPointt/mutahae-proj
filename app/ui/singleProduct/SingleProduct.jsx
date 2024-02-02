'use client';

import { useState } from 'react';
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

import { submitProductToBag } from '@/app/lib/actions';
import useLocalStorage from '@/app/lib/hooks/useLocalStorage';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import Btn from '../button/Btn';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import SubmitButton from '../submitButton/SubmitButton';

import BreadcrumbBar from './Breadcrumb/Breadcrumb';
import Counter from './Counter/Counter';
import SingleProductSlider from './singleProductSlider/SingleProductSlider';

const SingleProduct = ({ userId, productId, dictionary, product }) => {
	const {
		img: { data: imgs },
		title,
		length,
		width,
		descLong,
		thickness,
		wood,
		type,
		manufacturer,
	} = product;

	const productDetails = { length, width, thickness, wood, type, manufacturer };

	const [count, setCount] = useState(1);
	const [localBag, setLocalBag] = useLocalStorage('localBag', []);

	const [, formAction] = useFormState(submitProductToBag);

	const addGoodInLocal = (count, goodId) => {
		const isSame = localBag.find(({ id }) => id === goodId);

		if (isSame) {
			const updatedBag = localBag.map(item => {
				if (item.id === goodId) {
					return { ...item, count: item.count + 1 };
				}

				return item;
			});
			setLocalBag(updatedBag);
		} else {
			setLocalBag([
				...localBag,
				{ count, good: flattenAttributes(product), id: goodId },
			]);
		}
	};

	return (
		<>
			<SectionWrapper>
				<BreadcrumbBar productTitle={title} />
				<Grid
					templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }}
					gap={'50px'}
					maxW={'100%'}
				>
					<SingleProductSlider imgs={Array.isArray(imgs) ? imgs : []} />
					<Flex flexDir={'column'} gap={2}>
						<Heading
							as="h2"
							mb={{ base: 6, lg: 8 }}
							fontSize={{ base: '2xl', lg: '4xl' }}
						>
							{title || ''}
						</Heading>
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
							templateColumns={{ base: 'repeat(2, 1fr)', lg: '1fr 2fr' }}
							gap={'10px'}
							mt={'auto'}
							alignItems={'center'}
						>
							<Counter count={count} setCount={setCount} />
							{userId ? (
								<form
									action={() =>
										formAction({ userId: userId.value, count, productId })
									}
								>
									{/* <VisuallyHiddenInput name="userId" value={userId.value} />
									<VisuallyHiddenInput name="count" value={count} />
									<VisuallyHiddenInput name="productId" value={productId} /> */}
									<Box pos={'relative'}>
										<SubmitButton type="submit">
											{dictionary.buttons.bag}
										</SubmitButton>
									</Box>
								</form>
							) : (
								<Btn
									type="submit"
									onClick={() => addGoodInLocal(count, productId)}
								>
									{dictionary.buttons.bag}
								</Btn>
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
