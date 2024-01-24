'use client';

import ProductItem from '@/app/ui/productItem/ProductItem';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';

import 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import 'swiper/css';
import './catalogSlider.css';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const CatalogSlider = ({ products, lang, heading }) => {
	return (
		<SectionWrapper
			heading={heading}
			bg={'radial-gradient(#434343 20%, black 100%)'}
		>
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
