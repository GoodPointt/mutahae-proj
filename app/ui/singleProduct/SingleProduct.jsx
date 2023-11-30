'use client';

import { Box, Flex, Heading, Text, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import SectionWrapper from '../sectionWrapper/SectionWrapper';

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
  const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

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
    </SectionWrapper>
  );
};

export default SingleProduct;
