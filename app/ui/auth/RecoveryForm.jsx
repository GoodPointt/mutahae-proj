'use client';

import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

import {
	Box,
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	Input,
	Text,
	Toast,
} from '@chakra-ui/react';

import { recoveryAction } from '@/app/lib/authActions';

import SubmitButton from '../submitButton/SubmitButton';

const RecoveryForm = ({ dictionary, lang }) => {
	const [state, dispatch] = useFormState(recoveryAction, undefined);

	const router = useRouter();
	const ref = useRef(null);

	useEffect(() => {
		(() => {
			if (state?.message === 'Server error please try again later.') {
				Toast({
					status: 'warning',
					title: dictionary.formContact.toasts.form.serverError,
				});
			}
			if (state?.message === 'success') {
				ref.current?.reset();
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const { email } = dictionary.formContact.errors;

	const emailError =
		state?.errors?.email && state?.errors?.email.length > 0
			? state.errors.email[0]
			: null;

	return (
		<Box width={'100%'}>
			{state?.message === 'success' ? (
				<Text>Check your email to reset password</Text>
			) : (
				<Box
					as="form"
					action={dispatch}
					ref={ref}
					width={'100%'}
					autoComplete="on"
				>
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
						<FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{emailError === 'required' ? email.required : email.invalid}
						</FormErrorMessage>
						<Text
							fontSize={'14px'}
							fontWeight={500}
							lineHeight={1.5}
							mt={'10px'}
							mb={'20px'}
						>
							{dictionary.formContact.recoveryText}
						</Text>
						<SubmitButton>{dictionary.buttons.send}</SubmitButton>
					</FormControl>
				</Box>
			)}
			<Center mt={'20px'}>
				<Button
					onClick={() => router.back()}
					variant={'unstyled'}
					borderBottom={'1px solid rgba(255, 255, 255, 1)'}
					borderRadius={'0px'}
					fontSize={'14px'}
					fontWeight={500}
					lineHeight={1.5}
					height={'fit-content'}
					_hover={{
						bgColor: 'transparent',
						color: 'lightgray',
						borderBottomColor: 'lightgray',
					}}
					borderBottomColor={'rgba(255, 255, 255, 1)'}
					borderBottomWidth={'1px'}
				>
					{dictionary.buttons.cancel}
				</Button>
			</Center>
		</Box>
	);
};

export default RecoveryForm;
