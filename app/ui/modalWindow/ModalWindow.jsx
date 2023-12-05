'use client';

import useLang from '@/app/lib/hooks/useLang';
import {
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const ModalWindow = ({
  isCloseButton = true,
  p = 4,
  onClose,
  isOpen,
  children,
  maxW = { sm: '480px', md: '740px', lg: '860px' },
}) => {
  const lang = useLang();

  const gradientDirection = lang === 'he' ? 'right' : 'left';
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        p={p}
        bgImage={`linear-gradient(to ${gradientDirection}, #434343 0%, black 100%)`}
        bgSize={'cover'}
        bgPos={'center'}
        bgRepeat={'no-repeat'}
        maxW={maxW}
      >
        {isCloseButton && (
          <IconButton
            zIndex={99}
            pos={'absolute'}
            top={0}
            style={lang === 'he' ? { left: 0 } : { right: 0 }}
            p={0}
            onClick={onClose}
            variant="ghost"
            aria-label="close"
            color={'#ccc'}
            icon={<IoMdCloseCircleOutline size="28px" />}
            size="lg"
            isRound={true}
            _active={{ bgColor: 'transparent' }}
            _hover={{
              transform: 'scale(1.1)',
              color: '#a28445',
            }}
            transition="all 300ms ease"
          />
        )}
        <ModalBody p={0} overflowY={'auto'}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalWindow;
