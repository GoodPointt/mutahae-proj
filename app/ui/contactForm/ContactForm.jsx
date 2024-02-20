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
	useDisclosure,
	useToast,
} from '@chakra-ui/react';

import { sendTgNotification } from '@/app/lib/api/notifyInstance';
import { submitData } from '../../lib/actions';
import useLang from '../../lib/hooks/useLang';
import sendEmail from '../../lib/utils/sendEmail';

import ModalWindow from '../modalWindow/ModalWindow';
import SubmitButton from '../submitButton/SubmitButton';
import SuccessSubmitMsg from '../successSubmitMsg/SuccessSubmitMsg';
import AsteriskIcon from '../svg/AsteriskIcon';

const ContactForm = ({ dictionary }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [state, dispatch] = useFormState(submitData, undefined);
	const toast = useToast();

	const ref = useRef(null);

	const lang = useLang();

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

	useEffect(() => {
		(async () => {
			if (state?.message === 'succsess') {
				try {
					setIsSubmitting(true);
					try {
						await sendEmail(state);
					} catch (e) {
						console.error('email_not_send', e);
					}
					try {
						await sendTgNotification(state);
					} catch (error) {
						console.error('tg_notify_not_send', error);
					}

					ref.current?.reset();

					toast({
						status: 'success',
						title: dictionary.formContact.toasts.form.success,
					});
					onOpen();
				} catch (error) {
					console.error('ContactForm', error);
				} finally {
					setIsSubmitting(false);
				}
			}
		})();
	}, [state, toast, dictionary, onOpen]);

	const { name, email, phone } = dictionary.formContact.errors;

	return (
		<Box as="form" action={dispatch} autoComplete="off" ref={ref}>
			<FormControl isInvalid={nameError} pb="25px">
				<Input
					name="name"
					type="text"
					bgColor="#3b3d46"
					borderRadius={'2px'}
					placeholder={dictionary.formContact.nameLabel}
					style={
						lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
					}
					focusBorderColor="#a28445"
					border="1px solid transparent"
				/>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{nameError === 'required' ? name.required : name.invalid}
				</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={emailError} pb="25px">
				<Input
					name="email"
					type="email"
					bgColor="#3b3d46"
					borderRadius={'2px'}
					placeholder={dictionary.formContact.mailLabel}
					style={
						lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
					}
					focusBorderColor="#a28445"
					border="1px solid transparent"
				/>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{emailError === 'required' ? email.required : email.invalid}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={phoneError} pb="25px">
				<InputGroup>
					{lang === 'he' ? (
						<InputRightElement pointerEvents="none" right={'-10px'} top={'0'}>
							<AsteriskIcon />
						</InputRightElement>
					) : (
						<InputLeftElement pointerEvents="none" left={'-10px'} top={'0'}>
							<AsteriskIcon />
						</InputLeftElement>
					)}
					<Input
						pl={lang === 'en' ? 4 : null}
						pr={lang === 'he' ? 4 : null}
						name="phone"
						type="tel"
						focusBorderColor="#a28445"
						border="1px solid transparent"
						bgColor="#3b3d46"
						borderRadius={'2px'}
						placeholder={dictionary.formContact.phoneLabel}
						errorBorderColor="crimson"
						textAlign={lang === 'he' ? 'right' : 'left'}
					/>
				</InputGroup>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{phoneError === 'required' ? phone.required : phone.invalid}
				</FormErrorMessage>
			</FormControl>
			<SubmitButton isSubmitting={isSubmitting}>
				{dictionary.buttons.send}
			</SubmitButton>
			<ModalWindow onClose={onClose} isOpen={isOpen}>
				<SuccessSubmitMsg onClick={onClose} dictionary={dictionary} />
			</ModalWindow>
		</Box>
	);
};

export default ContactForm;
