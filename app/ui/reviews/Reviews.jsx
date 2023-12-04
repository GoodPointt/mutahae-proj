import React from 'react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import ReviewsSlider from '../reviewsSlider/ReviewsSlider';
import { fetchReviews } from '../../lib/api/instance';

const Reviews = async ({ lang, dictionary }) => {
  const { data: reviews } = await fetchReviews(lang);
  console.log(reviews);
  return (
    <SectionWrapper heading={dictionary.header.navItems[3].title}>
      <ReviewsSlider reviews={reviews} lang={lang} />
    </SectionWrapper>
  );
};

export default Reviews;
