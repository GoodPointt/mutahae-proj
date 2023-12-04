'use client';

import { useSwipeable } from 'react-swipeable';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';

import { FaAnglesRight } from 'react-icons/fa6';
import './MobileMenu.css';

const MobileMenu = ({ children, isOpen, onClose }) => {
  const swipeHandlers = useSwipeable({ onSwipedRight: onClose });

  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={'#181617'} {...swipeHandlers}>
          <DrawerBody
            position={'relative'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'space-between'}
            py={'50px'}
            px={'32px'}
          >
            {children}
            <Button
              className={'buttonAnimation'}
              position={'absolute'}
              top={'50%'}
              left={'0'}
              zIndex={'99999'}
              bg={'#a28445'}
              transition={'all 0.3s'}
              _hover={{ bg: '#81672e' }}
              color={'white'}
              borderRadius={'full'}
              onClick={onClose}
              {...swipeHandlers}
            >
              <FaAnglesRight />
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;
