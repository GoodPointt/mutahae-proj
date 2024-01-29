'use client';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import ReactInputMask from 'react-input-mask';

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

export const UserDetailsForm = ({ lang, userData }) => {
	const [state, dispatch] = useFormState(submitUserDetails, null);

	const toast = useToast();

	useEffect(() => {
		if (state && state.status === 'succsess')
			toast({
				status: 'success',
				title: 'success',
			});
		else if (state && state.status === 'error') {
			toast({
				status: 'error',
				title: 'error',
			});
		}
	}, [state, toast]);

	const maskedInputRef = useRef(null);

	const { username, lastName, phone, email } = userData;

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
					<FormControl isInvalid={firstNameError} mb="25px">
						<Input
							name="username"
							type="text"
							bgColor="#3b3d46"
							defaultValue={username}
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
					<FormControl isInvalid={lstNameNameError} mb="25px">
						<Input
							name="lastName"
							type="text"
							bgColor="#3b3d46"
							defaultValue={lastName}
							placeholder="Last name"
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
							{lstNameNameError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				<Flex
					gap={{ lg: '15px' }}
					mb="15px"
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					<FormControl isInvalid={emailError} mb="25px">
						<Input
							name="email"
							type="email"
							bgColor="#3b3d46"
							defaultValue={email}
							placeholder="Mail"
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
							{emailError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={phoneError} mb="35px">
						<Input
							ref={maskedInputRef}
							name="phone"
							as={ReactInputMask}
							type="tel"
							mask={'+\\972-**-***-****'}
							bgColor="#3b3d46"
							defaultValue={phone}
							placeholder="Phone"
							_placeholder={{ color: '#fff' }}
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
							{phoneError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
				</Flex>
				<SubmitButton w="calc((100% - 15px) /2 )">Save</SubmitButton>
			</Box>
		</Box>
	);
};
