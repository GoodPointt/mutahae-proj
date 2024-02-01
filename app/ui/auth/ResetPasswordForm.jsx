'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import {
	Box,
	FormControl,
	FormErrorMessage,
	Input,
	useToast,
	VisuallyHiddenInput,
} from '@chakra-ui/react';

import { resetPasswordAction } from '@/app/lib/authActions';

import SubmitButton from '../submitButton/SubmitButton';

const ResetPasswordForm = ({ dictionary, lang, code }) => {
	const [state, dispatch] = useFormState(resetPasswordAction, undefined);
	const toast = useToast();
	const router = useRouter();

	const ref = useRef(null);

	const password1Error =
		state?.errors?.password1 && state?.errors?.password1.length > 0
			? state.errors.password1[0]
			: null;
	const password2Error =
		state?.errors?.password2 && state?.errors?.password2.length > 0
			? state.errors.password2[0]
			: null;

	useEffect(() => {
		(() => {
			if (state?.message === 'Server error please try again later.') {
				toast({
					status: 'warning',
					title: dictionary.formContact.toasts.form.serverError,
				});
			}
			if (state?.message === 'success') {
				ref.current?.reset();
				router.push(`/${lang}/auth/login`);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, toast]);

	const { password } = dictionary.formContact.errors;

	return (
		<Box as="form" action={dispatch} ref={ref} width={'100%'} autoComplete="on">
			<FormControl isInvalid={password1Error} pb="25px">
				<Input
					autoComplete="on"
					name="password1"
					type="password"
					bgColor="#3b3d46"
					placeholder={dictionary.formContact.password1Label}
					style={
						lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
					}
					focusBorderColor="#a28445"
					border={'1px solid transparent'}
					borderRadius={'2px'}
				/>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{password1Error === 'invalid' ? password.invalid : password.required}
					{state?.message === 'not_equal' && password.not_equal}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={password2Error} pb="25px">
				<Input
					autoComplete="on"
					name="password2"
					type="password"
					bgColor="#3b3d46"
					placeholder={dictionary.formContact.password2Label}
					style={
						lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
					}
					focusBorderColor="#a28445"
					border={'1px solid transparent'}
					borderRadius={'2px'}
				/>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{password2Error === 'invalid' ? password.invalid : password.required}
					{state?.message === 'not_equal' && password.not_equal}
				</FormErrorMessage>
			</FormControl>
			<VisuallyHiddenInput name="code" type="text" defaultValue={code} />
			<SubmitButton>{dictionary.buttons.send}</SubmitButton>
		</Box>
	);
};

export default ResetPasswordForm;
