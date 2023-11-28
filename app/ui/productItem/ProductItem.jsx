// import { getDictionary } from '@/app/lib/locales/dictionary';
import { Box, Button, Heading } from '@chakra-ui/react';
import Link from 'next/link';

const ProductItem = async ({ product }) => {
  // const {
  //   buttons: { view },
  // } = await getDictionary(lang);
  return (
    <Box
      as={'li'}
      key={product.id}
      shadow={'dark-lg'}
      position={'relative'}
      borderRadius={'10px'}
      overflow="hidden"
      css={{
        '&:hover .news_card': {
          transform: 'scale(1.03)',
          transition: 'all 500ms, filter 500ms ease-in-out',
          filter: 'brightness(100%)',
        },
      }}
    >
      <Link href={`/catalog/${product.id}`}>
        <Box
          borderRadius={'10px'}
          className="news_card"
          filter="brightness(80%)"
          position="relative"
          z-index="2"
          width="100%"
          height="360px"
          transition="all 500ms cubic-bezier(0.4, 0, 0.2, 1)"
          as="div"
          bgImage={`url(${product.img})`}
          bgRepeat={'no-repeat'}
          bgPos={'center'}
          bgSize={'cover'}
          _hover={{
            cursor: 'pointer',
            transition: 'all 500ms ease-in-out',
            filter: 'grayscale(100%)',
          }}
        ></Box>
        <Box
          borderRadius={'10px'}
          as="div"
          bg="linear-gradient(0deg,rgba(0, 0, 0, 0.7) 15%, rgba(252, 176, 69, 0) 50%)"
          position={'absolute'}
          top="0"
          zIndex={'2'}
          width={'100%'}
          height={'100%'}
          display={'flex'}
          justifyContent={'flex-end'}
          flexDir={'column'}
          pt={'16px'}
          gap={4}
        >
          <Heading color={'#fff'} fontSize={'24'} textAlign={'left'} mx={4}>
            {product.title}
          </Heading>

          <Button
            variant={'solid'}
            bgColor={'#a28445'}
            color={'white'}
            transition={'all 0.3s'}
            _hover={{ bgColor: '#81672e' }}
            borderTopRadius={0}
          >
            View
          </Button>
        </Box>
      </Link>
    </Box>
  );
};

export default ProductItem;
