import React from 'react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import ReviewsSlider from '../reviewsSlider/ReviewsSlider';

const Reviews = async ({ lang, dictionary, reviews }) => {
  return (
    <SectionWrapper heading={dictionary.header.navItems[3].title}>
      <ReviewsSlider reviews={reviews} lang={lang} />
    </SectionWrapper>
  );
};

export default Reviews;
