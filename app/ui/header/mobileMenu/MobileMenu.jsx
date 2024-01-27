'use client';

import { useSwipeable } from 'react-swipeable';

import { Button, Drawer, DrawerBody, DrawerContent } from '@chakra-ui/react';

import CloseIcon from '../../svg/CloseIcon';

const MobileMenu = ({ children, isOpen, onClose }) => {
	const swipeHandlers = useSwipeable({ onSwipedUp: onClose });

	return (
		<>
			<Drawer isOpen={isOpen} placement="top" onClose={onClose}>
				<DrawerContent
					bg={'#181617'}
					h={'100dvh'}
					p={'20px'}
					{...swipeHandlers}
				>
					<Button
						variant={'ghost'}
						ml={'auto'}
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
						{children}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MobileMenu;
