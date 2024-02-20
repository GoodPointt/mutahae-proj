'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';

import SubmitButton from '@/app/ui/submitButton/SubmitButton';

import {
	Box,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Text,
	useToast,
	VStack,
} from '@chakra-ui/react';

import { submitData } from '@/app/lib/actions';
import { sendTgNotification } from '@/app/lib/api/notifyInstance';
import sendEmail from '@/app/lib/utils/sendEmail';

import EmailIcon from '../../svg/EmailIcon';
import PersonIcon from '../../svg/PersonIcon';
import PhoneIcon from '../../svg/PhoneIcon';

const ModalForm = ({ setIsSuccess, dictionary, lang, title, uid }) => {
	const [state, dispatch] = useFormState(submitData, undefined);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		(async () => {
			if (state?.message === 'succsess') {
				try {
					setIsSubmitting(true);
					let res;
					try {
						res = await sendEmail({ ...state, title, uid });
					} catch (error) {
						console.error('email_not_send', error);
					}
					try {
						await sendTgNotification(state);
					} catch (error) {
						console.error('tg_notify_not_send', error);
					}
					if (res.status === 200) {
						toast({
							status: 'success',
							title: dictionary.formContact.toasts.form.success,
						});
						setIsSuccess(true);
					}
				} catch (error) {
					console.error('ModalForm', error);
				} finally {
					setIsSubmitting(false);
				}
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	const toast = useToast();

	const nameError =
		state?.errors?.name && state?.errors?.name.length > 0
			? state.errors.name[0]
			: null;

	const emailError =
		state?.errors?.email && state?.errors?.email.length > 0
			? state.errors.email[0]
			: null;

	const phoneError =
		state?.errors?.phone && state?.errors?.phone.length > 0
			? state.errors.phone[0]
			: null;

	return (
		<Box bgColor={'#cfd0d5'} borderRadius="lg">
			<Box as="form" action={dispatch} p={4} color="#0B0E3F">
				<VStack spacing={5}>
					<FormControl id="name">
						<FormLabel>{dictionary.formContact.nameLabel}</FormLabel>
						<InputGroup borderColor="#E0E1E7">
							{lang === 'he' ? (
								<InputRightElement pointerEvents="none" fill={'gray.800'}>
									<PersonIcon />
								</InputRightElement>
							) : (
								<InputLeftElement pointerEvents="none" fill={'gray.800'}>
									<PersonIcon />
								</InputLeftElement>
							)}
							<Input
								focusBorderColor="#a28445"
								style={
									lang === 'he'
										? { direction: 'ltr', textAlign: 'right' }
										: null
								}
								type="text"
								size="md"
								bgColor={'white'}
								name="name"
								px={10}
								isInvalid={nameError}
								errorBorderColor="crimson"
							/>

							{nameError && (
								<FormHelperText
									fontSize={'13px'}
									display={'block'}
									color={'crimson'}
									pos={'absolute'}
									bottom={'-20px'}
								>
									{nameError === 'required'
										? dictionary.formContact.errors.name.required
										: dictionary.formContact.errors.name.invalid}
								</FormHelperText>
							)}
						</InputGroup>
					</FormControl>
					<FormControl id="name">
						<FormLabel>{dictionary.formContact.mailLabel}</FormLabel>
						<InputGroup borderColor="#E0E1E7">
							{lang === 'he' ? (
								<InputRightElement pointerEvents="none" fill="gray.800">
									<EmailIcon />
								</InputRightElement>
							) : (
								<InputLeftElement pointerEvents="none" fill="gray.800">
									<EmailIcon />
								</InputLeftElement>
							)}
							<Input
								focusBorderColor="#a28445"
								type="email"
								size="md"
								bgColor={'white'}
								name="email"
								px={10}
								isInvalid={emailError}
								errorBorderColor="crimson"
								style={
									lang === 'he'
										? { direction: 'ltr', textAlign: 'right' }
										: null
								}
							/>
							{emailError && (
								<FormHelperText
									fontSize={'13px'}
									display={'block'}
									color={'crimson'}
									pos={'absolute'}
									bottom={'-20px'}
								>
									{emailError === 'required'
										? dictionary.formContact.errors.email.required
										: dictionary.formContact.errors.email.invalid}
								</FormHelperText>
							)}
						</InputGroup>
					</FormControl>
					<FormControl id="name">
						<FormLabel>
							<Text as={'span'} color={'crimson'}>
								*
							</Text>
							{dictionary.formContact.phoneLabel}
						</FormLabel>
						<InputGroup borderColor="#E0E1E7">
							{lang === 'he' ? (
								<InputRightElement pointerEvents="none" fill="gray.800">
									<PhoneIcon />
								</InputRightElement>
							) : (
								<InputLeftElement pointerEvents="none" fill="gray.800">
									<PhoneIcon />
								</InputLeftElement>
							)}
							<Input
								focusBorderColor="#a28445"
								type="tel"
								name="phone"
								border={'1px solid transparent'}
								bgColor={'white'}
								size="md"
								px={10}
								isInvalid={phoneError}
								errorBorderColor="crimson"
								style={
									lang === 'he'
										? { direction: 'ltr', textAlign: 'right' }
										: null
								}
							/>
							{phoneError && (
								<FormHelperText
									fontSize={'13px'}
									display={'block'}
									color={'crimson'}
									pos={'absolute'}
									bottom={'-20px'}
								>
									{phoneError === 'required'
										? dictionary.formContact.errors.phone.required
										: dictionary.formContact.errors.phone.invalid}
								</FormHelperText>
							)}
						</InputGroup>
					</FormControl>
					<SubmitButton isSubmitting={isSubmitting}>
						{dictionary.buttons.send}
					</SubmitButton>
				</VStack>
			</Box>
		</Box>
	);
};

export default ModalForm;
