import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

const ModalWindow = ({ onClose, isOpen, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        pt={10}
        bgColor={'gray.800'}
        bgSize={'cover'}
        bgPos={'center'}
        bgRepeat={'no-repeat'}
        maxW={{ sm: '480px', md: '760px', lg: '840px' }}
      >
        <ModalCloseButton _hover={{ color: '#a28445' }} />
        <ModalBody pb={6}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
