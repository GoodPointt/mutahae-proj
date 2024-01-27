'use client';
import { useFormState } from 'react-dom';

import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
} from '@chakra-ui/react';

import { submitUserAddress } from '../../../lib/actions';

import SubmitButton from '../../submitButton/SubmitButton';

export const AddressForm = ({ lang }) => {
	const [state, dispatch] = useFormState(submitUserAddress, undefined);

	const firstNameError =
		state?.errors?.firstName && state?.errors?.firstName.length > 0
			? state.errors.firstName[0]
			: null;

	const countryError =
		state?.errors?.country && state?.errors?.country.length > 0
			? state.errors.country[0]
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
		<Box>
			<Heading as="h4" fontSize="20px" fontWeight="600" mb="30px">
				Add new address
			</Heading>
			<Box as="form" action={dispatch}>
				<Flex
					gap={{ lg: '15px' }}
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					<FormControl isInvalid={firstNameError} mb="25px">
						<Input
							name="firstName"
							type="text"
							bgColor="#3b3d46"
							placeholder="First name"
							_placeholder={{ color: '#fff' }}
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
							{firstNameError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={countryError} mb="25px">
						<Input
							name="country"
							type="text"
							bgColor="#3b3d46"
							placeholder="Сountry / Region"
							_placeholder={{ color: '#fff' }}
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
							{countryError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				<Flex
					gap={{ lg: '15px' }}
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					<FormControl isInvalid={cityError} mb="25px">
						<Input
							name="city"
							type="text"
							bgColor="#3b3d46"
							placeholder="Сity"
							_placeholder={{ color: '#fff' }}
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
							{cityError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={streetError} mb="25px">
						<Input
							name="street"
							type="text"
							bgColor="#3b3d46"
							placeholder="Street"
							_placeholder={{ color: '#fff' }}
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
							{streetError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				<Flex
					gap={{ lg: '15px' }}
					mb="35px"
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					<FormControl isInvalid={indexError} mb="25px">
						<Input
							name="index"
							type="number"
							bgColor="#3b3d46"
							placeholder="Index"
							_placeholder={{ color: '#fff' }}
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
							{indexError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={appError}>
						<Input
							name="app"
							type="text"
							bgColor="#3b3d46"
							placeholder="App"
							_placeholder={{ color: '#fff' }}
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
							{appError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				<SubmitButton w="calc((100% - 15px) /2 )">Save</SubmitButton>
			</Box>
		</Box>
	);
};
