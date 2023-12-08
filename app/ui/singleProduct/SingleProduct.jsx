'use client';

import { Box, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import Btn from '../button/Btn';
import ModalWindow from '../modalWindow/ModalWindow';
import FormContact from '../modalContact/ModalContact';

const SingleProduct = ({
  contacts,
  dictionary,
  product: {
    imgUrl,
    title,
    length,
    width,
    descLong,
    descShort,
    thickness,
    wood,
    type,
    manufacturer,
    uid,
  },
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            src={imgUrl || '/product.png'}
            alt={title + '' + descShort || 'product image'}
            fill
            placeholder="blur"
            blurDataURL="/blur-product.jpg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            {title || ''}
          </Heading>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            {dictionary.singleProduct.length}
            <Text as="span" fontWeight={'300'}>
              {length || ''}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            {dictionary.singleProduct.thickness}
            <Text as="span" fontWeight={'300'}>
              {thickness || ''}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            {dictionary.singleProduct.width}

            <Text as="span" fontWeight={'300'}>
              {width || ''}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            {dictionary.singleProduct.wood}

            <Text as="span" fontWeight={'300'}>
              {wood || ''}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            {dictionary.singleProduct.type}

            <Text as="span" fontWeight={'300'}>
              {type || ''}
            </Text>
          </Text>
          <Text as="p" fontSize={'sm'} fontWeight={'500'}>
            {dictionary.singleProduct.manufacturer}

            <Text as="span" fontWeight={'300'}>
              {manufacturer || ''}
            </Text>
          </Text>
        </Flex>
      </Flex>
      <Text my={4} as="p">
        {descLong || ''}
      </Text>

      <Btn onClick={onOpen}>{dictionary.buttons.contact}</Btn>
      <ModalWindow onClose={onClose} isOpen={isOpen}>
        <FormContact
          dictionary={dictionary}
          contacts={contacts}
          onClose={onClose}
          title={title}
          uid={uid}
        />
      </ModalWindow>
    </SectionWrapper>
  );
};

export default SingleProduct;
