'use client';

import { useSwipeable } from 'react-swipeable';

import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerContent,
	Flex,
} from '@chakra-ui/react';

import LocaleSwitcher from '../../localeSwitcher/LocaleSwitcher';
import { Logout } from '../../logout/Logout';
import NavBar from '../../navbar/NavBar';
import CloseIcon from '../../svg/CloseIcon';

import ProfileMenu from './profileMenu/ProfileMenu';

const MobileMenu = ({ isOpen, onClose, dictionary, hasToken, lang }) => {
	const swipeHandlers = useSwipeable({ onSwipedUp: onClose });

	return (
		<>
			<Drawer isOpen={isOpen} placement="top" onClose={onClose}>
				<DrawerContent
					bg={'#181617'}
					h={'100dvh'}
					p={'16px'}
					{...swipeHandlers}
				>
					<Button
						variant={'ghost'}
						ml={lang === 'en' && 'auto'}
						mr={lang === 'he' && 'auto'}
						_hover={{ bg: 'none' }}
						color={'white'}
						onClick={onClose}
					>
						<CloseIcon />
					</Button>
					<DrawerBody
						position={'relative'}
						display={'flex'}
						flexDirection={'column'}
						justifyContent={'space-between'}
					>
						<NavBar
							flexDir="column"
							lang={lang}
							dictionary={dictionary}
							onClose={onClose}
							visibleIcon={true}
						/>
						<ProfileMenu
							hasToken={hasToken}
							lang={lang}
							onClose={onClose}
							dictionary={dictionary}
						/>
						<Flex alignItems={'center'} justifyContent={'space-between'}>
							{hasToken && (
								<Box onClick={onClose}>
									<Logout
										lang={lang}
										logoutDictionary={dictionary.profile.sidebar.logout}
									/>
								</Box>
							)}
							<LocaleSwitcher />
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MobileMenu;
