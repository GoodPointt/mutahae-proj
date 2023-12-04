import React from 'react';
import SectionWrapper from '../../sectionWrapper/SectionWrapper';
import { Flex, Text } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../../navbar/NavBar';
import ContactsFooter from '../contactsFooter/ContactsFooter';
import BottomBar from '../bottomBar/BottomBar';

const FooterWrapper = ({ lang, dictionary, contacts }) => {
  return (
    <SectionWrapper as={'footer'} bg="black">
      <Flex
        alignItems={{ base: 'center', md: 'flex-start' }}
        justifyContent={'space-between'}
        flexDirection={{ base: 'column', md: 'row' }}
        gap={{ base: '46px' }}
        mb={{ base: '46px', lg: '0' }}
      >
        <Link href={'/' + lang}>
          <Image
            src={'/logo.png'}
            alt="logo"
            width="300"
            height="100"
            style={{
              objectFit: 'cover',
              width: 300,
              height: 100,
              display: 'block',
            }}
          />
        </Link>
        <ContactsFooter contacts={contacts} lang={lang} />
        <NavBar lang={lang} flexDir="column" dictionary={dictionary} />
      </Flex>
      <Text fontSize={'14px'} textAlign={{ base: 'center', md: 'unset' }}>
        <Text
          as={'span'}
          // dir={lang === 'he' ? 'ltr' : 'rtl'}
        >
          ©
        </Text>{' '}
        2023 Mutag Haetz LTD. All rights reserved
      </Text>
      <BottomBar />
    </SectionWrapper>
  );
};

export default FooterWrapper;
