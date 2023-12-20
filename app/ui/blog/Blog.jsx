import React from 'react';
import SectionWrapper from '../sectionWrapper/SectionWrapper';
import { Text } from '@chakra-ui/react';
import BlogSlider from '../blogSlider/BlogSlider';
import TextLink from '../textLink/TextLink';

const Blog = async ({ lang, dictionary, posts }) => {
  return (
    <SectionWrapper heading={dictionary.header.navItems[3].title}>
      <BlogSlider posts={posts} lang={lang} />
      <Text mt={'32px'}>
        {dictionary.pageLinksText.catalog.fromBlog}
        <TextLink href={`/${lang}/${dictionary.pageLinksText.catalog.link}`}>
          {dictionary.pageLinksText.catalog.linkName}
        </TextLink>
      </Text>
    </SectionWrapper>
  );
};

export default Blog;
