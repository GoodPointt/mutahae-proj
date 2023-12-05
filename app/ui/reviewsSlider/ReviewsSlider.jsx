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

const ReviewsSlider = ({ reviews, lang }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Swiper
      className="customerSlider"
      navigation={false}
      loop
      slidesPerView={'auto'}
      breakpoints={{
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
        },
      }}
    >
      {reviews.length > 0 &&
        reviews.map(review => {
          const {
            attributes: {
              imgUrl,
              uid,
              customerPosition,
              desc,
              customerName,
              videoUrl,
            },
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
                    src={imgUrl || '/customerPlaceholder.jpg'}
                    alt={customerPosition}
                    fill
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
                  pb="25px"
                >
                  <Box position="absolute" top={0}>
                    <RiDoubleQuotesR size="40px" color="#a28445" />
                  </Box>

                  {desc && <Text mb="30px">{desc}</Text>}
                  {customerName && (
                    <Text fontSize="15px" textTransform="uppercase">
                      {customerName}
                    </Text>
                  )}
                  {customerPosition && (
                    <Text fontSize="15px"> {customerPosition}</Text>
                  )}
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      {reviews.length > 0 && (
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

export default ReviewsSlider;
