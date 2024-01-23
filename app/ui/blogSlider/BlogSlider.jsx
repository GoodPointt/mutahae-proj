'use client';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import Image from 'next/image';
import 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import {
  Box,
  Button,
  Divider,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDoubleQuotesR } from 'react-icons/ri';
import {
  TbCircleArrowLeftFilled,
  TbCircleArrowRightFilled,
} from 'react-icons/tb';
import ModalWindow from '../modalWindow/ModalWindow';
import { FaYoutube } from 'react-icons/fa';
import ReactPlayer from 'react-player';

const SwiperNavigation = () => {
  const swiper = useSwiper();

  return (
    <>
      <Button
        bg="transparent"
        w="auto"
        minW="auto"
        pl={0}
        pr={0}
        _hover={{ bg: 'transparent' }}
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <TbCircleArrowLeftFilled fontSize="30px" color="#a28445" />
      </Button>
      <Button
        bg="transparent"
        w="auto"
        minW="auto"
        pl={0}
        pr={0}
        _hover={{ bg: 'transparent' }}
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <TbCircleArrowRightFilled fontSize="30px" color="#a28445" />
      </Button>
    </>
  );
};

const BlogSlider = ({ posts, lang }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const defaultVideo =
    'https://res.cloudinary.com/dyeasxvro/video/upload/v1701638779/promtest_e550ba050d.mp4';

  return (
    <Swiper
      className="customerSlider"
      navigation={false}
      loop
      slidesPerView={'auto'}
      autoHeight
      breakpoints={{
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      }}
    >
      {posts?.length > 0 &&
        posts?.map(review => {
          const {
            attributes: { imgUrl, uid, title, desc, videoUrl, preview },
          } = review;

          return (
            <SwiperSlide key={uid} className="scrollBarStyle">
              <Box
                display={'flex'}
                gap={{ md: '20px', lg: '40px' }}
                w="100%"
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems="flex-start"
              >
                <Box
                  position="relative"
                  w={{ base: '100%', md: '400px', xl: '600px' }}
                  height={200}
                  mt={'40px'}
                >
                  <Image
                    src={imgUrl || '/blur-product.jpg'}
                    alt={title}
                    fill
                    placeholder="blur"
                    blurDataURL="/blur-product.jpg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                    }}
                  />

                  {videoUrl && (
                    <Button
                      onClick={onOpen}
                      variant="ghost"
                      _hover={{ bgColor: 'transparent', color: '#c72a2a' }}
                      color="#a54444"
                      px="10px"
                    >
                      <FaYoutube size={40} />
                    </Button>
                  )}
                  <ModalWindow
                    p={0}
                    isCloseButton={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    maxW={{ base: '300px', md: '500px' }}
                  >
                    <ReactPlayer
                      url={videoUrl || defaultVideo}
                      width="300"
                      height="500"
                      controls
                      playing
                    />
                  </ModalWindow>
                </Box>

                <Box
                  position="relative"
                  maxW={{ base: '380px', md: '400px', lg: '700px' }}
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  pt="60px"
                >
                  {title && (
                    <Text fontSize="28px" mb={4}>
                      {title}
                    </Text>
                  )}
                  <Box position="absolute" top={0}>
                    <RiDoubleQuotesR size="40px" color="#a28445" />
                  </Box>
                  {preview && (
                    <Text fontSize={{ base: '12px', lg: '13px', xl: '14px' }}>
                      {preview}
                    </Text>
                  )}
                </Box>
              </Box>

              {desc.split('/n').map((el, index) => (
                <Text
                  key={index}
                  mt={'5px'}
                  fontSize={{ base: '12px', lg: '13px', xl: '14px' }}
                >
                  {el}
                </Text>
              ))}

              <Divider
                mt={'32px'}
                borderBottom="2px solid #a28445"
                h={'2px'}
                width={'100%'}
              ></Divider>
              {posts?.length > 0 && posts?.length !== 1 && (
                <Flex
                  gap="8px"
                  mt="8px"
                  flexDirection={lang === 'he' ? 'row-reverse' : 'row'}
                >
                  <SwiperNavigation />
                </Flex>
              )}
            </SwiperSlide>
          );
        })}
    </Swiper>
  );
};

export default BlogSlider;
