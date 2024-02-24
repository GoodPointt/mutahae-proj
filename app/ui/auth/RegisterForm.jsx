'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

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

import { registerAction } from '@/app/lib/authActions';
import useLocalStorage from '@/app/lib/hooks/useLocalStorage';

import SubmitButton from '../submitButton/SubmitButton';
import CloseEye from '../svg/CloseEye';
import OpenEye from '../svg/OpenEye';

const RegisterForm = ({ dictionary, lang }) => {
	const [isShown, setIsShown] = useState(false);
	const [state, dispatch] = useFormState(registerAction, undefined);
	const toast = useToast();
	const [localGoods] = useLocalStorage('localBag', []);
	const [callbackPath] = useState(
		typeof window !== 'undefined'
			? JSON.parse(localStorage.getItem('callbackPath'))
			: `/${lang}/`
	);

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
			if (state?.message === 'Server error please try again later.') {
				toast({
					status: 'warning',
					title: dictionary.formContact.toasts.form.serverError,
				});
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state, toast]);

	const { email, password, name, lastName } = dictionary.formContact.errors;

	return (
		<Box as="form" action={dispatch} ref={ref} width={'100%'} autoComplete="on">
			<FormControl isInvalid={nameError} pb="25px">
				<VisuallyHiddenInput
					name="localGoods"
					defaultValue={JSON.stringify(
						localGoods.map(({ count, good: { data } }) => ({
							good: data,
							count,
						}))
					)}
				/>
				<VisuallyHiddenInput name="lang" defaultValue={lang} />
				<VisuallyHiddenInput name="callbackPath" defaultValue={callbackPath} />
				<Input
					autoComplete="on"
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
					{nameError === 'required' && name.required}
					{nameError === 'invalid' && name.invalid}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={lastNameError} pb="25px">
				<Input
					autoComplete="on"
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
					{lastNameError === 'required' && lastName.required}
					{lastNameError === 'invalid' && lastName.invalid}
				</FormErrorMessage>
			</FormControl>
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
			<FormControl isInvalid={passwordError} pb="25px">
				<InputGroup>
					{lang === 'en' ? (
						<InputRightElement
							as={'button'}
							type="button"
							onClick={() => setIsShown(!isShown)}
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
							{!isShown ? <OpenEye /> : <CloseEye />}
						</InputRightElement>
					) : (
						<InputLeftElement
							as={'button'}
							type="button"
							onClick={() => setIsShown(!isShown)}
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
							{!isShown ? <OpenEye /> : <CloseEye />}
						</InputLeftElement>
					)}
					<Input
						autoComplete="on"
						name="password"
						type={isShown ? 'text' : 'password'}
						bgColor="#3b3d46"
						placeholder={dictionary.formContact.passwordLabel}
						style={
							lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
						}
						focusBorderColor="#a28445"
						border={'1px solid transparent'}
						borderRadius={'2px'}
					/>
				</InputGroup>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{passwordError === 'required' ? password.required : password.invalid}
				</FormErrorMessage>
			</FormControl>

			<SubmitButton>{dictionary.buttons.send}</SubmitButton>
		</Box>
	);
};

export default RegisterForm;
