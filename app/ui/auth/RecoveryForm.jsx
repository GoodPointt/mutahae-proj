'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import {
	Box,
	FormControl,
	FormErrorMessage,
	Input,
	useToast,
} from '@chakra-ui/react';

import { recoveryAction } from '@/app/lib/authActions';

const RecoveryForm = ({ dictionary, lang }) => {
	const [state, dispatch] = useFormState(recoveryAction, undefined);
	const toast = useToast();

	const ref = useRef(null);

	useEffect(() => {
		(() => {
			// console.log(state);
			if (state?.message === 'Invalid identifier or password') {
				toast({
					status: 'warning',
					title: dictionary.formContact.toasts.form.loginWarning,
				});
			}
			if (state?.message === 'succsess') {
				// sendEmail(state);
				ref.current?.reset();
			}
		})();
	}, [dictionary.formContact.toasts.form.loginWarning, state, toast]);

	const { email } = dictionary.formContact.errors;

	const emailError =
		state?.errors?.email && state?.errors?.email.length > 0
			? state.errors.email[0]
			: null;

	return (
		<Box as="form" action={dispatch} ref={ref} width={'100%'} autoComplete="on">
			<FormControl isInvalid={emailError} pb="25px">
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
		</Box>
	);
};

export default RecoveryForm;
