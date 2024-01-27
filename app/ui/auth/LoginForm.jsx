'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { Link } from '@chakra-ui/next-js';
import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	Input,
} from '@chakra-ui/react';

import { loginAction } from '../../lib/actions';

import ProviderButton from '../providerButton/ProviderButton';
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
		<SectionWrapper heading={dictionary.formContact.login}>
			<Flex
				flexDir={{ base: 'column', lg: 'row' }}
				gap={{ lg: '20px' }}
				justify={{ lg: 'space-between' }}
			>
				<Box
					as="form"
					action={dispatch}
					ref={ref}
					width={'100%'}
					autoComplete="on"
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
							placeholder={dictionary.formContact.passwordLabel}
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
					<Button
						variant={'unstyled'}
						fontSize={'14px'}
						fontWeight={500}
						lineHeight={1.5}
						_hover={{ bgColor: 'transparent', color: 'gray' }}
					>
						{dictionary.buttons.forgotPass}
					</Button>
					<SubmitButton>{dictionary.buttons.send}</SubmitButton>
					<Center mt={'20px'}>
						<Link
							href={`/${lang}/auth/register`}
							fontSize={'14px'}
							fontWeight={500}
							lineHeight={1.5}
							borderBottomColor={'rgba(255, 255, 255, 1)'}
							borderBottomWidth={'1px'}
							_hover={{ bgColor: 'transparent', color: 'gray' }}
						>
							Create account
						</Link>
					</Center>
				</Box>
				<Box bgColor={'#3B3D46'} w={'1px'}></Box>
				<Flex width={'100%'} flexDir={'column'} gap={'25px'}>
					<ProviderButton style={{ mb: '25px' }} variant={'google'} />
					<ProviderButton style={{ mb: '25px' }} variant={'facebook'} />
					<ProviderButton style={{ mb: '25px' }} variant={'telegram'} />
				</Flex>
			</Flex>
		</SectionWrapper>
	);
};

export default LoginForm;
