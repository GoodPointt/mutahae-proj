import { Box, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import NavBar from '@/app/ui/navbar/NavBar';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import LocaleSwitcher from './localeSwitcher/LocaleSwitcher';

const Header = ({ lang }) => {
  return (
    <SectionWrapper as={'header'} bg="black">
      <Flex justify={'space-between'}>
        <Link href={'/' + lang}>
          <Image
            src={'/logo.png'}
            alt="logo"
            width="460"
            height="160"
            style={{
              objectFit: 'cover',
              width: 460,
              height: 160,
              display: 'block',
            }}
          />
        </Link>
        <Box as="nav">
          <NavBar lang={lang} />
        </Box>
        <LocaleSwitcher />
      </Flex>
    </SectionWrapper>
  );
};

export default Header;
