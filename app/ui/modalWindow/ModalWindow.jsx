'use client';

import useLang from '@/app/lib/hooks/useLang';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';

const ModalWindow = ({
  onClose,
  isOpen,
  children,
  maxW = { sm: '480px', md: '760px', lg: '840px' },
}) => {
  const lang = useLang();

  const gradientDirection = lang === 'he' ? 'right' : 'left';
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        pt={0}
        bgImage={`linear-gradient(to ${gradientDirection}, #434343 0%, black 100%)`}
        bgSize={'cover'}
        bgPos={'center'}
        bgRepeat={'no-repeat'}
        maxW={maxW}
      >
        <ModalCloseButton _hover={{ color: '#a28445' }} zIndex={99} />
        <ModalBody p={0}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
