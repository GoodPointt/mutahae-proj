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
	useDisclosure,
} from '@chakra-ui/react';

import { sendTgNotification } from '@/app/lib/api/notifyInstance';
import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';
import { submitData } from '../../../lib/orderActions';

import Modal from '../../modal/Modal';
import FinalAmount from '../finalAmount/FinalAmount';
import IsAccount from '../isAccount/IsAccount';
import ListProductToBuy from '../listProductToBuy/ListProductToBuy';
import OrderThankYou from '../orderThankYou/OrderThankYou';
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
	userAddress,
}) => {
	const [state, dispatch] = useFormState(submitData, undefined);
	const [goodsToMap, setGoodsToMap] = useState([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [localGoods, setLocalGoods] = useLocalBag('localBag', []);
	const [cityId, setCityId] = useState();
	const [ownCity, setOwnCity] = useState('');
	const { isOpen = false, onOpen, onClose } = useDisclosure();

	const ref = useRef(null);
	const maskedInputRef = useRef(null);

	const cityDetails = arrayCities.find(item => {
		return (
			item.cityName === selectedCity ||
			item.cityName.toLowerCase() === ownCity.toLowerCase()
		);
	});

	const deliveryPrice = cityDetails?.zone.data.attributes.price;

	// const weightGoods = goodsToMap.reduce((acc, { count, good }) => {
	// 	const flattenGood = flattenAttributes(good);

	// 	return acc + flattenGood.weight * count;
	// }, 0);

	const bagPrice = goodsToMap.reduce((acc, { count, good }) => {
		const flattenGood = flattenAttributes(good);

		return acc + flattenGood.price * count;
	}, 0);

	const totalPrice = deliveryPrice ? bagPrice + deliveryPrice : bagPrice;
	const dis = goodsToMap.length === 0;

	useEffect(() => {
		if (!authToken) {
			setGoodsToMap(localGoods || []);
		} else {
			const { goods } = orderData || {};

			setGoodsToMap(goods || []);
		}
	}, [authToken, orderData, localGoods]);

	useEffect(() => {
		const handleNotification = async () => {
			try {
				setIsSubmitting(true);

				const listGoods = state.goods.map(good => ({
					title: authToken
						? good?.good?.data?.attributes.title
						: good.good.attributes.title,
					count: good.count,
				}));

				const res = await sendTgNotification({
					firstName: state.firstName,
					lastName: state.lastName,
					email: state.email,
					phone: state.phone,
					delivery: state.deliveryAddress,
					orderPrice: state.totalPrice,
					goods: listGoods,
				});

				if (res.status === 201) {
					onOpen();
					if (!authToken) setLocalGoods([]);
					setSelectedCity('');
				}
			} catch (error) {
				console.error(error);
			} finally {
				setIsSubmitting(false);
			}
		};

		if (state?.message === 'success') {
			handleNotification();
		}
	}, [state, authToken, onOpen, setLocalGoods, setSelectedCity]);

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
				deliveryAddress: selectedCity,
				cityId,
				lang,
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
			<Box position="relative">
				{goodsToMap.length !== 0 && (
					<ListProductToBuy
						goodsToMap={goodsToMap}
						setGoodsToMap={setGoodsToMap}
						setLocalGoods={setLocalGoods}
						authToken={authToken}
					/>
				)}
				<Flex
					flexDirection={{ base: 'column', xl: 'row' }}
					gap={'50px'}
					alignItems={'start'}
					as="form"
					onSubmit={handleFormSubmit}
					ref={ref}
					autoComplete="off"
				>
					<Box w={{ base: '100%', lg: '651px', xl: '751px' }}>
						<Flex flexDir={'column'} rowGap={'25px'} mb={'20px'}>
							<Box
								display={'flex'}
								flexDir={{ base: 'column', sm: 'row' }}
								gap={{ base: '25px', sm: '15px' }}
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
										fontSize={{ base: '12px', sm: '14px' }}
										position="absolute"
										bottom="-20px"
									>
										{firstNameError === 'required'
											? name.required
											: name.invalid}
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
										fontSize={{ base: '12px', sm: '14px' }}
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
								gap={{ base: '25px', sm: '15px' }}
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
										fontSize={{ base: '12px', sm: '14px' }}
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
										fontSize={{ base: '12px', sm: '14px' }}
										position="absolute"
										bottom="-20px"
									>
										{phoneError === 'required' ? phone.required : phone.invalid}
									</FormErrorMessage>
								</FormControl>
							</Box>
						</Flex>
						{!authToken && <IsAccount dictionary={dictionary} lang={lang} />}

						<Shipping
							arrayCities={arrayCities}
							setCityId={setCityId}
							dictionary={dictionary}
							setSelectedCity={setSelectedCity}
							selectedCity={selectedCity}
							userAddress={userAddress}
							setOwnCity={setOwnCity}
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
			</Box>
			<Modal isOpen={isOpen} onClose={onClose} lang={lang}>
				<OrderThankYou dictionary={dictionary} lang={lang} />
			</Modal>
		</>
	);
};

export default ContactInfo;
