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
			display={'flex'}
			justifyContent={'center'}
			color={'white'}
			transition={'all 0.3s'}
			_hover={{ bgColor: '#81672e' }}
			onClick={onClick}
			borderRadius={'2px'}
			width={{ base: '100%', sm: '250px' }}
		>
			{children}
		</Button>
	);
};
export default Btn;
