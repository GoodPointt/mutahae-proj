'use client';

import 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './catalogSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { products } from '@/app/lib/data';
import { Heading } from '@chakra-ui/react';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import ProductItem from '@/app/ui/productItem/ProductItem';

const CatalogSlider = () => {
  if (products[0].img)
    return (
      <SectionWrapper>
        <Heading
          mb={{ base: '32px', lg: '72px' }}
          fontSize={{ base: '2xl', lg: '4xl' }}
          fontWeight="900"
        >
          Catalog
        </Heading>
        <Swiper
          className="mySwiper2"
          navigation
          loop
          slidesPerView={'auto'}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 50,
              slidesPerGroup: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
              slidesPerGroup: 2,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 40,
              slidesPerGroup: 1,
            },
          }}
          modules={[Navigation]}
        >
          {products.length > 0 &&
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductItem product={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </SectionWrapper>
    );
};

export default CatalogSlider;
