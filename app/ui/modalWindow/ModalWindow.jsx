import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

const ModalWindow = ({ onClose, isOpen, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        bgColor={'gray.900'}
        bgSize={'cover'}
        bgPos={'center'}
        bgRepeat={'no-repeat'}
      >
        <ModalHeader>Submit</ModalHeader>
        <ModalCloseButton _hover={{ color: '#a28445' }} />
        <ModalBody pb={6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
