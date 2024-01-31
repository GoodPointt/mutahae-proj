'use client';

import React from 'react';

import {
	Box,
	Button,
	Modal as ChakraModal,
	ModalBody,
	ModalContent,
	ModalOverlay,
} from '@chakra-ui/react';

import CloseIcon from '../svg/CloseIcon';

const Modal = ({ isOpen, onClose, children }) => {
	return (
		<ChakraModal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg={'#000'} maxW={'max-content'}>
				<ModalBody p={{ base: '10px', md: '30px' }} overflowY={'auto'}>
					<Box pos={'relative'}>
						<Button
							variant={'unstyled'}
							pos={'absolute'}
							top={2}
							right={0}
							onClick={onClose}
							_hover={{ stroke: 'rgba(100, 100, 100, 0.5)' }}
							transition={'all'}
						>
							<CloseIcon />
						</Button>
						{children}
					</Box>
				</ModalBody>
			</ModalContent>
		</ChakraModal>
	);
};

export default Modal;
