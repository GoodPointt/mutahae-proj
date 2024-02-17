'use client';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	useToast,
} from '@chakra-ui/react';

import { addUserAddressAction } from '../../../lib/actions';

import SubmitButton from '../../submitButton/SubmitButton';

export const AddressForm = ({ lang, dictionary }) => {
	const [state, dispatch] = useFormState(addUserAddressAction, null);
	const toast = useToast();
	const ref = useRef(null);

	const {
		title,
		region,
		city,
		street,
		app,
		index,
		btn,
		success,
		error,
		validation,
	} = dictionary;

	useEffect(() => {
		if (state && state?.status === 'success') {
			toast({
				status: 'success',
				title: success,
			});
			ref.current?.reset();
		} else if (state && state?.status === 'error') {
			toast({
				status: 'error',
				title: error,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const countryError =
		state?.errors?.region && state?.errors?.region.length > 0
			? state.errors.region[0]
			: null;

	const cityError =
		state?.errors?.city && state?.errors?.city.length > 0
			? state.errors.city[0]
			: null;

	const streetError =
		state?.errors?.street && state?.errors?.street.length > 0
			? state.errors.street[0]
			: null;

	const indexError =
		state?.errors?.index && state?.errors?.index.length > 0
			? state.errors.index[0]
			: null;

	const appError =
		state?.errors?.app && state?.errors?.app.length > 0
			? state.errors.app[0]
			: null;

	return (
		<Box mt="70px">
			<Heading as="h4" fontSize="20px" fontWeight="600" mb="30px">
				{title}
			</Heading>
			<Box as="form" action={dispatch} ref={ref}>
				<Flex
					gap={{ lg: '15px' }}
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					<FormControl isInvalid={countryError} pb="25px">
						<Input
							name="region"
							type="text"
							bgColor="#3b3d46"
							placeholder={region}
							borderRadius={'2px'}
							style={
								lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
							}
							focusBorderColor="#a28445"
							border={'1px solid transparent'}
						/>
						{/* <FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{countryError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage> */}
					</FormControl>
					<FormControl isInvalid={cityError} pb="25px">
						<Input
							name="city"
							type="text"
							bgColor="#3b3d46"
							placeholder={city}
							borderRadius={'2px'}
							style={
								lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
							}
							focusBorderColor="#a28445"
							border={'1px solid transparent'}
						/>
						<FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{cityError === 'required' ? validation.city.required : 'invalid'}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				<Flex
					gap={{ lg: '15px' }}
					mb="35px"
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					<FormControl isInvalid={streetError} pb="25px">
						<Input
							name="street"
							type="text"
							bgColor="#3b3d46"
							placeholder={street}
							borderRadius={'2px'}
							style={
								lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
							}
							focusBorderColor="#a28445"
							border={'1px solid transparent'}
						/>
						{/* <FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{streetError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage> */}
					</FormControl>
					<FormControl isInvalid={appError}>
						<Input
							name="app"
							type="text"
							bgColor="#3b3d46"
							placeholder={app}
							borderRadius={'2px'}
							style={
								lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
							}
							focusBorderColor="#a28445"
							border={'1px solid transparent'}
						/>
						{/* <FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{appError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage> */}
					</FormControl>
					<FormControl isInvalid={indexError} pb="25px">
						<Input
							name="index"
							type="number"
							bgColor="#3b3d46"
							placeholder={index}
							borderRadius={'2px'}
							style={
								lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
							}
							focusBorderColor="#a28445"
							border={'1px solid transparent'}
						/>
						{/* <FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{indexError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage> */}
					</FormControl>
				</Flex>
				<SubmitButton w="calc((100% - 15px) /2 )">{btn}</SubmitButton>
			</Box>
		</Box>
	);
};
