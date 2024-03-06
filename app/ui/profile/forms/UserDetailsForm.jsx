'use client';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';

import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	Input,
	useToast,
} from '@chakra-ui/react';

import { submitUserDetails } from '../../../lib/actions';

import SubmitButton from '../../submitButton/SubmitButton';

export const UserDetailsForm = ({ lang, userData, userDetailsDictionary }) => {
	const [state, dispatch] = useFormState(submitUserDetails, null);
	const { userDetailsForm } = userDetailsDictionary;

	const toast = useToast();

	useEffect(() => {
		if (state && state?.status === 'success')
			toast({
				status: 'success',
				title: userDetailsForm.success,
			});
		else if (state && state?.status === 'error') {
			toast({
				status: 'error',
				title: userDetailsForm.error,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const { firstName, lastName, phone, email } = userData;

	const firstNameError =
		state?.errors?.firstName && state?.errors?.firstName.length > 0
			? state.errors.firstName[0]
			: null;

	const lstNameNameError =
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

	return (
		<Box mb="70px">
			<Box as="form" action={dispatch}>
				<Flex
					gap={{ lg: '15px' }}
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					<FormControl isInvalid={firstNameError} pb="25px">
						<Input
							name="firstName"
							type="text"
							bgColor="#3b3d46"
							defaultValue={firstName}
							placeholder={userDetailsForm.firstName}
							style={
								lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
							}
							focusBorderColor="#a28445"
							border={'1px solid transparent'}
							borderRadius={'2px'}
						/>
						<FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{firstNameError === 'required'
								? userDetailsForm.validation.firstName.required
								: userDetailsForm.validation.firstName.invalid}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={lstNameNameError} mb="25px">
						<Input
							name="lastName"
							type="text"
							bgColor="#3b3d46"
							defaultValue={lastName}
							placeholder={userDetailsForm.lastName}
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
							{lstNameNameError === 'required'
								? userDetailsForm.validation.lastName.required
								: userDetailsForm.validation.lastName.invalid}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				<Flex
					gap={{ lg: '15px' }}
					mb="15px"
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					<FormControl isInvalid={emailError} pb="25px">
						<Input
							name="email"
							type="email"
							bgColor="#3b3d46"
							defaultValue={email}
							placeholder={userDetailsForm.email}
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
							{emailError === 'required'
								? userDetailsForm.validation.email.required
								: userDetailsForm.validation.email.invalid}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={phoneError} pb="25px" mb="15px">
						<Input
							name="phone"
							type="tel"
							bgColor="#3b3d46"
							defaultValue={phone}
							placeholder={userDetailsForm.phone}
							borderRadius={'2px'}
							style={
								lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
							}
							textAlign={lang === 'he' ? 'right' : 'left'}
							focusBorderColor="#a28445"
							border={'1px solid transparent'}
						/>

						<FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{phoneError === 'required'
								? userDetailsForm.validation.phone.required
								: userDetailsForm.validation.phone.invalid}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				<SubmitButton w={{ base: '100%', md: 'calc((100% - 15px) /2 )' }}>
					{userDetailsForm.btn}
				</SubmitButton>
			</Box>
		</Box>
	);
};
