import Link from 'next/link';

import {
	Box,
	Button,
	Flex,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Portal,
	Text,
} from '@chakra-ui/react';

import ProviderButton from '../providerButton/ProviderButton';
import EmailIcon from '../svg/EmailIcon';
import Star from '../svg/Star';

const CallToAuth = () => {
	return (
		<Popover>
			<PopoverTrigger>
				<Button
					variant={'ghost'}
					position={'absolute'}
					top={'0px'}
					right={'0px'}
					zIndex={'10'}
					stroke="#A28445"
					fill={'transparent'}
					_hover={{
						stroke: '#dab462',
						fill: 'transparent',
						transform: 'scale(1.13)',
					}}
					_active={{
						stroke: '#dab462',
						fill: 'transparent',
						transform: 'scale(1.13)',
					}}
				>
					<Star />
				</Button>
			</PopoverTrigger>
			<Portal>
				<PopoverContent bgColor={'#272727'} border={'none'}>
					<PopoverArrow bgColor={'#272727'} boxShadow={'none'} />

					<PopoverCloseButton />
					<PopoverHeader fontWeight="semibold" border={'none'}>
						<Text mt={'20px'} textAlign={'center'}>
							Enter your account to add favorites
						</Text>
					</PopoverHeader>
					<PopoverBody mt={'15px'}>
						<Flex
							flexDir={'column'}
							align={'center'}
							fontSize={'14px'}
							fontWeight={500}
							lineHeight={1.5}
						>
							<Box
								h={'34px'}
								_hover={{ bgColor: 'transparent', color: 'lightgray' }}
								transition={'all 200ms ease'}
								textDecoration="underline"
							>
								<Flex gap={3} align={'center'}>
									<Box fill={'#ccc'}>
										<EmailIcon />
									</Box>
									<Link href={'/auth/login'}>Login with email</Link>
								</Flex>
							</Box>
							<Text>or</Text>
							<ProviderButton variant="google" minimalistic />
						</Flex>
					</PopoverBody>
				</PopoverContent>
			</Portal>
		</Popover>
	);
};

export default CallToAuth;
