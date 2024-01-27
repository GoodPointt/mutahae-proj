import React from 'react';

import { Button, Center, Text } from '@chakra-ui/react';

import FbIcon from '../svg/FbIcon';
import GoogleIcon from '../svg/GoogleIcon';
import TelegramIcon from '../svg/TelegramIcon';

const ProviderButton = ({ style, variant }) => {
	let icon;

	switch (variant) {
		case 'google':
			icon = <GoogleIcon />;
			break;
		case 'facebook':
			icon = <FbIcon />;
			break;
		case 'telegram':
			icon = <TelegramIcon />;
			break;
		default:
			break;
	}

	return (
		<Center style={style}>
			<Button
				borderRadius={'2px'}
				w={'full'}
				// maxW={'md'}
				variant={'outline'}
				border={'1px solid #3B3D46'}
				bgColor={'transparent'}
				fontSize={'14px'}
				fontWeight={500}
				lineHeight={1.5}
				color={'inherit'}
				_hover={{ bgColor: 'transparent', color: 'lightgray' }}
				leftIcon={icon}
			>
				<Center>
					<Text>
						Sign in with
						<Text as={'span'} textTransform={'capitalize'}>
							{' ' + variant.charAt(0).toUpperCase() + variant.slice(1)}
						</Text>
					</Text>
				</Center>
			</Button>
		</Center>
	);
};

export default ProviderButton;
