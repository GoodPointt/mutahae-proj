'use client';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import Image from 'next/image';
import 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
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
        onClick={() => swiper.slidePrev()}
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
        onClick={() => swiper.slideNext()}
      >
        <TbCircleArrowRightFilled fontSize="30px" color="#a28445" />
      </Button>
    </>
  );
};

const BlogSlider = ({ posts, lang }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Swiper
      className="customerSlider"
      navigation={false}
      loop
      slidesPerView={'auto'}
      autoplay={{
        delay: 15000,
        disableOnInteraction: true,
      }}
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
            attributes: { imgUrl, uid, title, desc, videoUrl },
          } = review;

          return (
            <SwiperSlide key={uid} width="100%">
              <Box
                display="flex"
                gap="40px"
                borderBottom="2px solid #a28445"
                w="100%"
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems="center"
              >
                <Box position="relative" w={200} height={200}>
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
                      url={videoUrl}
                      width="300"
                      height="500"
                      controls
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
                  pb="30px"
                >
                  {title && (
                    <Text fontSize="28px" mb={4}>
                      {title}
                    </Text>
                  )}

                  <Box position="absolute" top={0}>
                    <RiDoubleQuotesR size="40px" color="#a28445" />
                  </Box>
                  {desc && <Text mb="30px">{desc}</Text>}
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      {posts?.length > 0 && posts?.length !== 1 && (
        <Flex
          gap="8px"
          mt="8px"
          flexDirection={lang === 'he' ? 'row-reverse' : 'row'}
        >
          <SwiperNavigation />
        </Flex>
      )}
    </Swiper>
  );
};

export default BlogSlider;
