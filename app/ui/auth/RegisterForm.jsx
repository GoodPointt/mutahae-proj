'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import {
	Box,
	FormControl,
	FormErrorMessage,
	Input,
	useToast,
} from '@chakra-ui/react';

import { registerAction } from '@/app/lib/actions';

import SubmitButton from '../submitButton/SubmitButton';

const RegisterForm = ({ dictionary, lang }) => {
	const [state, dispatch] = useFormState(registerAction, undefined);
	const toast = useToast();

	const ref = useRef(null);

	const nameError =
		state?.errors?.name && state?.errors?.name.length > 0
			? state.errors.name[0]
			: null;
	const lastNameError =
		state?.errors?.lastName && state?.errors?.lastName.length > 0
			? state.errors.lastName[0]
			: null;

	const emailError =
		state?.errors?.email && state?.errors?.email.length > 0
			? state.errors.email[0]
			: null;

	const passwordError =
		state?.errors?.password && state?.errors?.password.length > 0
			? state.errors.password[0]
			: null;

	useEffect(() => {
		(() => {
			if (state?.message === 'Email or Username are already taken') {
				toast({
					status: 'warning',
					title: dictionary.formContact.toasts.form.registerWarning,
				});
			}
			if (state?.message === 'succsess') {
				// sendEmail(state);
				ref.current?.reset();
			}
		})();
	}, [dictionary.formContact.toasts.form.registerWarning, state, toast]);

	const { email, password, name, lastName } = dictionary.formContact.errors;

	return (
		<Box as="form" action={dispatch} ref={ref} width={'100%'} autoComplete="on">
			<FormControl isInvalid={nameError} pb="25px">
				<Input
					name="name"
					type="text"
					bgColor="#3b3d46"
					placeholder={dictionary.formContact.nameLabel}
					style={
						lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
					}
					focusBorderColor="#a28445"
					border={'1px solid transparent'}
					borderRadius={'2px'}
				/>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{nameError === 'required' ? name.required : name.invalid}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={nameError} pb="25px">
				<Input
					name="lastName"
					type="text"
					bgColor="#3b3d46"
					placeholder={dictionary.formContact.lastNameLabel}
					style={
						lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
					}
					focusBorderColor="#a28445"
					border={'1px solid transparent'}
					borderRadius={'2px'}
				/>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{lastNameError === 'required' ? lastName.required : lastName.invalid}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={emailError} pb="25px">
				<Input
					name="email"
					type="email"
					bgColor="#3b3d46"
					placeholder={dictionary.formContact.mailLabel}
					style={
						lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
					}
					focusBorderColor="#a28445"
					border={'1px solid transparent'}
					borderRadius={'2px'}
				/>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{emailError === 'required' ? email.required : email.invalid}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={passwordError} pb="25px">
				<Input
					name="password"
					type="password"
					bgColor="#3b3d46"
					placeholder={dictionary.formContact.passwordLabel}
					style={
						lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
					}
					focusBorderColor="#a28445"
					border={'1px solid transparent'}
					borderRadius={'2px'}
				/>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{passwordError === 'required' ? password.required : password.invalid}
				</FormErrorMessage>
			</FormControl>

			<SubmitButton>{dictionary.buttons.send}</SubmitButton>
		</Box>
	);
};

export default RegisterForm;
