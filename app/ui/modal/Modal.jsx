'use client';

import React from 'react';

import {
	Modal as ChakraModal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';

const Modal = ({ isOpen, onClose, children }) => {
	return (
		<ChakraModal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent bg={'#000'} border={'1px #fff solid'} maxW={'max-content'}>
				<ModalHeader p={0}>
					<ModalCloseButton pos={'absolute'} top={0} right={0} />
				</ModalHeader>
				<ModalBody p={'30px'} overflowY={'auto'}>
					{children}
				</ModalBody>
			</ModalContent>
		</ChakraModal>
	);
};

export default Modal;
