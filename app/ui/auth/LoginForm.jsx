'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { Link } from '@chakra-ui/next-js';
import {
	Box,
	FormControl,
	FormErrorMessage,
	Input,
	useToast,
	VisuallyHiddenInput,
} from '@chakra-ui/react';

import { loginAction } from '@/app/lib/authActions';
import useLocalStorage from '@/app/lib/hooks/useLocalStorage';

import SubmitButton from '../submitButton/SubmitButton';

const LoginForm = ({ dictionary, lang }) => {
	const [state, dispatch] = useFormState(loginAction, undefined);
	const toast = useToast();
	const [localGoods, setLocalGoods] = useLocalStorage('localBag', []);

	const ref = useRef(null);

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
			if (state?.message === 'Invalid identifier or password') {
				toast({
					status: 'warning',
					title: dictionary.formContact.toasts.form.loginWarning,
				});
			}
			if (state?.message === 'Server error please try again later.') {
				toast({
					status: 'warning',
					title: dictionary.formContact.toasts.form.serverError,
				});
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, toast]);

	const { email, password } = dictionary.formContact.errors;

	return (
		<Box as="form" action={dispatch} ref={ref} width={'100%'} autoComplete="on">
			<FormControl isInvalid={emailError} pb="25px">
				<VisuallyHiddenInput
					name="localGoods"
					value={JSON.stringify(localGoods)}
					onChange={() => setLocalGoods()}
				/>
				<VisuallyHiddenInput name="lang" defaultValue={lang} />
				<Input
					autoComplete="on"
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
					autoComplete="on"
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
			<Link
				href={`/${lang}/auth/recovery`}
				fontSize={'14px'}
				fontWeight={500}
				lineHeight={1.5}
				_hover={{ bgColor: 'transparent', color: 'lightgray' }}
			>
				{dictionary.buttons.forgotPass}
			</Link>
			<SubmitButton>{dictionary.buttons.send}</SubmitButton>
		</Box>
	);
};

export default LoginForm;
