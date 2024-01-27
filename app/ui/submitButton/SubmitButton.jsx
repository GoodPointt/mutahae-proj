import { useFormStatus } from 'react-dom';

import { Button } from '@chakra-ui/react';

const SubmitButton = ({
	w = '100%',
	children,
	variant = 'solid',
	bgColor = '#a28445',
	px = '18px',
	hover = '#81672e',
	isSubmitting = false,
	dis = false,
}) => {
	const { pending } = useFormStatus();

	return (
		<Button
			variant={variant}
			bgColor={bgColor}
			borderRadius={'2px'}
			w={w}
			px={px}
			color={'white'}
			transition={'all 0.3s'}
			_hover={{ bgColor: hover }}
			type="submit"
			isLoading={pending || isSubmitting}
			isDisabled={pending || isSubmitting || dis}
		>
			{children}
		</Button>
	);
};
export default SubmitButton;
