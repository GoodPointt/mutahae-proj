'use client';

import { useRef } from 'react';
import { FaAsterisk } from 'react-icons/fa';
import ReactInputMask from 'react-input-mask';

import {
	Box,
	FormControl,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
} from '@chakra-ui/react';

const ContactInfo = ({ dictionary, lang }) => {
	// const [state, dispatch] = useFormState('', undefined);

	const maskedInputRef = useRef(null);

	// const firstNameError =
	// 	state?.errors?.firstName && state?.errors?.firstName.length > 0
	// 		? state.errors.firstName[0]
	// 		: null;

	// const lastNameError =
	// 	state?.errors?.lastName && state?.errors?.lastName.length > 0
	// 		? state.errors.lastName[0]
	// 		: null;

	// const emailError =
	// 	state?.errors?.email && state?.errors?.email.length > 0
	// 		? state.errors.email[0]
	// 		: null;

	// const phoneError =
	// 	state?.errors?.phone && state?.errors?.phone.length > 0
	// 		? state.errors.phone[0]
	// 		: null;

	return (
		<Box
			as="form"
			autoComplete="off"
			display={'flex'}
			flexDir={'column'}
			rowGap={{ base: '15px', sm: '25px' }}
			mb={'20px'}
		>
			<Box
				display={'flex'}
				flexDir={{ base: 'column', sm: 'row' }}
				gap={'15px'}
			>
				<FormControl>
					<Input
						name="firstName"
						type="text"
						bgColor="#3b3d46"
						borderRadius={'2px'}
						placeholder={dictionary.order.firstName}
						style={
							lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
						}
						focusBorderColor="#a28445"
						border={'1px solid transparent'}
					/>
					{/* <FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{firstNameError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage> */}
				</FormControl>

				<FormControl>
					<Input
						name="lastName"
						type="text"
						bgColor="#3b3d46"
						borderRadius={'2px'}
						placeholder={dictionary.order.lastName}
						style={
							lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
						}
						focusBorderColor="#a28445"
						border={'1px solid transparent'}
					/>
					{/* <FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{lastNameError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage> */}
				</FormControl>
			</Box>

			<Box
				display={'flex'}
				flexDir={{ base: 'column', sm: 'row' }}
				gap={'15px'}
			>
				<FormControl>
					<Input
						name="email"
						type="email"
						bgColor="#3b3d46"
						borderRadius={'2px'}
						placeholder={dictionary.order.mail}
						style={
							lang === 'he' ? { direction: 'ltr', textAlign: 'right' } : null
						}
						focusBorderColor="#a28445"
						border={'1px solid transparent'}
					/>
					{/* <FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{emailError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage> */}
				</FormControl>
				<FormControl>
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
							placeholder={dictionary.order.phone}
							mask={'+\\972-**-***-****'}
							errorBorderColor="crimson"
							textAlign={lang === 'he' ? 'right' : 'left'}
						/>
					</InputGroup>

					{/* <FormErrorMessage
							fontSize={'14px'}
							position="absolute"
							bottom="4px"
						>
							{phoneError === 'required' ? 'required' : 'invalid'}
						</FormErrorMessage> */}
				</FormControl>
			</Box>
		</Box>
	);
};

export default ContactInfo;
