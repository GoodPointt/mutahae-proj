'use client';

import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import Btn from '../button/Btn';
import ModalWindow from '../modalWindow/ModalWindow';
import { useRef } from 'react';
import SubmitButton from '../submitButton/SubmitButton';
import FormContact from '../formContact/FormContact';

const SingleProduct = ({
  product: {
    imgUrl,
    title,
    length,
    width,
    descLong,
    thickness,
    wood,
    type,
    manufacturer,
  },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);

  return (
    <SectionWrapper>
      <Flex flexWrap={'wrap'} gap={4}>
        <Box
          display={'block'}
          pos={'relative'}
          w={'400px'}
          h={'380px'}
          overflow={'hidden'}
          borderRadius={'10px'}
        >
          <Image
            src={imgUrl}
            alt={'product image'}
            fill
            style={{
              display: 'block',
              height: '100%',
              maxWidth: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Flex flexDir={'column'} gap={2}>
          <Heading as="h2" fontWeight={900}>
            {title}
          </Heading>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            Length:
            <Text as="span" fontWeight={'300'}>
              {length}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            Thickness:
            <Text as="span" fontWeight={'300'}>
              {thickness}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            Width:
            <Text as="span" fontWeight={'300'}>
              {width}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            Wood:
            <Text as="span" fontWeight={'300'}>
              {wood}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            Type:
            <Text as="span" fontWeight={'300'}>
              {type}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            Manufacturer:
            <Text as="span" fontWeight={'300'}>
              {manufacturer}
            </Text>
          </Text>
        </Flex>
      </Flex>
      <Text mt={4} as="p">
        {descLong}
      </Text>

      <Btn onClick={onOpen}>Contact us</Btn>
      <ModalWindow onClose={onClose} isOpen={isOpen}>
        <FormContact initialRef={initialRef} />
      </ModalWindow>
    </SectionWrapper>
  );
};

export default SingleProduct;
