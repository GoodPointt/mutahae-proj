'use client';
import React, { useEffect } from 'react';
import { useFormState } from 'react-dom';

import {
	Box,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	useToast,
} from '@chakra-ui/react';

import { changePasswordAction } from '../../../lib/actions';

import SubmitButton from '../../submitButton/SubmitButton';

export const RessetPasswordForm = ({ lang, ressetPassDictionary }) => {
	const [state, dispatch] = useFormState(changePasswordAction, null);
	const {
		title,
		currentPassword,
		newPassword,
		confirmPassword,
		btn,
		success,
		error,
	} = ressetPassDictionary;

	const toast = useToast();

	useEffect(() => {
		if (state && state.status === 'success')
			toast({
				status: 'success',
				title: success,
			});
		else if (state && state.status === 'error') {
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
			<Heading as="h4" fontSize="20px" fontWeight="600" mb="30px">
				{title}
			</Heading>
			<Box as="form" action={dispatch}>
				<Box flexDirection="column" w="calc((100% - 15px) /2 )">
					<FormControl isInvalid={passwordError} pb="25px">
						<Input
							name="currentPassword"
							type="password"
							bgColor="#3b3d46"
							placeholder={currentPassword}
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
							{passwordError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={newPasswordError} pb="25px">
						<Input
							name="newPassword"
							type="password"
							bgColor="#3b3d46"
							placeholder={newPassword}
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
							{newPasswordError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage>
					</FormControl>
					<FormControl isInvalid={confirmPasswordError} pb="25px">
						<Input
							name="confirmPassword"
							type="password"
							bgColor="#3b3d46"
							placeholder={confirmPassword}
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
							{confirmPasswordError === 'required'
								? 'required'
								: confirmPasswordError}
						</FormErrorMessage>
					</FormControl>
				</Box>
				<SubmitButton w="calc((100% - 15px) /2 )">{btn}</SubmitButton>
			</Box>
		</Box>
	);
};
