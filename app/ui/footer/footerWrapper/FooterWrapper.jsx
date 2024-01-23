'use client';

import React from 'react';
import SectionWrapper from '../../sectionWrapper/SectionWrapper';
import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '../../navbar/NavBar';
import ContactsFooter from '../contactsFooter/ContactsFooter';
import BottomBar from '../bottomBar/BottomBar';

const FooterWrapper = ({ lang, dictionary, contacts, products }) => {
  const isRTL = lang === 'he';
  const { onClose } = useDisclosure();

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
        <ContactsFooter
          contacts={contacts}
          lang={lang}
          dictionary={dictionary}
        />
        <NavBar
          lang={lang}
          flexDir="column"
          dictionary={dictionary}
          onClose={onClose}
        />
      </Flex>

      <Text
        mb={{ base: '32px', lg: '28px' }}
        textAlign={{ base: 'center', md: 'unset' }}
      >
        {dictionary.footer.products}:
      </Text>
      <Flex
        as="ul"
        gap={'20px'}
        flexDir={{ base: 'column', lg: 'row' }}
        align={{ base: 'center', md: 'flex-start' }}
        mb={{ base: '52px', lg: '42px' }}
        fontSize={'15px'}
      >
        {products.map((el, idx) => (
          <Flex
            as="li"
            key={idx}
            wrap={'wrap'}
            align={'center'}
            gap={'5px'}
            transition={'all 0.3s'}
            _hover={{
              transform: 'translateX(5px)',
              cursor: 'pointer',
              color: '#a98841',
            }}
          >
            <Box
              borderRadius={'50%'}
              overflow={'hidden'}
              position="relative"
              height={'25px'}
              width={'25px'}
              transition="all 500ms cubic-bezier(0.4, 0, 0.2, 1)"
              bgRepeat={'no-repeat'}
              bgPos={'center'}
              bgSize={'cover'}
              _hover={{
                cursor: 'pointer',
                transition: 'all 500ms ease-in-out',
              }}
            >
              <Image
                src={el.attributes.imgUrl || '/product.png'}
                alt={el.attributes.title + '' + el.descShort || 'product image'}
                fill
                placeholder="blur"
                blurDataURL="/blur-product.jpg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Link href={`/${lang}/catalog/${el.attributes.uid}`}>
              {el.attributes.title}
            </Link>
          </Flex>
        ))}
      </Flex>
      {}
      <Text fontSize={'14px'} textAlign={{ base: 'center', md: 'unset' }}>
        {!isRTL && <Text as={'span'}>©</Text>}
        2023 Mutag Haetz LTD. All rights reserved
        {isRTL && <Text as={'span'}>©</Text>}
      </Text>
      <BottomBar />
    </SectionWrapper>
  );
};

export default FooterWrapper;
