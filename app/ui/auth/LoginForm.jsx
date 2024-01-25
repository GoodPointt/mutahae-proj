'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { Box, FormControl, Input } from '@chakra-ui/react';

import { loginAction } from '../../lib/actions';

import SectionWrapper from '../sectionWrapper/SectionWrapper';
import SubmitButton from '../submitButton/SubmitButton';

const LoginForm = ({ dictionary, lang }) => {
	const [state, dispatch] = useFormState(loginAction, undefined);

	const ref = useRef(null);

	// const nameError =
	// 	state?.errors?.name && state?.errors?.name.length > 0
	// 		? state.errors.name[0]
	// 		: null;

	// const emailError =
	// 	state?.errors?.email && state?.errors?.email.length > 0
	// 		? state.errors.email[0]
	// 		: null;

	// const passwordError =
	// 	state?.errors?.password && state?.errors?.password.length > 0
	// 		? state.errors.password[0]
	// 		: null;

	// const nameError = false;
	const passwordError = false;
	const emailError = false;

	useEffect(() => {
		(() => {
			if (state?.message === 'succsess') {
				// sendEmail(state);
				ref.current?.reset();
			}
		})();
	}, [state]);

	// const { email, password } = dictionary.formContact.errors;

	return (
		<SectionWrapper>
			<Box
				as="form"
				action={dispatch}
				autoComplete="off"
				ref={ref}
				width={{ base: '320px' }}
				maxWidth={'820px'}
			>
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
					{/* <FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
						{emailError === 'required' ? email.required : email.invalid}
					</FormErrorMessage> */}
				</FormControl>
				<FormControl isInvalid={passwordError} pb="25px">
					<Input
						name="password"
						type="password"
						bgColor="#3b3d46"
						// placeholder={dictionary.formContact.password}
						style={
							lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
						}
						focusBorderColor="#a28445"
						border={'1px solid transparent'}
						borderRadius={'2px'}
					/>
					{/* <FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
						{passwordError === 'required'
							? password.required
							: password.invalid}
					</FormErrorMessage> */}
				</FormControl>
				<SubmitButton>{dictionary.buttons.send}</SubmitButton>
			</Box>
		</SectionWrapper>
	);
};

export default LoginForm;
