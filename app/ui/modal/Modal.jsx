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

const Modal = ({ isOpen, onClose, children, lang }) => {
	return (
		<ChakraModal
			isOpen={isOpen}
			onClose={onClose}
			size={'2xl'}
			scrollBehavior={'inside'}
		>
			<ModalOverlay />
			<ModalContent
				bg={'#000'}
				boxShadow="inset 0 0 5px rgba(255, 255, 255, 0.5)"
			>
				<ModalBody
					p={'30px'}
					overflowY={'auto'}
					pos={'relative'}
					css={{
						'&::-webkit-scrollbar': {
							width: '4px',
							maxHeight: '100px',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: '#A28445',
							borderRadius: '2px',
							maxHeight: '10px',
						},
						'&::-webkit-scrollbar-track': {
							backgroundColor: '#A28445',
							borderRadius: '2px',
						},
					}}
				>
					<Box>
						<Button
							variant={'unstyled'}
							display={'flex'}
							pos={'absolute'}
							top={'5px'}
							zIndex={100}
							onClick={onClose}
							style={lang === 'he' ? { left: '5px' } : { right: '5px' }}
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
