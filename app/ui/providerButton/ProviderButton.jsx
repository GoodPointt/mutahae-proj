import React from 'react';
import Link from 'next/link';

import { Button, Center, Text } from '@chakra-ui/react';

import FbIcon from '../svg/FbIcon';
import GoogleIcon from '../svg/GoogleIcon';
import TelegramIcon from '../svg/TelegramIcon';

const ProviderButton = ({ style, variant }) => {
	const backendUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
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
				as={Link}
				href={`${backendUrl}/api/connect/${variant}`}
				target="_blank"
				rel="noopener noreferrer"
				borderRadius={'2px'}
				w={'full'}
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
