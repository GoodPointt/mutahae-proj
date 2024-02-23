'use client';

import Image from 'next/image';

import ProductItem from '@/app/ui/productItem/ProductItem';
import SectionWrapper from '@/app/ui/sectionWrapper/SectionWrapper';

import { Link } from '@chakra-ui/next-js';
import { Box, Heading, useMediaQuery } from '@chakra-ui/react';

import { flattenAttributes } from '@/app/lib/utils/flattenAttributes';

import 'swiper/react';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import 'swiper/css';
import './catalogSlider.css';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const CatalogSlider = ({ products: { data }, lang, heading, dictionary }) => {
	const [isModileScreen] = useMediaQuery('(max-width: 1024px)');

	const callbackpath = () =>
		localStorage.setItem('callbackPath', JSON.stringify('/catalog'));

	return (
		<SectionWrapper
			isLink={'true'}
			heading={heading}
			headingAs={Link}
			href={`/${lang}/catalog`}
			bg={
				'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(25,25,25,1) 50%, rgba(0,0,0,1) 100%)'
			}
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
				{data.length > 0 &&
					data.map(product => (
						<SwiperSlide key={product.attributes.uid}>
							<ProductItem
								product={flattenAttributes(product)}
								lang={lang}
								setCallbackPath={callbackpath}
								dictionary={dictionary}
							/>
						</SwiperSlide>
					))}
				<SwiperSlide>
					<Link
						href={`/${lang}/catalog`}
						onClick={() => {
							localStorage.setItem('callbackPath', JSON.stringify('/catalog'));
						}}
					>
						<Box
							borderRadius={'2px'}
							className="product_card"
							filter={isModileScreen ? 'brightness(100%)' : 'brightness(80%)'}
							position="relative"
							z-index="2"
							width="100%"
							height="360px"
							transition="all 500ms cubic-bezier(0.4, 0, 0.2, 1)"
							bgImage={'url(/img/cataloglink.jpg)'}
							bgRepeat={'no-repeat'}
							bgPos={'center'}
							bgSize={'cover'}
							_hover={{
								cursor: 'pointer',
								transition: 'all 500ms ease-in-out',
							}}
							css={{
								'&::after': {
									content: "''",
									width: '100%',
									height: '100%',
									position: 'absolute',
									background:
										'linear-gradient(0deg, rgba(0,0,0,0.7) 15%, rgba(252,176,69,0) 50%, rgba(252,176,69,0) 70%, rgba(0,0,0,0.8) 100%)',
								},
							}}
						>
							<Image
								src={'/img/cataloglink.jpg'}
								alt={'product image'}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								style={{ objectFit: 'cover' }}
							/>
						</Box>

						<Box
							borderRadius={'2px'}
							position={'absolute'}
							top="-50px"
							zIndex={'2'}
							width={'100%'}
							height={'100%'}
							display={'flex'}
							justifyContent={'flex-end'}
							flexDir={'column'}
							pt={'16px'}
							gap={4}
						>
							<Heading color={'#fff'} fontSize={'21'} mx={4}>
								{dictionary.slider}
							</Heading>
						</Box>
					</Link>
				</SwiperSlide>
			</Swiper>
		</SectionWrapper>
	);
};

export default CatalogSlider;
