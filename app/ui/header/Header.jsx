'use client';

import { useRef } from 'react';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/app/ui/navbar/NavBar';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import TopBar from './topBar/TopBar';
import { GiHamburgerMenu } from 'react-icons/gi';
import MobileMenu from './mobileMenu/MobileMenu';

const Header = ({ lang, dictionary, attributes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <SectionWrapper
      as={'header'}
      bg="black"
      py={{ base: '12px', lg: '16px', xl: '18px' }}
      pt="0"
    >
      <Box display={{ base: 'none', lg: 'block' }}>
        <TopBar lang={lang} attributes={attributes} />
      </Box>
      <Flex justify={'space-between'} alignItems={'center'} py={'16px'}>
        <Link href={'/' + lang}>
          <Image
            src={'/logo.png'}
            alt="logo"
            width="180"
            height="60"
            style={{
              objectFit: 'cover',
              width: 180,
              height: 60,
              display: 'block',
            }}
          />
        </Link>
        <Box as="nav" display={{ base: 'none', lg: 'block' }}>
          <NavBar lang={lang} flexDir="row" dictionary={dictionary} />
        </Box>
        <Box display={{ base: 'block', lg: 'none' }} mr={'8px'}>
          <Button
            variant={'ghost'}
            color={'#a98841'}
            _hover={{ color: '#81672e' }}
            transition={'all 0.3s'}
            onClick={onOpen}
            ref={btnRef}
          >
            <GiHamburgerMenu size={'40'} />
          </Button>
        </Box>
      </Flex>

      <MobileMenu isOpen={isOpen} onClose={onClose}>
        <NavBar flexDir="column" lang={lang} dictionary={dictionary} />
        <TopBar
          lang={lang}
          flexDir="column"
          gap="32px"
          attributes={attributes}
        />
      </MobileMenu>
    </SectionWrapper>
  );
};

export default Header;
