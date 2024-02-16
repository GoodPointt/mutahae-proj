import { useFormStatus } from 'react-dom';

import { Button } from '@chakra-ui/react';

const SubmitButton = ({
	w = '100%',
	children,
	maxW = '100%',
	variant = 'solid',
	bgColor = '#a28445',
	px = '18px',
	hover = '#81672e',
	isSubmitting = false,
	dis = false,
	stroke,
	strokeHover,
	message,
	onClick,
}) => {
	const { pending } = useFormStatus();

	return (
		<>
			<Button
				pos={'relative'}
				onClick={onClick}
				variant={variant}
				bgColor={bgColor}
				borderRadius={'2px'}
				w={w}
				maxW={maxW}
				px={px}
				stroke={stroke}
				fontSize={pending ? '14px' : '16px'}
				transitionProperty={'none'}
				color={'white'}
				transition={'all 0.3s'}
				_hover={{ bgColor: hover, stroke: strokeHover }}
				type="submit"
				isLoading={pending || isSubmitting}
				loadingText={message}
				isDisabled={pending || isSubmitting || dis}
			>
				{children}
			</Button>
		</>
	);
};
export default SubmitButton;
