'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import ReactInputMask from 'react-input-mask';

import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
} from '@chakra-ui/react';

import { sendTgNotification } from '@/app/lib/api/notifyInstance';
import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';
import { submitData } from '../../../lib/orderActions';

import FinalAmount from '../finalAmount/FinalAmount';
import IsAccount from '../isAccount/IsAccount';
import ListProductToBuy from '../listProductToBuy/ListProductToBuy';
import Shipping from '../shipping/Shipping';

const ContactInfo = ({
	dictionary,
	lang,
	authToken,
	arrayCities,
	setSelectedCity,
	selectedCity,
	userData,
	orderData,
}) => {
	const [state, dispatch] = useFormState(submitData, undefined);
	const [goodsToMap, setGoodsToMap] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [enteredAddress, setEnteredAddress] = useState('');
	const [localGoods, setLocalGoods] = useLocalBag('localBag', []);
	const [cityId, setCityId] = useState();

	const ref = useRef(null);

	const maskedInputRef = useRef(null);

	const cityDetails = arrayCities.find(item => item.cityName === selectedCity);
	const deliveryPrice = cityDetails?.zone.data.attributes.price;

	const bagPrice = goodsToMap.reduce((acc, { count, good }) => {
		const flattenGood = flattenAttributes(good);

		return acc + flattenGood.price * count;
	}, 0);

	let totalPrice = 0;

	if (deliveryPrice) {
		totalPrice = bagPrice + deliveryPrice;
	} else {
		totalPrice = bagPrice;
	}

	let dis = false;

	if (goodsToMap.length === 0) {
		dis = true;
	} else {
		dis = false;
	}

	useEffect(() => {
		if (!authToken) {
			setGoodsToMap(localGoods || []);
		} else {
			const { goods } = orderData || {};

			setGoodsToMap(goods || []);
		}
	}, [authToken, orderData, localGoods]);

	useEffect(() => {
		(async () => {
			if (state?.message === 'success') {
				try {
					setIsSubmitting(true);

					const listGoods = state.goods.map(good => {
						if (authToken) {
							return {
								title: good?.good?.data?.attributes.title,
								count: good.count,
							};
						} else {
							return {
								title: good.good.attributes.title,
								count: good.count,
							};
						}
					});

					await sendTgNotification({
						firstName: state.firstName,
						lastName: state.lastName,
						email: state.email,
						phone: state.phone,
						delivery: state.deliveryAddress,
						orderPrice: state.totalPrice,
						goods: listGoods,
					});
				} catch (error) {
					console.error(error);
				} finally {
					setIsSubmitting(false);
				}
			}
		})();
	}, [state, authToken]);

	const handleFormSubmit = event => {
		event.preventDefault();
		const formData = new FormData(event.target);
		const formValues = Object.fromEntries(formData.entries());
		dispatch({
			type: 'SUBMIT_FORM',
			payload: {
				formValues,
				totalPrice,
				goods: goodsToMap,
				deliveryAddress: selectedCity || enteredAddress,
				cityId,
			},
		});
	};

	const firstNameError =
		state?.errors?.firstName && state?.errors?.firstName.length > 0
			? state.errors.firstName[0]
			: null;

	const lastNameError =
		state?.errors?.lastName && state?.errors?.lastName.length > 0
			? state.errors.lastName[0]
			: null;

	const emailError =
		state?.errors?.email && state?.errors?.email.length > 0
			? state.errors.email[0]
			: null;

	const phoneError =
		state?.errors?.phone && state?.errors?.phone.length > 0
			? state.errors.phone[0]
			: null;

	const { email, phone, name, lastName } = dictionary.formContact.errors;

	return (
		<>
			<Flex
				flexDirection={{ base: 'column', lg: 'row' }}
				gap={'50px'}
				alignItems={'start'}
				as="form"
				onSubmit={handleFormSubmit}
				ref={ref}
				autoComplete="off"
			>
				<Box w={{ base: '100%', lg: '651px', xl: '751px' }}>
					<Flex
						flexDir={'column'}
						rowGap={{ base: '15px', sm: '25px' }}
						mb={'20px'}
					>
						<Box
							display={'flex'}
							flexDir={{ base: 'column', sm: 'row' }}
							gap={'15px'}
						>
							<FormControl isInvalid={firstNameError}>
								<Input
									name="firstName"
									type="text"
									bgColor="#3b3d46"
									borderRadius={'2px'}
									position={'relative'}
									defaultValue={userData?.firstName || ''}
									placeholder={dictionary.order.firstName}
									style={
										lang === 'he'
											? { direction: 'ltr', textAlign: 'right' }
											: null
									}
									focusBorderColor="#a28445"
									border="1px solid transparent"
								/>
								<FormErrorMessage
									fontSize={'14px'}
									position="absolute"
									bottom="-20px"
								>
									{firstNameError === 'required' ? name.required : name.invalid}
								</FormErrorMessage>
							</FormControl>

							<FormControl isInvalid={lastNameError}>
								<Input
									name="lastName"
									type="text"
									bgColor="#3b3d46"
									borderRadius={'2px'}
									defaultValue={userData?.lastName || ''}
									placeholder={dictionary.order.lastName}
									style={
										lang === 'he'
											? { direction: 'ltr', textAlign: 'right' }
											: null
									}
									focusBorderColor="#a28445"
									border="1px solid transparent"
								/>
								<FormErrorMessage
									fontSize={'14px'}
									position="absolute"
									bottom="-20px"
								>
									{lastNameError === 'required'
										? lastName.required
										: lastName.invalid}
								</FormErrorMessage>
							</FormControl>
						</Box>

						<Box
							display={'flex'}
							flexDir={{ base: 'column', sm: 'row' }}
							gap={'15px'}
						>
							<FormControl isInvalid={emailError}>
								<Input
									name="email"
									type="email"
									bgColor="#3b3d46"
									borderRadius={'2px'}
									defaultValue={userData?.email || ''}
									placeholder={dictionary.order.mail}
									style={
										lang === 'he'
											? { direction: 'ltr', textAlign: 'right' }
											: null
									}
									focusBorderColor="#a28445"
									border={'1px solid transparent'}
								/>
								<FormErrorMessage
									fontSize={'14px'}
									position="absolute"
									bottom="-20px"
								>
									{emailError === 'required' ? email.required : email.invalid}
								</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={phoneError}>
								<Input
									ref={maskedInputRef}
									pl={lang === 'en' ? 4 : null}
									pr={lang === 'he' ? 4 : null}
									name="phone"
									as={ReactInputMask}
									type="tel"
									focusBorderColor="#a28445"
									border="1px solid transparent"
									bgColor="#3b3d46"
									borderRadius={'2px'}
									defaultValue={userData?.phone || ''}
									placeholder={dictionary.order.phone}
									mask={'+\\972-**-***-****'}
									style={
										lang === 'he'
											? { direction: 'ltr', textAlign: 'right' }
											: null
									}
								/>

								<FormErrorMessage
									fontSize={'14px'}
									position="absolute"
									bottom="-20px"
								>
									{phoneError === 'required' ? phone.required : phone.invalid}
								</FormErrorMessage>
							</FormControl>
						</Box>
					</Flex>
					{!authToken && <IsAccount dictionary={dictionary} lang={lang} />}
					{goodsToMap.length !== 0 && (
						<ListProductToBuy
							goodsToMap={goodsToMap}
							setGoodsToMap={setGoodsToMap}
							setLocalGoods={setLocalGoods}
							authToken={authToken}
						/>
					)}

					<Shipping
						arrayCities={arrayCities}
						setCityId={setCityId}
						dictionary={dictionary}
						setSelectedCity={setSelectedCity}
						selectedCity={selectedCity}
						enteredAddress={enteredAddress}
						setEnteredAddress={setEnteredAddress}
					/>
				</Box>

				<FinalAmount
					dictionary={dictionary}
					selectedCity={selectedCity}
					arrayCities={arrayCities}
					isSubmitting={isSubmitting}
					deliveryPrice={deliveryPrice}
					totalPrice={totalPrice}
					bagPrice={bagPrice}
					dis={dis}
				/>
			</Flex>
		</>
	);
};

export default ContactInfo;
