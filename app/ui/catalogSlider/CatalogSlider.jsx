'use client';

import 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './catalogSlider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';
import ProductItem from '@/app/ui/productItem/ProductItem';
import CatalogDesc from '../catalogDesc/CatalogDesc';

const CatalogSlider = ({ products, lang, heading, dictionary }) => {
  return (
    <SectionWrapper
      heading={heading}
      bg={'radial-gradient(#434343 20%, black 100%)'}
    >
      {<CatalogDesc dictionary={dictionary} />}
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
          products.map(product => (
            <SwiperSlide key={product.attributes.uid}>
              <ProductItem product={product.attributes} lang={lang} />
            </SwiperSlide>
          ))}
      </Swiper>
    </SectionWrapper>
  );
};

export default CatalogSlider;
