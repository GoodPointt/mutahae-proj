'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import {
	Box,
	FormControl,
	FormErrorMessage,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	useToast,
	VisuallyHiddenInput,
} from '@chakra-ui/react';

import { resetPasswordAction } from '@/app/lib/authActions';

import SubmitButton from '../submitButton/SubmitButton';
import CloseEye from '../svg/CloseEye';
import OpenEye from '../svg/OpenEye';

const ResetPasswordForm = ({ dictionary, lang, code }) => {
	const [isShown1, setIsShown1] = useState(false);
	const [isShown2, setIsShown2] = useState(false);
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, toast]);

	const { password } = dictionary.formContact.errors;

	return (
		<Box as="form" action={dispatch} ref={ref} width={'100%'} autoComplete="on">
			<FormControl
				isInvalid={password1Error || state?.message === 'not_equal'}
				pb="25px"
			>
				<InputGroup>
					{lang === 'en' ? (
						<InputRightElement
							as={'button'}
							type="button"
							onClick={() => setIsShown1(!isShown1)}
							fill={'#a28445'}
							stroke={'#5a4e35'}
							transition={'all 0.3s'}
							width={'30px'}
							mr={'10px'}
							h={'100%'}
							_hover={{
								stroke: '#635a46',
							}}
						>
							{!isShown1 ? <OpenEye /> : <CloseEye />}
						</InputRightElement>
					) : (
						<InputLeftElement
							as={'button'}
							type="button"
							onClick={() => setIsShown1(!isShown1)}
							fill={'#a28445'}
							stroke={'#5a4e35'}
							transition={'all 0.3s'}
							width={'30px'}
							ml={'10px'}
							h={'100%'}
							_hover={{
								stroke: '#635a46',
							}}
						>
							{!isShown1 ? <OpenEye /> : <CloseEye />}
						</InputLeftElement>
					)}
					<Input
						autoComplete="on"
						name="password1"
						type={isShown1 ? 'text' : 'password'}
						bgColor="#3b3d46"
						placeholder={dictionary.formContact.password1Label}
						style={
							lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
						}
						focusBorderColor="#a28445"
						border={'1px solid transparent'}
						borderRadius={'2px'}
					/>
				</InputGroup>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{password1Error === 'invalid' && password.invalid}
					{state?.message === 'not_equal' && password.not_equal}
				</FormErrorMessage>
			</FormControl>
			<FormControl
				isInvalid={password2Error || state?.message === 'not_equal'}
				pb="25px"
			>
				<InputGroup>
					{lang === 'en' ? (
						<InputRightElement
							as={'button'}
							type="button"
							onClick={() => setIsShown2(!isShown2)}
							fill={'#a28445'}
							stroke={'#5a4e35'}
							transition={'all 0.3s'}
							width={'30px'}
							mr={'10px'}
							h={'100%'}
							_hover={{
								stroke: '#635a46',
							}}
						>
							{!isShown2 ? <OpenEye /> : <CloseEye />}
						</InputRightElement>
					) : (
						<InputLeftElement
							as={'button'}
							type="button"
							onClick={() => setIsShown2(!isShown2)}
							fill={'#a28445'}
							stroke={'#5a4e35'}
							transition={'all 0.3s'}
							width={'30px'}
							ml={'10px'}
							h={'100%'}
							_hover={{
								stroke: '#635a46',
							}}
						>
							{!isShown2 ? <OpenEye /> : <CloseEye />}
						</InputLeftElement>
					)}
					<Input
						autoComplete="on"
						name="password2"
						type={isShown2 ? 'text' : 'password'}
						bgColor="#3b3d46"
						placeholder={dictionary.formContact.password2Label}
						style={
							lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
						}
						focusBorderColor="#a28445"
						border={'1px solid transparent'}
						borderRadius={'2px'}
					/>
				</InputGroup>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{password2Error === 'invalid' && password.invalid}
					{state?.message === 'not_equal' && password.not_equal}
				</FormErrorMessage>
			</FormControl>
			<VisuallyHiddenInput name="code" type="text" defaultValue={code} />
			<SubmitButton>{dictionary.buttons.send}</SubmitButton>
		</Box>
	);
};

export default ResetPasswordForm;
