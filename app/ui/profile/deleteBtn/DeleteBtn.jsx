'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';

import { Box, Button, useToast, VisuallyHiddenInput } from '@chakra-ui/react';

import { delAddressAction } from '../../../lib/actions';

export const DeleteBtn = ({ id, dictionary }) => {
	const [state, dispatch] = useFormState(delAddressAction, null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { pending } = useFormStatus();

	const toast = useToast();
	const router = useRouter();

	const { btn, success, error } = dictionary;

	useEffect(() => {
		if (state && state?.status === 'success') {
			setIsSubmitting(true);
			toast({
				status: 'success',
				title: success,
			});
			router.refresh();
		} else if (state && state?.status === 'error') {
			toast({
				status: 'error',
				title: error,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return (
		<Box as="form" action={dispatch}>
			<VisuallyHiddenInput
				name="addressId"
				className="hidden"
				defaultValue={id}
			/>

			<Button
				type="submit"
				bg="transparent"
				color="#fff"
				_hover={{ color: '#a98841' }}
				_active={{ backgroundColor: 'transparent' }}
				borderBottom="1px solid #fff"
				borderRadius="initial"
				paddingX={0}
				fontSize="14px"
				fontWeight="500"
				isLoading={pending}
				isDisabled={isSubmitting}
			>
				{btn}
			</Button>
		</Box>
	);
};
