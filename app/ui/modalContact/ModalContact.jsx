'use client';

import { Wrap, WrapItem } from '@chakra-ui/react';

import useLang from '@/app/lib/hooks/useLang';
import ModalForm from './modalForm/ModalForm';
import ModalContacts from './modalContacts/ModalContcats';

const ModalContact = ({ dictionary, contacts, onClose }) => {
  const lang = useLang();

  return (
    <Wrap
      flexDirection={'row-reverse'}
      flexWrap={'wrap'}
      justify={'space-between'}
      fontSize={{ base: 'sm', lg: 'md' }}
      align={'center'}
    >
      <WrapItem>
        <ModalContacts
          contacts={contacts}
          dictionary={dictionary}
          lang={lang}
        />
      </WrapItem>
      <WrapItem w={{ base: '100%', md: '380px' }}>
        <ModalForm onClose={onClose} dictionary={dictionary} lang={lang} />
      </WrapItem>
    </Wrap>
  );
};

export default ModalContact;
