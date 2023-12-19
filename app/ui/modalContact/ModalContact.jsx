'use client';

import { Wrap, WrapItem } from '@chakra-ui/react';

import useLang from '@/app/lib/hooks/useLang';
import ModalForm from './modalForm/ModalForm';
import ModalContacts from './modalContacts/ModalContcats';
import { useState } from 'react';
import SuccessSubmitMsg from '../successSubmitMsg/SuccessSubmitMsg';

const ModalContact = ({ dictionary, contacts, onClose, title, uid }) => {
  const lang = useLang();
  const [isSuccess, setIsSuccess] = useState(false);
  return isSuccess ? (
    <SuccessSubmitMsg onClick={onClose} dictionary={dictionary} />
  ) : (
    <Wrap
      flexDirection={'row-reverse'}
      flexWrap={'wrap'}
      justify={'space-between'}
      fontSize={{ base: 'small', lg: 'medium' }}
      align={'center'}
      pt={6}
    >
      <WrapItem>
        <ModalContacts
          contacts={contacts}
          dictionary={dictionary}
          lang={lang}
        />
      </WrapItem>
      <WrapItem w={{ base: '100%', md: '300px', lg: '380px' }}>
        <ModalForm
          dictionary={dictionary}
          lang={lang}
          title={title}
          uid={uid}
          setIsSuccess={setIsSuccess}
        />
      </WrapItem>
    </Wrap>
  );
};

export default ModalContact;
