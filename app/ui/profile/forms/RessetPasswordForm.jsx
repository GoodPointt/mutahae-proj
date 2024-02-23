'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	useToast,
} from '@chakra-ui/react';

import { changePasswordAction } from '../../../lib/actions';

import SubmitButton from '../../submitButton/SubmitButton';
import CloseEye from '../../svg/CloseEye';
import OpenEye from '../../svg/OpenEye';

export const RessetPasswordForm = ({ lang, ressetPassDictionary }) => {
	const [state, dispatch] = useFormState(changePasswordAction, null);
	const [showPassword, setShowPassword] = useState(false);

	const {
		title,
		currentPassword,
		newPassword,
		confirmPassword,
		btn,
		success,
		error,
		validation,
	} = ressetPassDictionary;

	const formRef = useRef();

	const toast = useToast();

	useEffect(() => {
		if (state && state?.status === 'success') {
			formRef.current?.reset();
			toast({
				status: 'success',
				title: success,
			});
		} else if (state && state?.status === 'error') {
			toast({
				status: 'error',
				title: error,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const passwordError =
		state?.errors?.currentPassword && state?.errors?.currentPassword.length > 0
			? state.errors.currentPassword[0]
			: null;

	const newPasswordError =
		state?.errors?.newPassword && state?.errors?.newPassword.length > 0
			? state.errors.newPassword[0]
			: null;
	const confirmPasswordError =
		state?.errors?.confirmPassword && state?.errors?.confirmPassword.length > 0
			? state.errors.confirmPassword[0]
			: null;

	return (
		<Box pt="40px" mt="35px" borderTop="1px solid #3B3D46">
			<Flex gap={'40px'} width={'100%'} alignItems={'flex-start'}>
				<Heading as="h4" fontSize="20px" fontWeight="600" mb="30px">
					{title}
				</Heading>
				<Button
					variant={'unstyled'}
					type="button"
					width={'20px'}
					h={'20px'}
					onClick={() => {
						setShowPassword(!showPassword);
					}}
					fill={'#a28445'}
					stroke={'#a28445'}
					transition={'all 0.3s'}
					_hover={{
						stroke: '#a98841',
					}}
				>
					{showPassword ? <OpenEye /> : <CloseEye />}
				</Button>
			</Flex>

			<Box as="form" action={dispatch} ref={formRef} flex={1}>
				<Box flexDirection="column" w="calc((100% - 15px) /2 )">
					<FormControl isInvalid={passwordError} pb="25px">
						<Input
							name="currentPassword"
							type={showPassword ? 'text' : 'password'}
							bgColor="#3b3d46"
							placeholder={currentPassword}
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
							{passwordError === 'required'
								? validation.password.required
								: validation.password.invalid}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={newPasswordError} pb="25px">
						<Input
							name="newPassword"
							type={showPassword ? 'text' : 'password'}
							bgColor="#3b3d46"
							placeholder={newPassword}
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
							{newPasswordError === 'required'
								? validation.password.required
								: validation.password.invalid}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={confirmPasswordError} pb="25px">
						<Input
							name="confirmPassword"
							type={showPassword ? 'text' : 'password'}
							bgColor="#3b3d46"
							placeholder={confirmPassword}
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
							{confirmPasswordError === 'required'
								? validation.password.required
								: validation.password.not_equal}
						</FormErrorMessage>
					</FormControl>
				</Box>
				<SubmitButton w="calc((100% - 15px) /2 )">{btn}</SubmitButton>
			</Box>
		</Box>
	);
};
