'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { FaAsterisk } from 'react-icons/fa';
import ReactInputMask from 'react-input-mask';

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

const ContactForm = ({ dictionary }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [state, dispatch] = useFormState(submitData, undefined);
	const toast = useToast();

	const ref = useRef(null);
	const maskedInputRef = useRef(null);

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
				await sendTgNotification(state);
				await sendEmail(state);
				ref.current?.reset();
				maskedInputRef.current.value = '';

				toast({
					status: 'success',
					title: dictionary.formContact.toasts.form.success,
				});
				onOpen();
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
					border={'1px solid transparent'}
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
					border={'1px solid transparent'}
				/>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{emailError === 'required' ? email.required : email.invalid}
				</FormErrorMessage>
			</FormControl>
			<FormControl isInvalid={phoneError} pb="25px">
				<InputGroup>
					{lang === 'he' ? (
						<InputRightElement pointerEvents="none" right={-2.5}>
							<FaAsterisk size={6} color="crimson" />
						</InputRightElement>
					) : (
						<InputLeftElement pointerEvents="none" left={-2.5}>
							<FaAsterisk size={6} color="crimson" />
						</InputLeftElement>
					)}
					<Input
						ref={maskedInputRef}
						pl={lang === 'en' ? 4 : null}
						pr={lang === 'he' ? 4 : null}
						name="phone"
						as={ReactInputMask}
						type="tel"
						focusBorderColor="#a28445"
						border={'1px solid transparent'}
						bgColor="#3b3d46"
						borderRadius={'2px'}
						placeholder={dictionary.formContact.phoneLabel}
						mask={'+\\972-**-***-****'}
						errorBorderColor="crimson"
						textAlign={lang === 'he' ? 'right' : 'left'}
					/>
				</InputGroup>
				<FormErrorMessage fontSize={'14px'} position="absolute" bottom="4px">
					{phoneError === 'required' ? phone.required : phone.invalid}
				</FormErrorMessage>
			</FormControl>
			<SubmitButton>{dictionary.buttons.send}</SubmitButton>
			<ModalWindow onClose={onClose} isOpen={isOpen}>
				<SuccessSubmitMsg onClick={onClose} dictionary={dictionary} />
			</ModalWindow>
		</Box>
	);
};

export default ContactForm;
