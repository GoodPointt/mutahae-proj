'use client';

import { useRef } from 'react';
import { useFormState } from 'react-dom';
import ReactInputMask from 'react-input-mask';

import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
} from '@chakra-ui/react';

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
	onValueChange,
	selectedCity,
	userData,
	orderData,
}) => {
	const [state, dispatch] = useFormState(submitData, undefined);

	const ref = useRef(null);

	const maskedInputRef = useRef(null);

	// useEffect(() => {
	// 	(async () => {
	// 		if (state?.message === 'success') {

	// 		}
	// 	})();
	// }, [state]);

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
		<Box as="form" action={dispatch} ref={ref} autoComplete="off">
			<Flex
				flexDirection={{ base: 'column', lg: 'row' }}
				gap={'50px'}
				alignItems={'start'}
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
					<ListProductToBuy orderData={orderData} authToken={authToken} />
					<Shipping
						arrayCities={arrayCities}
						dictionary={dictionary}
						onValueChange={onValueChange}
					/>
				</Box>
				<FinalAmount
					dictionary={dictionary}
					selectedCity={selectedCity}
					arrayCities={arrayCities}
				/>
			</Flex>
		</Box>
	);
};

export default ContactInfo;
