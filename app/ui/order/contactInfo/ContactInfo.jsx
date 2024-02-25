'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	useDisclosure,
} from '@chakra-ui/react';

import { useLocalBag } from '@/app/lib/hooks/useLocalBag';
import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';
import { submitData } from '../../../lib/orderActions';

import Modal from '../../modal/Modal';
import FinalAmount from '../finalAmount/FinalAmount';
import IsAccount from '../isAccount/IsAccount';
import ListProductToBuy from '../listProductToBuy/ListProductToBuy';
import OrderReject from '../orderReject/OrderReject';
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
	const [cityId, setCityId] = useState(null);
	const [ownCity, setOwnCity] = useState('');
	const [orderReject, setOrderReject] = useState(false);
	const [userAddressId, setUserAddressId] = useState(null);
	const [enteredAddress, setEnteredAddress] = useState('');
	const { isOpen = false, onOpen, onClose } = useDisclosure();

	const ref = useRef(null);
	const dis = goodsToMap.length === 0;
	const router = useRouter();

	const cityDetails = arrayCities.find(item => {
		return (
			item.cityName === selectedCity ||
			item.cityName.toLowerCase() === ownCity.toLowerCase()
		);
	});

	function calculateTotalDeliveryPrice(weight, basePrice) {
		let multiplier = Math.floor(weight / 5000) + 1;

		return basePrice * multiplier;
	}

	const calculateWeightAndPrice = (goods, attribute) =>
		goods.reduce((acc, { count, good }) => {
			const flattenGood = flattenAttributes(good);

			return acc + flattenGood[attribute] * count;
		}, 0);

	const weightGoods = calculateWeightAndPrice(goodsToMap, 'weight');
	const bagPrice = calculateWeightAndPrice(goodsToMap, 'price');

	const deliveryPrice = cityDetails?.zone.data.attributes.price;
	const totalDeliveryPrice = calculateTotalDeliveryPrice(
		weightGoods,
		deliveryPrice
	);

	const discountThreshold1 = 5000;
	const discountThreshold2 = 10000;
	const discount1 = 0.05;
	const discount2 = 0.08;

	let discount = 0;
	if (bagPrice > discountThreshold2) {
		discount = discount2;
	} else if (bagPrice > discountThreshold1) {
		discount = discount1;
	}

	const discountedBagPrice = Math.round(bagPrice * (1 - discount));

	const totalPrice = totalDeliveryPrice
		? discountedBagPrice + totalDeliveryPrice
		: discountedBagPrice;

	useEffect(() => {
		setGoodsToMap(localGoods);
	}, [authToken, orderData, localGoods]);

	useEffect(() => {
		setOrderReject(false);
		const handleNotification = async () => {
			try {
				setIsSubmitting(true);

				if (state.status === 201) {
					onOpen();
					setLocalGoods([]);
					setSelectedCity('');
					setEnteredAddress('');
					setOwnCity('');
					setCityId(null);
					setUserAddressId(null);
				} else {
					console.error(`Order rejected 'error send notify'`);
					onOpen();
					setOrderReject(true);
				}
			} catch (error) {
				console.error('handleNotification', 'error send notify');
			} finally {
				setIsSubmitting(false);
			}
		};

		if (state !== undefined) handleNotification();
	}, [state, authToken, onOpen, setLocalGoods, setSelectedCity]);

	useEffect(() => {
		if (state?.errors && Object.keys(state?.errors).length > 0) {
			ref.current.scrollIntoView({ behavior: 'smooth' });
			setIsSubmitting(false);
		}
	}, [state?.errors]);

	const handleFormSubmit = event => {
		event.preventDefault();
		setIsSubmitting(true);
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
				userAddressId,
				lang,
			},
		});
	};

	const handleClose = () => {
		onClose();
		if (!orderReject) {
			router.push(`/${lang}/catalog`);
		}
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
						goodsToMap={localGoods}
						dictionary={dictionary}
						setLocalGoods={setLocalGoods}
						authToken={authToken}
						orderData={orderData}
						bagPrice={bagPrice}
					/>
				)}
				<Heading
					as={'h3'}
					fontSize={'20px'}
					fontFamily={600}
					marginBottom={'30px'}
				>
					{dictionary.order.subtitle}
				</Heading>
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
										maxLength={30}
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
										maxLength={30}
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
										readOnly={authToken ? true : false}
										name="email"
										type="email"
										bgColor="#3b3d46"
										borderRadius={'2px'}
										maxLength={30}
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
										pl={lang === 'en' ? 4 : null}
										pr={lang === 'he' ? 4 : null}
										name="phone"
										type="tel"
										focusBorderColor="#a28445"
										border="1px solid transparent"
										bgColor="#3b3d46"
										maxLength={30}
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
							ownCity={ownCity}
							enteredAddress={enteredAddress}
							setEnteredAddress={setEnteredAddress}
							setUserAddressId={setUserAddressId}
							userAddressId={userAddressId}
							lang={lang}
						/>
					</Box>

					<FinalAmount
						dictionary={dictionary}
						selectedCity={selectedCity}
						arrayCities={arrayCities}
						isSubmitting={isSubmitting}
						deliveryPrice={totalDeliveryPrice}
						totalPrice={totalPrice}
						bagPrice={bagPrice}
						discount={discount}
						discountedBagPrice={discountedBagPrice}
						dis={dis}
						lang={lang}
					/>
				</Flex>
			</Box>
			<Modal isOpen={isOpen} onClose={handleClose} lang={lang}>
				{orderReject ? (
					<OrderReject dictionary={dictionary} lang={lang} />
				) : (
					<OrderThankYou dictionary={dictionary} lang={lang} />
				)}
			</Modal>
		</>
	);
};

export default ContactInfo;
