import { Button } from '@chakra-ui/react';

const Btn = ({
	children,
	variant = 'solid',
	bgColor = '#a28445',
	onClick,
	as = 'button',
	href = null,
}) => {
	return (
		<Button
			variant={variant}
			as={as}
			href={href}
			bgColor={bgColor}
			color={'white'}
			transition={'all 0.3s'}
			_hover={{ bgColor: '#81672e' }}
			type="button"
			onClick={onClick}
			borderRadius={'2px'}
			w={{ base: '100%', sm: '250px' }}
		>
			{children}
		</Button>
	);
};
export default Btn;
