'use client';

import { Box, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import Btn from '../button/Btn';
import ModalWindow from '../modalWindow/ModalWindow';
import ModalContact from '../modalContact/ModalContact';
import { TiShoppingCart } from 'react-icons/ti';

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
    price,
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
          <Heading
            as="h2"
            mb={{ base: 6, lg: 8 }}
            fontSize={{ base: '2xl', lg: '4xl' }}
          >
            {title || ''}
          </Heading>
          {length && (
            <Text as="p" fontSize={'sm'} fontWeight={'600'}>
              {dictionary.singleProduct.length}
              <Text as="span" fontWeight={'400'}>
                {length || ''}
              </Text>
            </Text>
          )}
          {thickness && (
            <Text as="p" fontSize={'sm'} fontWeight={'600'}>
              {dictionary.singleProduct.thickness}
              <Text as="span" fontWeight={'400'}>
                {thickness || ''}
              </Text>
            </Text>
          )}
          {width && (
            <Text as="p" fontSize={'sm'} fontWeight={'600'}>
              {dictionary.singleProduct.width}

              <Text as="span" fontWeight={'400'}>
                {width || ''}
              </Text>
            </Text>
          )}
          {wood && (
            <Text as="p" fontSize={'sm'} fontWeight={'600'}>
              {dictionary.singleProduct.wood}

              <Text as="span" fontWeight={'400'}>
                {wood || ''}
              </Text>
            </Text>
          )}
          {type && (
            <Text as="p" fontSize={'sm'} fontWeight={'600'}>
              {dictionary.singleProduct.type}

              <Text as="span" fontWeight={'400'}>
                {type || ''}
              </Text>
            </Text>
          )}
          {manufacturer && (
            <Text as="p" fontSize={'sm'} fontWeight={'600'}>
              {dictionary.singleProduct.manufacturer}

              <Text as="span" fontWeight={'400'}>
                {manufacturer || ''}
              </Text>
            </Text>
          )}
          <Box mt={'auto'}>
            {price && (
              <Text as="p" fontSize={'large'} fontWeight={'600'}>
                {dictionary.singleProduct.price}
                <Text as="span" fontWeight={'400'}>
                  {price || ''}
                </Text>
              </Text>
            )}
            <Box width={'fit-content'}>
              <Btn onClick={onOpen}>
                <Text as={'span'} minW={10}>
                  <TiShoppingCart size={24} />
                </Text>

                {dictionary.buttons.buy}
              </Btn>
            </Box>
          </Box>
        </Flex>
      </Flex>
      <Text my={4} as="p">
        {descLong || ''}
      </Text>
      <ModalWindow onClose={onClose} isOpen={isOpen}>
        <ModalContact
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
